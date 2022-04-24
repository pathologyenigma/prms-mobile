import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import HTMaskView from '~/common/mask/HTMaskView'

export default class Toast extends Component {

	constructor(props) {
		super(props)
		this._timer = null

		this.state = {
			text: '',
			opacity: new Animated.Value(0),
		}
		
	}

	show = (text, duration = 2000) => {
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
				<Animated.View style={[StyleSheet.absoluteFill, styleList.titleContainer, this.props.style, { opacity: this.state.opacity }]}>
					<View style={styleList.titleContent}>
						<Text style={styleList.titleLabel}>{this.state.text}</Text>
					</View>
				</Animated.View>
			</View>
		)
	}

}

const styleList = StyleSheet.create({
	backgroundView: {
		
	},
	titleContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 45,
		paddingRight: 45,
	},
	titleContent: {
		paddingVertical: 14,
		paddingHorizontal: 24,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		borderRadius: 4,
	},
	titleLabel: {
		fontSize: 15,
		color: 'white',
		textAlign: 'center',
		lineHeight: 24,
	}
})