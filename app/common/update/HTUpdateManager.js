import React from 'react'
import { View, AppState, Platform } from 'react-native'
import CodePush from 'react-native-code-push'
import Animated from 'react-native-reanimated'
import { setCustomSourceTransformer } from 'react-native/Libraries/Image/resolveAssetSource'
import HTAppStateManager from '~/common/appstate/HTAppStateManager'

const CODE_PUSH_KEY = Platform.select({
	ios: 'nEpG9Yivpk9-SU9QC66rHx7vmpqJC1Gll1BL-',
	android: 'VME2ejyhmZH4xzoy7gmLmG-iK0L1INv_M0BMW',
})

export default class HTUpdateManager {
	static APPLICATION_VERSION = '8'

	static init = () => {
		setCustomSourceTransformer(resolver => {
			// console.log(resolver.jsbundleUrl, resolver.serverUrl, resolver.asset)
			return resolver.defaultAsset()
		})
		this.update(false)

		this?.appStateUnsubscribe?.remove()
		this.appStateUnsubscribe = HTAppStateManager.addListener(isActive => {
			if (isActive) {
				this.update(false)
			}
		})
	}

	static update = (showHud = false) => {
		if (__DEV__) {
		}
		if (showHud) {
			Hud.show()
		}
		CodePush.checkForUpdate(CODE_PUSH_KEY)
			.then(update => {
				if (showHud) {
					Hud.hidden()
				}
				if (!update) {
					if (showHud) {
						Toast.show('没有版本更新')
					}
					CodePush.notifyAppReady()
					return
				}
				if (!showHud) {
					this._sync((progress, status) => {
						this._updateProgress(false, progress, status)
					})
					return
				}
				let title = `热更新${update?.isMandatory ? '强制' : ''}`
				let description =
					update?.description?.replace(/\\n/g, '\n') ?? '没有更新内容'
				description = description.replace(/\\r/g, '\r')
				description = description.replace(/\\t/g, '\t')
				global.Alert.open({
					title: title,
					detail: description,
					itemList: [
						{
							title: '确定',
							onPress: () => {
								this._download(title, description)
							},
						},
						{ title: '取消' },
					],
				})
			})
			.catch(e => {
				if (showHud) {
					Toast.show('检测版本更新出错')
				}
			})
	}

	static _download = (title, description) => {
		let progressValue = new Animated.Value(0)
		global.Alert.open({
			title: title,
			detail: '正在下载...',
			content: (
				<View style={{ width: '100%', paddingHorizontal: 24 }}>
					<View
						style={{
							marginTop: 30,
							marginBottom: 10,
							width: '100%',
							height: 4,
							borderRadius: 4 / 2.0,
							overflow: 'hidden',
							alignSelf: 'center',
							backgroundColor: COLOR_ALPHA('#F95B78', 0.3),
						}}>
						<Animated.View
							style={[
								StyleSheet.absoluteFill,
								{
									right: null,
									backgroundColor: '#FF3E61',
									width: Animated.multiply(
										SCREEN_WIDTH * 0.8 - 24 * 2,
										progressValue,
									),
								},
							]}></Animated.View>
					</View>
				</View>
			),
			itemList: [{ title: '取消' }],
		})
		this._sync((progress, status) => {
			this._updateProgress(true, progress, status, progressValue)
		})
	}

	static _sync = progressBlock => {
		CodePush.disallowRestart()
		CodePush.sync(
			{
				deploymentKey: CODE_PUSH_KEY,
				updateDialog: false,
				installMode: CodePush.InstallMode.ON_NEXT_RESTART,
			},
			status => {
				progressBlock && progressBlock(0, status)
			},
			({ receivedBytes, totalBytes }) => {
				if (progressBlock && totalBytes > 0) {
					progressBlock(
						receivedBytes / totalBytes,
						CodePush.SyncStatus.DOWNLOADING_PACKAGE,
					)
				}
			},
			update => {},
		)
	}

	static _updateProgress = (showHud, progress, status, progressValue) => {
		switch (status) {
			case CodePush.SyncStatus.DOWNLOADING_PACKAGE: {
				progressValue && progressValue.setValue(progress)
				break
			}
			case CodePush.SyncStatus.SYNC_IN_PROGRESS:
			case CodePush.SyncStatus.UPDATE_INSTALLED:
			case CodePush.SyncStatus.CHECKING_FOR_UPDATE: {
				break
			}
			case CodePush.SyncStatus.INSTALLING_UPDATE: {
				this._updateSuccess(showHud)
				break
			}
			default: {
				CodePush.clearUpdates()
				if (showHud) {
					global.Alert.close()
					Toast.show(`版本安装出错(${status})`)
				}
				break
			}
		}
	}

	static _updateSuccess = (showHud = false) => {
		global.Alert.open({
			title: '内部更新已完成',
			detail: '重启生效, 是否立即重启',
			itemList: [
				{
					title: '确定',
					onPress: () => {
						global.Alert.close()
						global.restartBundleBridgeManager()
						setTimeout(() => {
							CodePush.allowRestart()
							CodePush.restartApp()
						}, 50)
					},
				},
				{ title: '取消' },
			],
		})
	}
}
