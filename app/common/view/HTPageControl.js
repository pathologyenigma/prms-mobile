import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class HTPageControl extends Component {

	constructor(props) {
		super(props)
		this.state = {
			selectedIndex: 0
		}
	}

	render() {
		return (
			<View pointerEvents={'none'} style={[StyleSheet.absoluteFill, styleList.container]}>
			{
				this.props.data.map((item, index) => {
					let itemStyle = [
						styleList.itemContainer,
						this.state.selectedIndex == index ? styleList.itemContainerSelected : styleList.itemContainerNormal
					]
					return (
						<View key={index} style={itemStyle}>
						</View>
					)
				})
			}
			</View>
		)
	}

}

const styleList = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-end',
		marginBottom: 20,
	},
	itemContainer: {		
		width: 7, 
		height: 7,
		borderRadius: 7 / 2.0, 
		marginLeft: 2.5, 
		marginRight: 2.5, 
		marginTop: 2.5, 
		marginBottom: 2.5
	},
	itemContainerNormal: {
		backgroundColor: 'rgba(255, 255, 255, 0.3)', 
	},
	itemContainerSelected: {
		backgroundColor: 'white'
	}
})