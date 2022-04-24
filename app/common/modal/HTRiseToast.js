import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import HTMaskView from '~/common/mask/HTMaskView'

export default class HTRiseToast extends Component {

	constructor(props) {
		super(props)
		this.index = 0
		this.state = {
			itemList: []
		}
	}

	show = (title, duration = 2000, showImage = false) => {
		this.index += 1
		this.state.itemList.splice(0, 0, {
			index: this.index,
			title, 
			showImage,
			duration,
			_hidden: false
		})
		if (this.state.itemList.length > 5) {
			this.state.itemList.splice(this.state.itemList.length - 1, 1)
		}
		this.setState(this.state)
	}

	itemDidHidden = (item) => {
		item._hidden = true
		let findNotHiddenItem = this.state.itemList.find(item => item._hidden == false)
		if (findNotHiddenItem != null) {
			return
		}
		this.setState({
			itemList: []
		})
	}

	render() {
		return (
			<View pointerEvents={'none'} style={[StyleSheet.absoluteFill, styleList.container]}>
			{
				this.state.itemList.map((item, index) => {
					return (
						<HTRiseToastContent
							key={item.index} 
							{...item} 
							itemDidHidden={() => this.itemDidHidden(item)}
						/>
					)
				})
			}
			</View>
		)
	}

}

class HTRiseToastContent extends Component {

	constructor(props) {
		super(props)
		this._timer = null
		this.opacity = new Animated.Value(0),
		this.translateY = new Animated.Value(0)
	}

	componentDidMount() {
		HTMaskView.animation(this.translateY, -100, 400)
		HTMaskView.animation(this.opacity, 1, 400, 0, undefined, () => {
			this._timer && clearTimeout(this._timer)
			this._timer = setTimeout(() => {
				this.hidden()
				clearTimeout(this._timer)
			}, this.props.duration ?? 2000)
		})
	}

	componentWillUnmount() {
		clearTimeout(this._timer)
	}

	hidden = () => {
		if (this.opacity.value <= 0) {
			return
		}
		HTMaskView.animation(this.opacity, 0, 150, 0, undefined, this.props.itemDidHidden)
	}

	shouldComponentUpdate() {
		return false
	}

	render() {
		return (
			<Animated.View style={[styleList.titleContainer, this.props.style, { 
				opacity: this.opacity,
				transform: [{ translateY: this.translateY }]
			}]}>
				<View style={styleList.titleContent}>
					<Text style={styleList.titleLabel}>{this.props.title}</Text>
				</View>
			</Animated.View>
		)
	}

}

const styleList = StyleSheet.create({
	container: {
		bottom: 100,
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingLeft: 45,
		paddingRight: 45,
	},
	titleContent: {
		marginTop: 10,
		paddingVertical: 14,
		paddingHorizontal: 24,
		backgroundColor: COLOR_ALPHA('#FF4165', 0.9),
		borderRadius: 4,
		flexDirection: 'row',
		alignItems: 'center',
	},
	rightImage: {
		marginRight: 8,
	},
	titleLabel: {
		fontSize: 14,
		color: 'white',
		textAlign: 'center',
		lineHeight: 22,
	}
})