import React, { useRef, Component } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import PagerView from 'react-native-pager-view'
import JobPage from './JobPage'
import usePagerView from '../../hooks/usePagerView'
import TabBar from '../../components/TabBar'
import NavBar from '../../components/NavBar'
import GradientButton from '../../components/GradientButton'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { StackScreenProps } from '@react-navigation/stack'
import { JobStatus } from '../../typings'
import { JobParamList } from '../typings'
import { HTPageManager } from 'react-native-selected-page'

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

const tabs = ['在线中', '审核中', '已下线']
const states: JobStatus[] = ['InRecruitment', 'NotPublishedYet', 'OffLine']

export default class JobAdmin extends Component {

	constructor(props) {
		super(props)
		let itemList = [
			{ title: '在线中', value: 'InRecruitment' },
			{ title: '未上线', value: 'NotPublishedYet' },
			{ title: '已下线', value: 'OffLine' }
		]
		this.pageManager = new HTPageManager(itemList, (pageIndex) => {
			itemList[pageIndex]?.ref?._onRefresh(true, false)
		})
	}

	componentDidAppear({ isSecondAppear }) {
		if (isSecondAppear) {
			this.pageManager.data.map(item => {
				item?.ref?._onRefresh(true, false)
			})
		}
	}

	render() {
		let Header = this.pageManager.renderHeaderView
		let Content = this.pageManager.renderContentView
		return (
			<View style={styles.container}>
		      <NavBar title="职位管理" />
		      <Header 
		      	style={{ height: 46, backgroundColor: 'white', borderTopColor: '#F0F0F0', borderTopWidth: SEPARATOR_HEIGHT }}
		      	titleFromItem={ item => item.title }
		      	itemContainerStyle={CONTAINER}
		      	itemTitleStyle={{ fontSize: 15, fontWeight: 'bold' }}
				itemTitleNormalStyle={{ color: '#333333' }}
				itemTitleSelectedStyle= {{ color: '#7FDDA1', fontSize: 14.5}}
				cursorStyle={{ width: 16, height: 4, borderRadius: 2, bottom: -0.5, backgroundColor: '#7FDDA1' }}
		      />
		      <Content renderItem={({ item, index }) => {
		      	return (
		      		<JobPage ref={ref => item.ref = ref} status={item.value} navigation={this.props.navigation} />
		      	)
		      }} />
		      <GradientButton
		        style={styles.button}
		        title="发布职位"
		        onPress={() => this.props.navigation.push('PostJob')}
		      />
		    </View>
		)
	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginBottom: isIphoneX() ? 37 : 8,
    marginHorizontal: 22,
    marginTop: 8,
  },
})
