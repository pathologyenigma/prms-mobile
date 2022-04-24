import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import HTNavigationBar from '~/common/navigation/HTNavigationBar'
import HTCompanyContentPage from '../../../common/page/HTCompanyContentPage'
import HTCompanyProjectFilterModal from '../view/HTCompanyProjectFilterModal'

export default class HTCompanyProjectPage extends Component {

	_renderNavigationBar = () => {
		return (
			<HTNavigationBar
				title={'全部项目'}
				leftItemList={[
					<TouchableOpacity style={{ height: '100%', justifyContent: 'center', paddingRight: 20 }} onPress={this.props.navigation.goBack}>
						<Image source={require('~/assets/black_back.png')} />
					</TouchableOpacity>
				]}
				rightItemList={[
					<TouchableOpacity style={styleList.navigationItemContainer} onPress={() => {
						this.filterModal.open()
					}}>
						<Text style={styleList.navigationItemTitle}>筛选</Text>
						<Image style={styleList.navigationItemImage} source={require('~/assets/requestJobs/right-bootom-triangle.png')} />
					</TouchableOpacity>
				]}
			/>
		)
	}

	render() {
		return (
			<View style={styleList.container}>
				{
					this._renderNavigationBar()
				}
				<ScrollView style={styleList.container}>
					<HTCompanyContentPage navigation={this.props.navigation} />
				</ScrollView>
				<HTCompanyProjectFilterModal ref={ref => this.filterModal = ref} />
			</View>
		)
	}

}

const styleList = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	navigationItemContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	navigationItemTitle: {
		marginRight: 3,
		fontSize: 14,
		color: '#333',
		fontWeight: '500'
	},
	navigationItemImage: {
		marginBottom: 3,
	}
})