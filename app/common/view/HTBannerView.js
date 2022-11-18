import React, { Component } from 'react'
import { View, Text, Animated, ScrollView, Pressable, Platform, PixelRatio } from 'react-native'

class HTBannerContentView extends Component {

	render() {
		return (
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			{
				this.props.viewList.map((item, index) => {
					return this.props.renderItem({ item, index })
				})
			}
			</View>
		)
	}

}

export default class HTBannerView extends Component {

	constructor(props) {
		super(props)
		let viewList = new Array(3).fill(0)
		this.viewList = viewList.map((item, index) => {
			return { index }
		})
		this._initData(props)
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this._initData(nextProps)
	}

	_initData = (props) => {
		this.reloadData = [...props.data]
		while (this.reloadData.length > 0 && this.reloadData.length < 3) {
			this.reloadData = this.reloadData.concat(this.reloadData)
		}
		this.pageIndexValue = -1
	}

	_reloadIndex = (index, isOrigin) => {
		let reloadIndex = this.pageIndexValue + index
		if (reloadIndex < 0) {
			reloadIndex = this.reloadData.length + reloadIndex
		} else if (reloadIndex > this.reloadData.length - 1) {
			reloadIndex = reloadIndex - this.reloadData.length
		}
		let dataLength = (this?.props?.data?.length ?? 0)
		if (isOrigin && reloadIndex >= dataLength) {
			if (dataLength == 1) {
				reloadIndex = 0
			} else {
				reloadIndex = reloadIndex % 2
			}
		}
		return reloadIndex
	}

	_indexDidTouch = (index) => {
		let reloadIndex = this._reloadIndex(index, true)
		this.props.didTouch && this.props.didTouch(reloadIndex)
	}

	_renderItem = ({ item, index }) => {
		let reloadIndex = this._reloadIndex(index, false)
		let originIndex = this._reloadIndex(index, true)
		let key = ''
		if (reloadIndex == originIndex) {
			key = this.props.keyExtractor(item, reloadIndex)
		} else {
			key = `${this.props.keyExtractor(item, originIndex)}_${reloadIndex}`
		}
		return (
			<Pressable key={key} activeOpacity={1} style={{ width: this._getWidth(), height: '100%' }} onPress={() => {
				this._indexDidTouch(index)
			}}>
			{
				this.props.renderItem({ index: reloadIndex, item: this.reloadData[reloadIndex] })
			}
			</Pressable>
		)
	}

	_reloadPageIndex = (pageIndexValue) => {
		if (pageIndexValue == 1) {
			return
		}
		if (pageIndexValue == 0) {
			this.pageIndexValue -= 1
		} else if (pageIndexValue == 2) {
			this.pageIndexValue += 1
		}
		if (this.pageIndexValue < -1) {
			this.pageIndexValue = this.reloadData.length - 2
		} else if (this.pageIndexValue > this.reloadData.length - 2) {
			this.pageIndexValue = -1
		}
		this.props.didChange && this.props.didChange(this._reloadIndex(1, true))
		this.contentView.forceUpdate()
		this.scrollView.scrollTo({ x: this._getWidth(), y: 0, animated: false })
	}

	_onMomentumScrollEnd = ({ nativeEvent }) => {
		this._blockAndroidIgnoreTime -= 1
		if (this._blockAndroidIgnoreTime != 0) {
			return
		}
		let { contentOffset: { x } } = nativeEvent
		let pageIndexValue = Math.round(x / this._getWidth())
		this._reloadPageIndex(pageIndexValue)
	}

	_onScrollEndDrag = ({ nativeEvent }) => {
		if (this._blockAndroidIgnoreTime != null && this._blockAndroidIgnoreTime > 0) {
			return
		}
		this._blockAndroidIgnoreTime = Platform.OS == 'android' ? 3 : 1
	}

	_getWidth = () => {
		let width = StyleSheet.flatten(this?.props?.style)?.width ?? SCREEN_WIDTH
		return PixelRatio.roundToNearestPixel(width)
	}

	render() {
		let propsList = {
			...this.props,
			ref: ref => this.scrollView = ref,
			horizontal: true,
			pagingEnabled: true,
			bounces: false,
			onScrollEndDrag: this._onScrollEndDrag,
			onMomentumScrollEnd: this._onMomentumScrollEnd,
			removeClippedSubviews: false,
			showsHorizontalScrollIndicator: false,
			contentOffset: { x: this._getWidth(), y: 0 },
			overScrollMode: 'always',
			snapToInterval: Platform.OS == 'android' ? this._getWidth() : null,
			decelerationRate: Platform.OS == 'android' ? 'fast' : null,
			style: [
				StyleSheet.flatten(this?.props?.style),
				{ width: this._getWidth() },
			]
		}
		if (this.reloadData.length <= 0) {
			return (<View {...this.props} />)
		}
		return (
			<ScrollView 
				{...propsList}
			>
				<HTBannerContentView ref={ref => this.contentView = ref} viewList={this.viewList} renderItem={this._renderItem} />
			</ScrollView>
		)
	}

}