import React, { Component } from 'react'
import { View, Text, Pressable, TouchableHighlight, ScrollView, DeviceEventEmitter, Keyboard } from 'react-native'
import Animated from 'react-native-reanimated'
import HTMaskView from '~/common/mask/HTMaskView'


export default class HTAlert extends Component {

	constructor(props) {
		super(props)
		this.optionList = {}
		this.isOpen = false
		this.state = {
			contentScale: new Animated.Value(0),
			contentOpacity: new Animated.Value(0),
		}
	}

	componentDidMount = () => {
		this.listener = DeviceEventEmitter.addListener(global.kHTKeyboardHeightWillChange, (event) => {
			if (!this.isOpen) {
				return
			}
			global.KEYBOARD_ANIMATION(event)
			this.setState(this.state)
		})
	}

	componentWillUnmount() {
		this.listener.remove()
	}

	animation = (key, value, damping, stiffness, mass, complete) => {
		let config = {
			toValue: value,
			damping,
			stiffness,
		    mass,
		    overshootClamping: false,
		    // restSpeedThreshold: 0.001,
		    // restDisplacementThreshold: 0.001,
		}
		Animated.spring(key, config).start(complete)
	}

	_backgroundDidTouch = () => {
		Keyboard.dismiss()
		let backgroundCloseAble = this?.optionList?.backgroundCloseAble
		if (backgroundCloseAble == null) {
			backgroundCloseAble = false
		}
		if (backgroundCloseAble) {
			this.close()
		}
	}

	open(optionList) {
		this.isOpen = true
		let reloadOptionList = this.alertContent._reloadOptionList(optionList)
		this.optionList = reloadOptionList
		this.state.contentScale.setValue(0)
		this.state.contentOpacity.setValue(0)
		this.alertContent?.setState(reloadOptionList, () => {
			HTMaskView.switchAndroidHardwareTextureEnable(this.animatedView, true)
			this.maskView.open(300, () => {
				this.animation(this.state.contentScale, 1, 7, 170, 0.2)
				this.animation(this.state.contentOpacity, 1, 7, 170, 0.2)
			}, () => {
				HTMaskView.switchAndroidHardwareTextureEnable(this.animatedView, false)
			})
		})
	}

	openTitleAction = (title, action) => {
		this.open({
			title: title,
			detail: '',
			detailCenter: false,
			content: null,
			itemList: [
				{ title: '确认', onPress: () => {
					global.Alert.close()
					action && action()
				} },
				{ title: '取消' },
			]
		})
	}

	close = () => {
		HTMaskView.switchAndroidHardwareTextureEnable(this.animatedView, true)
		this.maskView.close(150, () => {
			this.animation(this.state.contentScale, 0.7, 7, 170, 0.2)
			this.animation(this.state.contentOpacity, 0, 7, 170, 0.2)
		}, () => {
			this.isOpen = false
			HTMaskView.switchAndroidHardwareTextureEnable(this.animatedView, false)
		})
	}

	render() {
		return (
			<HTMaskView contentStyle={{ marginBottom: KEYBOARD_HEIGHT }} ref={ref => this.maskView = ref} backgroundDidTouch={() => {
				this._backgroundDidTouch()
			}}>
				<Animated.View ref={ref => this.animatedView = ref} style={[
					styleList.alertAnimationContainer, {
						opacity: this.state.contentOpacity,
						transform: [{ scale: this.state.contentScale }]
					}]}>
					<HTAlertContent ref={ref => this.alertContent = ref} close={this.close} />
				</Animated.View>
			</HTMaskView>
		)
	}

}

class HTAlertContent extends Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	_cancalDidTouch = () => {
		this.props.close()
	}

	_renderItem = (item, index) => {
		return (
			<TouchableHighlight underlayColor={'#F5F5F9'} key={index} style={[styleList.alertContentActionItemContainer,
				index > 0 && { borderLeftWidth: 1, borderLeftColor: '#F5F5F9' }
			]} onPress={() => {
				if (item?.onPress) {
					item.onPress(item, index)
				} else {
					this._cancalDidTouch()
				}
			}}>
				<Text style={[styleList.alertContentActionItemTitle, item.color && { color: item.color }]}>{item.title}</Text>
			</TouchableHighlight>
		)
	}

	_reloadOptionList = (optionList) => {
		return {
			title: optionList?.title ?? '',
			detail: optionList?.detail ?? '',
			detailCenter: optionList?.detailCenter ?? false,
			content: optionList?.content ?? null,
			itemList: optionList?.itemList ?? [],
		}
	}

	render() {
		let optionList = this._reloadOptionList(this.state)
		let { title, detail, detailCenter, content, itemList } = optionList
		return (
			<View style={[styleList.alertContentContainer]}>
				{
					(title.length > 0 || detail.length > 0) && (
						<View style={styleList.alertContentTextContainer}>
						{
							title.length > 0 && (
								<Text style={styleList.alertContentTitle}>{title}</Text>
							)
						}
						{
							detail.length > 0  && (
								<ScrollView style={styleList.alertContentDetailContainer}>
									<Text style={[styleList.alertContentDetail,{ textAlign: detailCenter ? 'center' : 'left' }]}>{detail}</Text>
								</ScrollView>
							)
						}
						</View>
					)
				}
				{
					content
				}
				{
					itemList.length > 0 && (
						<View style={styleList.alertContentActionListContainer}>
							{
								itemList.map((item, index) => {
									return this._renderItem(item, index)
								})
							}
						</View>
					)
				}
			</View>
		)
	}

}

const styleList = StyleSheet.create({
	alertAnimationContainer: {
		alignItems: 'center', 
		justifyContent: 'center', 
		width: '100%',
		overflow: 'hidden',
	},

	alertContentContainer: {
		borderRadius: 8,
		overflow: 'hidden',
		maxWidth: 400,
		width: '87%',
		backgroundColor: 'white',
	},
	alertContentTextContainer: {
		marginTop: 32,
		paddingLeft: 24,
		paddingRight: 24,
	},
	alertContentTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#191919',
		textAlign: 'center'
	},
	alertContentDetailContainer: {
		maxHeight: 150
	},
	alertContentDetail: {
		marginTop: 20,
		fontSize: 14,
		lineHeight: 24,
		color: '#666666',
	},
	alertContentActionListContainer: {
		borderTopWidth: 1,
		borderTopColor: '#F5F5F9',
		marginTop: 25,
		flexDirection: 'row',
		alignItems: 'center',
	},
	alertContentActionItemContainer: {
		flex: 1,
		height: 56,
		alignItems: 'center',
		justifyContent: 'center',
	},
	alertContentActionItemTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#FF4165',
	}
})