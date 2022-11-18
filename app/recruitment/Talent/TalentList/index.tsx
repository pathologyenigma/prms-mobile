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
			selectedIndex: 0,
		}
	}

	componentDidAppear({ isSecondAppear }) {
		if (isSecondAppear) {
			this._onRefresh()
		}
	}

	componentDidMount() {
		this._onRefresh()
	}

	_onRefresh = () => {
		HTAPI.UserGetJobListByEntId({ status: 'InRecruitment', pageSize: 30 }).then(response => {
	  		this.setState({ 
	  			jobItems: response.data, 
	  			selectedIndex: response?.data?.length <= this.state.selectedIndex ? 0 : this.state.selectedIndex
	  		}, () => {
	  			setTimeout(() => {
	  				this?.page?.contentPage?._onRefresh(true, true)
	  			}, 5000)
	  		})
	  	})
	}

	render() {
	  const { jobItems, selectedIndex } = this.state
	  const { navigation } = this.props

	  const jobItem = jobItems[selectedIndex]
	  const jobCategory = jobItem?.category ?? []

	  if ((jobItems?.length ?? 0) <= 0) {
	    return (
	      <LoadingAndError
	        loadingStyle={{ paddingTop: headerHeight() + 40 }}
	        loading={false}
	        error={null}>
	        {/*<FocusAwareStatusBar barStyle={'dark-content'} />*/}
	        <TalentListEmpty
	          onPublishPress={() => navigation.push('PostJob')}
	        />
	      </LoadingAndError>
	    )
	  }

	  return (
	    <View style={styles.container}>
	      {/*<FocusAwareStatusBar barStyle={'light-content'} />*/}
	      <NavBar
	        jobs={jobItems}
	        selectedIndex={selectedIndex}
	        onJobItemChecked={(index) => {
	        	this.setState({ selectedIndex: index }, () => {
	        		this?.page?.contentPage?._onRefresh(true, true)
	        	})
	        }}
	        onPlusPress={() => navigation.navigate('JobAdmin')}
	        onSearchPress={() => navigation.navigate('CandidateSearch')}
	      />
	      <TalentPager ref={ref => this.page = ref} navigation={navigation} jobCategory={jobCategory} />
	    </View>
	  )
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: global.TAB_BAR_HEIGHT
  },
})
