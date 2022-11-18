import React, { Component, useEffect, useState } from 'react'
import { FlatList, ListRenderItem, StyleSheet, Pressable } from 'react-native'
import LoadingAndError from '../../components/LoadingAndError'
import NoMoreFooter from './NoMoreFooter'
import TalentListItem from './TalentListItem'
import UpgradeFeature from './UpgradeFeature'

import HTRefreshManager from '~/common/refresh/HTRefreshManager'

interface TalentPageProps {
  jobName?: string
  jobCategory?: [string]
  sortByUpdatedTime: boolean,
  navigation?: any,
  filterConfig?: any
}

function educationDesc(education: Education | null) {
  switch (education) {
    case 'Junior':
      return '初中'
    case 'High':
      return '高中'
    case 'JuniorCollege':
      return '大专'
    case 'RegularCollege':
      return '本科'
    case 'Postgraduate':
      return '研究生'
    case 'Doctor':
      return '博士'
    default:
      return '小学及以下'
  }
}

export default class TalentPage extends Component {

	constructor(props) {
		super(props)
		this.refreshManager = new HTRefreshManager()
		this.refreshManager.pageCount = 20
		this.state = {
			itemList: []
		}
	}

	componentDidMount() {
		this._onRefresh()
	}

	_onRefresh = (isHeaderRefresh = true, showLoading = true) => {
		if (this.refreshManager.cantHandlerRefresh(isHeaderRefresh)) {
			return
		}
		HTAPI.ENTSearchCandidates({
			filter: this.props.filterConfig,
			pageSize: this.refreshManager.pageCount,
			page: this.refreshManager.reloadPageIndex(isHeaderRefresh)
		}, { showLoading }).then(response => {
			let reloadItemList = response.data.map(item => {
			const {
				id,
				name,
				salary,
				personal_advantage,
				education,
				experience,
				job_expectation,
				skills,
				gender,
				resume_data
			} = item
			const firstExpectation = job_expectation[0]
			return {
				id,
				name,
				online: true,
				onlineDesc: '1 小时前在线',
				advantage: resume_data?.personal_advantage || '暂无描述',
				experience: `工作 ${experience || 0} 年`,
				education: educationDesc(education),
				salary: `${firstExpectation.min_salary_expectation / 1000}-${firstExpectation.max_salary_expectation / 1000}K`,
				job: `期望：${firstExpectation.industry_involved.join('/')}`,
				skills: `${resume_data.skills.join('·')}`,
				gender: gender ? 'male' : 'female',
				avatar: '',
			}
			})
			this.state.itemList = this.refreshManager.reloadItemList(reloadItemList, this.state.itemList, isHeaderRefresh)
		}).finally(() => this.setState(this.state))
	}

	_renderItem = ({ item }) => {
		return (
	    	<Pressable onPress={() => {
	    		this.props.navigation.push('TalentDetail', { id: item.id })
	    	}}>
	    		<TalentListItem {...item} />
	    	</Pressable>
	    )
	}

	render() {
		return (
			<FlatList
				style={styles.container}
				contentContainerStyle={styles.content}
				data={this.state.itemList}
				renderItem={this._renderItem}
				// ListHeaderComponent={UpgradeFeature}
				{...global.BIND_EMPTY_VIEW()}
				onRefresh={(endRefresh) => {
					this._onRefresh(true, false)
				}}
				refreshManager={this.refreshManager}
				onEndReached={() => {
					this._onRefresh(false, false)
				}}
			/>
		  )
	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
  },
  filterButton: {
    marginRight: 11,
  },
  filterbar: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
  },
  labelGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  checkedLabelStyle: {
    color: '#7DDBA3',
    fontSize: 13,
    fontWeight: 'bold',
    // ios 垂直居中
    lineHeight: 40,
  },
  labelStyle: {
    color: '#666666',
    fontSize: 13,
    fontWeight: 'normal',
    lineHeight: 40,
    paddingHorizontal: 11,
  },
})
