import React, { Component } from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import HTNavigationBar from '~/common/navigation/HTNavigationBar'
import TalentPage from '../TalentList/TalentPage'
import HTHistoryManager from '~/pages/requestJob/jobs/model/HTHistoryManager'

export default class HTTalentSearchResultPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			keyword: this.props.navigation.getParam('keyword') ?? ''
		}
	}

	componentDidAppear() {
		if ((this?.state?.keyword?.length) <= 0) {
			this.searchInput.focus()
		}
	}

	render() {
		return (
            <View style={styleList.container}>
            	<View style={styleList.navigationBar}>
            		<HTRouteView style={styleList.navigationItemContainer} routeData={this.props.navigation.createRouteData('pop')}>
        				<Image source={require('~/assets/requestJobs/navbar-back.png')} />
        			</HTRouteView>
        			<TextInput
        				ref={ref => this.searchInput = ref}
        				style={styleList.searchInput}
        				value={this.state.keyword}
        				placeholder={'搜索人才名称'}
        				returnKeyType={'search'}
        				onChangeText={(text) => {
			            	this.setState({ keyword: text })
			          	}}
        				onSubmitEditing={() => {
        					HTHistoryManager.insertValue(this.state.keyword)
			            	this.contentPage._onRefresh(true, true)
			            }}
        			/>
            	</View>
            	<TalentPage ref={ref => this.contentPage = ref} filterConfig={{ keyword: this.state.keyword }} navigation={this.props.navigation} />
            </View>
		)
	}

}

const styleList = StyleSheet.create({
	container: {
		flex: 1,
	},
	navigationBar: {
		paddingTop: STATUS_BAR_HEIGHT,
		height: STATUS_BAR_HEIGHT + 44,
		flexDirection: 'row',
		alignItems: 'center',
	},
	navigationItemContainer: {
		paddingHorizontal: 15,
		justifyContent: 'center',
		height: '100%'
	},
	searchInput: {
		flex: 1,
		marginRight: 15,
		height: 35,
		borderRadius: 35 / 2.0,
		paddingHorizontal: 20,
		backgroundColor: '#eee',
		fontSize: 14,
		color: '#333',
	}

})