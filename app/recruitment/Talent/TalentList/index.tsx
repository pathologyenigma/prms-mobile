import React, { useState, useEffect, Component } from 'react'
import { View, StyleSheet } from 'react-native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import TalentListEmpty from './TalentListEmpty'
import NavBar from './NavBar'
import { useSimpleOnlineJobs } from './useSimpleOnlineJobs'
import { StackScreenProps } from '@react-navigation/stack'
import { TalentParamList } from '../typings'
import LoadingAndError from '../../components/LoadingAndError'
import { headerHeight } from '../../theme'
import TalentPager from './TalentPager'

export default class TalentList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			jobItems: [],
			checkedJobId: 0,
		}
	}

	componentDidMount() {
		HTAPI.UserGetJobListByEntId({ pageSize: 20 }).then(response => {
			let checkedJobId = response.data[0].job_id
	  		this.setState({ 
	  			jobItems: response.data, 
	  			checkedJobId 
	  		})
	  	})
	}

	render() {
	  const { jobItems, checkedJobId } = this.state
	  const { navigation } = this.props

	  const jobItem = jobItems?.find(job => job.job_id === checkedJobId)
	  const jobName = jobItem?.title
	  const jobCategory = jobItem?.category

	  if ((jobItems?.length ?? 0) <= 0) {
	    return (
	      <LoadingAndError
	        loadingStyle={{ paddingTop: headerHeight() + 40 }}
	        loading={false}
	        error={null}>
	        <FocusAwareStatusBar barStyle={'dark-content'} />
	        <TalentListEmpty
	          onPublishPress={() => navigation.navigate('PostJob')}
	        />
	      </LoadingAndError>
	    )
	  }

	  return (
	    <View style={styles.container}>
	      <FocusAwareStatusBar barStyle={'light-content'} />
	      <NavBar
	        jobs={jobItems}
	        checkedJobId={checkedJobId}
	        onJobItemChecked={(value) => {
	        	this.setState({ checkedJobId: value })
	        }}
	        onPlusPress={() => navigation.navigate('JobAdmin')}
	        onSearchPress={() => navigation.navigate('CandidateSearch')}
	      />
	      <TalentPager navigation={navigation} jobName={jobName} jobCategory={jobCategory} />
	    </View>
	  )
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
