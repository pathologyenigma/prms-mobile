import React, { Component } from 'react'
import { View, Text, Image, Pressable, FlatList, DeviceEventEmitter } from 'react-native'
import Animated from 'react-native-reanimated'
import HTMaskView from '~/common/mask/HTMaskView'

export default class HTBottomAnimationView extends Component {

	constructor(props) {
		super(props)
		this.isOpen = false
		this.containerHeight = 0
		this.translateY = new Animated.Value(0)
		this.state = {}
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

	_backgroundDidTouch = () => {
		if (this.props?._backgroundDidTouch) {
			this.props?.backgroundDidTouch()
			return
		}
		this.close()
	}

	_handlerAndroidBack = () => {
		if (this.props?.handlerAndroidBack) {
			this.props?.handlerAndroidBack()
			return
		}
		this.close()
	}

	setContentState = (optionList) => {
		this.contentRef.setState(optionList)
	}

	open(optionList) {
		this.isOpen = true
		let containerHeight = this.props.ContentClass.heightFromOptionList(optionList)
		this.containerHeight = containerHeight
		let duration = 250
		this.animatedView.setNativeProps({
			height: containerHeight
		})
		this.translateY.setValue(this.containerHeight)
		this.contentRef.setState(optionList, () => {
			HTMaskView.switchAndroidHardwareTextureEnable(this.animatedView, true)
	        this.maskView.open(duration, () => {
	           	HTMaskView.animation(this.translateY, 0, duration)
	        }, () => {
	        	HTMaskView.switchAndroidHardwareTextureEnable(this.animatedView, false)
	        })
		})
    }

    close = (animated = true) => {
    	let duration = 250
    	this.contentRef?.state?.didClose && this.contentRef.state.didClose()
    	HTMaskView.switchAndroidHardwareTextureEnable(this.animatedView, true)
        this.maskView?.close(duration, () => {
            HTMaskView.animation(this.translateY, this.containerHeight, animated ? duration : 1)
        }, () => {
        	this.isOpen = false
        	HTMaskView.switchAndroidHardwareTextureEnable(this.animatedView, false)
        })
    }

    render() {
        return (
            <HTMaskView style={styleList.maskContainer} contentStyle={[styleList.maskContainer]} handlerAndroidBack={this._handlerAndroidBack} ref={ref => this.maskView = ref} backgroundDidTouch={this._backgroundDidTouch}>
                <Animated.View ref={ref => this.animatedView = ref} style={[
					styleList.maskContent, 
					{ 
						height: this.containerHeight + (KEYBOARD_HEIGHT > 0 ? KEYBOARD_HEIGHT - HOME_BAR_HEIGHT - 10 : 0), 
						transform: [{ translateY: this.translateY }]
					}
				]}>
					<this.props.ContentClass 
						ref={ref => this.contentRef = ref}
						close={this.close}
					/>
                </Animated.View>
            </HTMaskView>
        )
    }

}

const styleList = StyleSheet.create({
	maskContainer: {
		justifyContent: 'flex-end'
	},
	maskContent: {
		width: '100%',
		overflow: 'hidden' 
	}
})