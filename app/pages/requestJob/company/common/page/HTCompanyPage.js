import React, { Component, Fragment } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import HTNavigationBar from '~/common/navigation/HTNavigationBar'
import HTBannerView from '~/common/view/HTBannerView'
import HTPageControl from '~/common/view/HTPageControl'
import { HTPageManager } from 'react-native-selected-page'
import HTCompanyContentPage from './HTCompanyContentPage'

export default class HTCompanyPage extends Component {

	constructor(props) {
		super(props)
		this.pageManager = new HTPageManager([
			{ title: '天使轮' },
			{ title: 'A轮' },
			{ title: 'B轮' },
			{ title: 'C轮' },
			{ title: 'D轮' },
		])
	}

	_renderBannerList = () => {
		let bannerList = [
			{ image: 'https://img.freepik.com/free-vector/gradient-japanese-temple-with-sun_52683-44985.jpg?t=st=1648102330~exp=1648102930~hmac=a63b99b0930beb9813f38e062a6ad7e70a377ae547dda332c9ed771812206619&w=1800' },
			{ image: 'https://img.freepik.com/free-vector/hand-drawn-hug-day-background_52683-77750.jpg?w=1800&t=st=1648102109~exp=1648102709~hmac=851da9bdcc229ad1e5a5c216a31ac97d3ba38a9fdd92ba18356b86b0cfb77b09' },
			{ image: 'https://img.freepik.com/free-vector/gradient-japanese-temple-with-lake_52683-45004.jpg?t=st=1648102330~exp=1648102930~hmac=9e7b86d93d01fff984818d8e932ab843faca17d6d0158d504c9bb6a6ced38045&w=1800' },
			{ image: 'https://img.freepik.com/free-vector/japanese-temple-surrounded-by-nature_52683-46009.jpg?t=st=1648102330~exp=1648102930~hmac=4b2082ba63fee60a0f29215e03b268bd4cc1ad1b65043fd67b064a3c36ca7a14&w=1800' },
			{ image: 'https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg?t=st=1648102330~exp=1648102930~hmac=d8dc59cddb1ab798f9e60aaa2c7a8c2880c7ba9a463d1e6cba2d6e3455a2701f&w=1800' },
			{ image: 'https://img.freepik.com/free-vector/spring-landscape-scene_52683-56303.jpg?w=1800' }
		].sort(() => Math.random() - 0.5)
		return (
			<View style={styleList.bannerBoxContainer}>
				<View style={styleList.bannerContainer}>
					<HTBannerView
						style={styleList.bannerContent}
						data={bannerList}
						keyExtractor={(item, index) => {
							let key = `-${bannerList[index].image}`
							return key
						}}
						didChange={(selectedIndex) => {
							this.pageControl.setState({
								selectedIndex: selectedIndex
							})
						}}
						renderItem={({ item, index }) => {
							return (
								<View style={styleList.bannerItemContainer}>
									<CacheImage style={styleList.bannerItemImage} source={{ uri: item.image }} />
								</View>
							)
						}}
					/>
				</View>
				<HTPageControl
					ref={ref => this.pageControl = ref}
					data={bannerList}
				/>
			</View>
	    )
	}

	_renderCircleList = () => {
		let circleList = [
			{ title: '找项目', image: require('~/assets/requestJobs/company_menu_project.png'), onPress: () => this.props.navigation.push('HTCompanyProjectPage') },
			{ title: '找投资', image: require('~/assets/requestJobs/company_menu_invest.png'), onPress: () => this.props.navigation.push('HTCompanyInvestPage') },
		]
		return (
			<View style={styleList.circleContainer}>
			{
				circleList.map((item, index) => {
					return (
						<TouchableOpacity key={index} style={styleList.circleItemContainer} onPress={item.onPress}>
							<Image style={styleList.circleItemImage} source={item.image} />
							<Text style={styleList.circleItemTitle}>{item.title}</Text>
						</TouchableOpacity>
					)
				})
			}
			</View>
		)
	}

	_renderPageHeader = () => {
		let Header = this.pageManager.renderHeaderView
		return (
			<Header
				style={{  backgroundColor: 'white', height: 55, paddingBottom: 10, paddingTop: 5, borderTopWidth: SEPARATOR_HEIGHT, borderTopColor: '#eee' }}
				titleFromItem={ item => item.title }
				initScrollIndex={ 0 }
				itemContainerStyle={{ paddingHorizontal: 10, marginLeft: 10 }}
				itemTitleStyle={{ fontSize: 15 }}
				itemTitleNormalStyle={{ color: '#666' }}
				itemTitleSelectedStyle= {{ color: '#54D693', fontSize: 16}}
				cursorStyle={{ width: null, transform: [{ scaleX: 0.4 }], height: 2, backgroundColor: '#54D693' }}
			/>
		)
	}

	_renderPageContent = () => {
		let Content = this.pageManager.renderContentView
		return (
			<Content 
				initScrollIndex={ 0 }
				renderItem={({item, index}) => {
					return (
						<HTCompanyContentPage navigation={this.props.navigation} />
					)
				}} 
			/>
		)
	}

	render() {
		return (
			<View style={styleList.container}>
			<HTNavigationBar 
				title={'创业'}
			/>
			<ScrollView style={CONTAINER} stickyHeaderIndices={[2]}>
			{
				this._renderBannerList()
			}
			{
				this._renderCircleList()
			}
			{
				this._renderPageHeader()
			}
			{
				this._renderPageContent()
			}
			</ScrollView>
			</View>
		)
	}

}

const styleList = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	bannerBoxContainer: {
		paddingHorizontal: 15,
		backgroundColor: 'white'	
	},
	bannerContainer: {
		borderRadius: 5,
		overflow: 'hidden'
	},
	bannerContent: {
		width: SCREEN_WIDTH - 30,
		height: 150,
	},
	bannerItemContainer: {
		backgroundColor: '#54D693',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	bannerItemImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover'
	},
	circleContainer: {
		backgroundColor: 'white',
		paddingTop: 20,
		paddingBottom: 15,
		flexDirection: 'row',
		alignItems: 'center'
	},
	circleItemContainer: {
		flex: 1,
		alignItems: 'center'
	},
	circleItemImage: {
		width: 45,
		height: 45,
		borderRadius: 45 / 2.0,
		overflow: 'hidden',
	},
	circleItemTitle: {
		marginTop: 7,
		fontSize: 13,
		color: '#666',
	},


})