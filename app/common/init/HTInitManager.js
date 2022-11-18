import React from 'react'
import { LogBox, processColor, Platform, NativeModules, DeviceEventEmitter } from 'react-native'
import HTGlobalHook from '~/common/global/HTGlobalHook'
import HTGlobalStatic from '~/common/global/HTGlobalStatic'
import HTKeyboardManager from '~/common/keyboard/HTKeyboardManager'
import HTRouteRegisterManager from './HTRouteRegisterManager'
import { HTRouteManager } from 'react-native-route'
import HTGlobalModalPage from '~/common/modal/HTGlobalModalPage'
import HTRouteInitManager from './HTRouteInitManager'
import HTServerManager from '~/common/debug/HTServerManager'
import HTRequest from '~/common/request/HTRequest'
import HTAuthManager from '~/common/auth/common/model/HTAuthManager'
import HTAppStateManager from '~/common/appstate/HTAppStateManager'
import HTUpdateManager from '~/common/update/HTUpdateManager'
import RNBugly from 'react-native-bugly'

const MainReactModule = NativeModules.MainReactModule

export default class HTInitManager {

	static init = () => {
		LogBox.ignoreLogs([
		    'Require cycle',
		    'Possible Unhandled Promise',
		    `Can't perform a React state update on an unmounted`,
		    'Non-serializable values were found',
		    'was called with a non-null argument without the required',
		    'Function components cannot be given ref',
		    '`flexWrap: `wrap`` is not supported with the `VirtualizedList` components.Consider',
		    'VirtualizedLists should never be nested inside plain ScrollViews',
		])
		HTAppStateManager.init()
		HTUpdateManager.init()
		RNBugly.setUserId(`${HTUpdateManager.APPLICATION_VERSION}_`)
		RNBugly.listen()
		DeviceEventEmitter.addListener('onHTRouteEvent', (noticeList) => {
			try {
				let title = noticeList?.title ?? ''
				let value = noticeList?.value ?? null
				switch(title) {
				case 'controller': {
					RNBugly.log('w', 'controller', `${JSON.stringify(value)}`)
					break
				}
				case 'navigation': {
					RNBugly.log('w', 'navigation', `${JSON.stringify(value)}`)
					break
				}}
			} catch(e) {

			}
		})
		HTServerManager.reload()
		HTAuthManager.init()
		HTRequest.initSocket()
		HTKeyboardManager.init()
		HTRouteRegisterManager.init()
		HTRouteInitManager.init()
		HTRouteManager.defaultNavigation.dismiss('HTGlobalModalPage', {}, {}, false)
		global.reloadRootViewController = this.reloadRootViewController
		global.restartBundleBridgeManager = this.restartBundleBridgeManager
		setTimeout(() => {
			global.reloadRootViewController()
			HTRouteManager.defaultNavigation.present('HTGlobalModalPage', {}, {
				presentBackgroundColor: processColor('clear')
			}, false)
		}, 100)
	}

	static reloadRootViewController = () => {
		console.log('重启')
		if ((HTAuthManager?.keyValueList?.userRole?.length ?? 0) > 0) {
			let attributedList = { fontSize: 10, color: processColor('#888888'), selectedColor: processColor('#54D693') }
			let keyValueList = {
				'PersonalUser': {
					itemList: [
						{ title: '职位', ...attributedList, image: 'tabbar_job', selectedImage: 'tabbar_job_selected', componentName: 'Jobs', componentRouteOptionList: { id: 0 } },
						{ title: '创业', ...attributedList, image: 'tabbar_company', selectedImage: 'tabbar_company_selected', componentName: 'HTCompanyPage', componentRouteOptionList: { id: 1 } },
						{ title: '学习', ...attributedList, image: 'tabbar_study', selectedImage: 'tabbar_study_selected', componentName: 'Learn', componentRouteOptionList: { id: 2 } },
						{ title: '消息', ...attributedList, image: 'tabbar_chat', selectedImage: 'tabbar_chat_selected', componentName: 'News', componentRouteOptionList: { id: 3 } },
						{ title: '我的', ...attributedList, image: 'tabbar_mine', selectedImage: 'tabbar_mine_selected', componentName: 'Mine', componentRouteOptionList: { id: 4 } },
					]
				},
				'EnterpriseUser': {
					itemList: [
						{ title: '找人才', ...attributedList, image: 'tabbar_job', selectedImage: 'tabbar_job_selected', componentName: 'Talent', componentRouteOptionList: { id: 0 } },
						{ title: '消息', ...attributedList, image: 'tabbar_chat', selectedImage: 'tabbar_chat_selected', componentName: 'News', componentRouteOptionList: { id: 3 } },
						{ title: '我的', ...attributedList, image: 'tabbar_mine', selectedImage: 'tabbar_mine_selected', componentName: 'Me', componentRouteOptionList: { id: 4 } },
					]
				}
			}
			MainReactModule.reloadRootViewController(null, keyValueList[HTAuthManager?.keyValueList?.userRole])
		} else {
			MainReactModule.reloadRootViewController('LoginScreen', {
				id: 0,
				showLoading: false,
				backgroundColor: processColor('clear')
			})
		}
	}

	static restartBundleBridgeManager = () => {
		MainReactModule.restartBundleBridgeManager()
	}

}