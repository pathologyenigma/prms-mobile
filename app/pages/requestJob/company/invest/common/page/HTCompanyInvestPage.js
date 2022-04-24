import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import HTNavigationBar from '~/common/navigation/HTNavigationBar'
import { HTPageManager } from 'react-native-selected-page'
import HTInvestPersonPage from '../../person/common/page/HTInvestPersonPage'
import HTInvestEnterprisePage from '../../enterprise/common/page/HTInvestEnterprisePage'

export default class HTCompanyInvestPage extends Component {

	constructor(props) {
		super(props)
		this.pageManager = new HTPageManager([
			{ title: '自然人', pageClass: HTInvestPersonPage },
			{ title: '企业/机构', pageClass: HTInvestEnterprisePage }
		])
	}

	_renderNavigationBar = () => {
		return (
			<HTNavigationBar
				title={'找投资'}
				leftItemList={[
					<TouchableOpacity style={{ height: '100%', justifyContent: 'center', paddingRight: 20 }} onPress={this.props.navigation.goBack}>
						<Image source={require('~/assets/black_back.png')} />
					</TouchableOpacity>
				]}
			/>
		)
	}

	_renderPageHeader = () => {
		let Header = this.pageManager.renderHeaderView
		return (
			<Header
				style={{ height: 44, backgroundColor: 'white' }}
				titleFromItem={ item => item.title }
				initScrollIndex={ 0 }
				itemContainerStyle={{ flex: 1 }}
				itemTitleStyle={{ fontSize: 15 }}
				itemTitleNormalStyle={{ color: '#666' }}
				itemTitleSelectedStyle= {{ color: '#54D693', fontSize: 16}}
				cursorStyle={{ width: null, transform: [{ scaleX: 0.1 }], height: 2, backgroundColor: '#54D693' }}
			/>
		)
	}

	_renderPageContent = () => {
		let Content = this.pageManager.renderContentView
		return (
			<Content 
				initScrollIndex={ 0 }
				renderItem={({item, index}) => {
					let PageClass = item.pageClass
					return (
						<PageClass navigation={this.props.navigation} />
					)
				}} 
			/>
		)
	}

	render() {

		return (
			<View style={styleList.container}>
				{
					this._renderNavigationBar()
				}
				{
					this._renderPageHeader()
				}
				{
					this._renderPageContent()
				}
			</View>
		)
	}

}

const styleList = StyleSheet.create({
	container: {
		flex: 1,
	}
})