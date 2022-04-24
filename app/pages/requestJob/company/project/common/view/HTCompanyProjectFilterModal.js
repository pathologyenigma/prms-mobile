import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, DeviceEventEmitter, Animated, ScrollView } from 'react-native'
import HTMaskView from '~/common/mask/HTMaskView'

export default class HTCompanyProjectFilterModal extends Component {

	constructor(props) {
		super(props)
		this.isOpen = false
		this.containerWidth = 0
		this.translateX = new Animated.Value(0)
		this.state = {}
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
		let containerWidth = HTCompanyProjectFilterContent.widthFromOptionList(optionList)
		this.containerWidth = containerWidth
		let duration = 250
		this.animatedView.setNativeProps({
			width: containerWidth
		})
		this.translateX.setValue(this.containerWidth)
		this.contentRef.setState(optionList, () => {
			HTMaskView.switchAndroidHardwareTextureEnable(this.animatedView, true)
	        this.maskView.open(duration, () => {
	           	HTMaskView.animation(this.translateX, 0, duration)
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
            HTMaskView.animation(this.translateX, this.containerWidth, animated ? duration : 1)
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
						width: this.containerWidth, 
						transform: [{ translateX: this.translateX }]
					}
				]}>
					<HTCompanyProjectFilterContent 
						ref={ref => this.contentRef = ref}
						close={this.close}
					/>
                </Animated.View>
            </HTMaskView>
        )
    }

}


class HTCompanyProjectFilterContent extends Component {

	static widthFromOptionList = () => {
		return SCREEN_WIDTH * 0.7
	}

	render() {
		let sectionList = [
			{ title: '行业' },
			{ title: '轮次' },
			{ title: '地区' },
		]
		return (
			<ScrollView style={styleList.content}>
			{
				sectionList.map((section, index) => {
					return (
						<View key={index} style={styleList.sectionContainer}>
							<View style={styleList.sectionHeaderContainer}>
								<Text style={styleList.sectionHeaderTitle}>{section.title}</Text>
								<Text style={styleList.sectionHeaderDetail}>全部</Text>
							</View>
							<View style={styleList.itemListContaineer}>
							{
								new Array(9).fill(0).map((item, index) => {
									return (
										<View key={index} style={styleList.itemContainer}>
											<Text style={styleList.itemTitle}>全部</Text>
										</View>
									)
								})
							}
							</View>
						</View>
					)
				})
			}
			</ScrollView>
		)
	}

}

const styleList = StyleSheet.create({
	maskContainer: {
		zIndex: 10,
		alignItems: 'flex-end'
	},
	maskContent: {
		height: '100%',
		overflow: 'hidden' 
	},
	content: {
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
	},
	sectionContainer: {
		paddingTop: STATUS_BAR_HEIGHT,
		paddingBottom: HOME_BAR_HEIGHT,
		paddingHorizontal: 15,
	},
	sectionHeaderContainer: {
		paddingBottom: 15,
		flexDirection: 'row',
		alignItems: 'center'
	},
	sectionHeaderTitle: {
		flex: 1,
		fontSize: 13,
		color: '#333',
		fontWeight: 'bold'
	},
	sectionHeaderDetail: {
		fontSize: 13,
		color: '#333'
	},
	itemListContaineer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	itemContainer: {
		marginRight: 10,
		marginBottom: 10,
		paddingHorizontal: 20,
		paddingVertical: 2,
		borderRadius: 3,
		backgroundColor: '#54D693'
	},
	itemTitle: {
		fontSize: 13,
		color: 'white'
	},
})