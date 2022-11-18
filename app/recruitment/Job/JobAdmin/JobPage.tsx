import React, { useCallback, useState, useEffect, Component } from 'react'
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native'
import { JobItem, useJobList } from './useJobList'
import { JobParamList } from '../typings'
import Empty from '../../components/Empty'
import JobAdminItem from './JobAdminItem'
import { StackNavigationProp } from '@react-navigation/stack'
import LoadingAndError from '../../components/LoadingAndError'
import { JobStatus } from '../../typings'
import {
  stringForEducation,
  stringForExperience,
  stringForFullTime,
} from '../../utils/JobHelper'
import HTRefreshManager from '~/common/refresh/HTRefreshManager'

interface PageProps {
  status: JobStatus
  isActive: boolean
}

export default class JobPage extends Component {

	constructor(props) {
		super(props)
		this.refreshManager = new HTRefreshManager()
		this.refreshManager.pageCount = 20
		this.state = {
			itemList: []
		}
	}

	componentDidMount() {
		
	}

	_onRefresh = (isHeaderRefresh = true, showLoading = false) => {
		console.log(isHeaderRefresh, showLoading)
		if (this.refreshManager.cantHandlerRefresh(isHeaderRefresh)) {
			return
		}
		HTAPI.UserGetJobListByEntId({ 
			status: this.props.status, 
			pageSize: this.refreshManager.pageCount,
			page: this.refreshManager.reloadPageIndex(isHeaderRefresh)
		}).then(response => {
	  		let itemList = response.data.map((job) => {
	  			const title = job.title
			      const tags: Tag[] = []
			      const { emergency, full_time_job } = job
			      if (emergency) {
			        tags.push({
			          text: '急聘',
			          color: '#EB3B2B',
			        })
			      }

			      // tags.push({
			      //   text: stringForFullTime(full_time_job),
			      //   color: '#6CD6B3',
			      // })

			      const labels: string[] = []
			      const { min_experience, min_education, address: address_description } = job
			      labels.push(stringForExperience(min_experience))
			      labels.push(stringForEducation(min_education))
			      labels.push(`${address_description[4]}·${address_description[5]}`)

			      const { min_salary, max_salary, salary: _salary } = job
			      let salary = _salary?.[0] / 1000 + 'K-' + _salary?.[1] / 1000 + 'K'
			      if (_salary?.[0] == _salary?.[1] && _salary?.[0] == 0) {
			      	salary = '面议'
			      }
			      const status = job.status
			      const jobId = job.job_id

			      return {
			      	...job,
			        title,
			        tags,
			        labels,
			        salary,
			        status,
			        jobId,
			      }
	  		})
	  		this.state.itemList = this.refreshManager.reloadItemList(itemList, this.state.itemList, isHeaderRefresh)
	  	}).catch(e => {
	  		console.log(e)
	  	}).finally(() => this.setState(this.state))
	}

	_renderItem = ({ item, index }) => {
	    return (
	      <JobAdminItem
	        {...item}
	        onPress={() => this.props.navigation.push('EmployerJobDetail', { jobId: item?.job_id ?? item.id, status: this.props.status })}
	      />
	    )
	}

	render() {
		return (
			<FlatList
	          style={styles.container}
	          contentContainerStyle={styles.content}
	          keyExtractor={(job: JobItem, index: number) => String(job.job_id)}
	          data={this.state.itemList}
	          onRefresh={() => this._onRefresh(true)}
	          onEndReached={() => this._onRefresh(false)}
	          refreshManager={this.refreshManager}
	          renderItem={this._renderItem}
	          ListEmptyComponent={Empty}
	        />
		)
	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
})
