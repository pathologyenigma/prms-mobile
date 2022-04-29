import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import HTMaskView from '~/common/mask/HTMaskView'

export default class HTActionToast extends Component {

	constructor(props) {
		super(props)
		this._timer = null

		this.state = {
			text: '',
			opacity: new Animated.Value(0),
		}
		
	}

	show = (text = '操作成功', duration = 2000) => {
		this._timer && clearTimeout(this._timer)
		this.state.text = text
		this.setState(this.state, () => {
			HTMaskView.animation(this.state.opacity, 1, 20, 0, undefined, () => {
				this._timer && clearTimeout(this._timer)
				this._timer = setTimeout(() => {
					this.hidden()
				}, duration)
			})
		})
	}

	hidden = () => {
		if (this.state.opacity.value <= 0) {
			return
		}
		HTMaskView.animation(this.state.opacity, 0, 100, 0, undefined, () => {
			this.setState(this.state)
		})
	}

	render() {
		return (
			<View pointerEvents={'none'} style={[StyleSheet.absoluteFill, styleList.backgroundView]}>
				<Animated.View style={[styleList.titleContainer, this.props.style, { opacity: this.state.opacity }]}>
					<Image source={require('~/assets/toast_right.png')} />
					<Text style={styleList.titleLabel}>{this.state.text}</Text>
				</Animated.View>
			</View>
		)
	}

}

const styleList = StyleSheet.create({
	backgroundView: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	titleContainer: {
		width: 136,
		height: 130,
		borderRadius: 8,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	titleLabel: {
		marginTop: 15,
		fontSize: 14,
		color: 'white',
		textAlign: 'center',
		lineHeight: 22,
	}
})