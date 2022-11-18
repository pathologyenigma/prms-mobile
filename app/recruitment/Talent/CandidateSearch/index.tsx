import React, { useState, useCallback, Component } from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import SearchTextinput from '~/pages/components/SearchTextinput'
import IconLabelButton from '../../components/IconLabelButton'
import TextButton from '../../components/TextButton'
import IconButton from '../../components/IconButton'
import OnlineJobItem from './OnlineJobItem'
import NavBar from '../../components/NavBar'
import TalentPage from '../TalentList/TalentPage'
import { StackScreenProps } from '@react-navigation/stack'
import { TalentParamList } from '../typings'

import HTHistoryManager from '~/pages/requestJob/jobs/model/HTHistoryManager'

const histories = ['产品经理', '德科科技有限公司']

export default class CandidateSearch extends Component {

	constructor(props) {
		super(props)
		this.state = {
			searchHistory: [],
			onlineJobList: [],
			selectCity: '深圳'
		}
	}

	componentDidMount() {
		this.loadData()
	}

	componentDidAppear({ isSecondAppear }) {
		if (isSecondAppear) {
			this.loadData()
		}
	}

	loadData = async () => {
		let valueList = await HTHistoryManager.readValueList()
		this.setState({ searchHistory: valueList })
		HTAPI.UserGetJobListByEntId({ status: 'InRecruitment', pageSize: 30 }).then(response => {
	  		this.setState({ 
	  			onlineJobList: response.data, 
	  		})
	  	})
	}

	render() {
		const { navigation } = this.props
		return (
	    <View style={styles.container}>
	      <NavBar>
	        <IconLabelButton
	          style={styles.city}
	          icon={require('./location.png')}
	          label={this.state.selectCity}
	          onPress={() => {
	          	navigation.push('JobSelectCity', {
	              mode: 1,
	              selectJobCityCallback: (e: any) => {
	                console.log('eeeee: ', e)
	                this.setState({ selectCity: e[1].name })
	              }
	            })
	          }}
	        />
	        <Pressable style={CONTAINER} onPress={() => {
	        	navigation.push('HTTalentSearchResultPage')
	        }}>
		        <SearchTextinput
		        	inputProps={{
		        		pointerEvents: 'none',
		        		editable: false,
		        		placeholder: "搜索人才名称"
		        	}}
		        />
	        </Pressable>
	        <TextButton
	          style={styles.cancel}
	          title="取消"
	          onPress={() => navigation.goBack()}
	        />
	      </NavBar>
	      <ScrollView
	      style={styles.container}
	      contentContainerStyle={styles.content}>
	      <View style={styles.section}>
	        <View style={styles.sectionHeader}>
	          <Text style={styles.sectionTitle}>历史搜索</Text>
	          <IconButton
	            style={styles.clearHistoryButton}
	            icon={require('./clear.png')}
	            onPress={async () => {
	            	await HTHistoryManager.clearValueList()
            		this.loadData()
	            }}
	          />
	        </View>
	        <View style={styles.sectionBody}>
	          {this.state.searchHistory.map((text, index) => (
	            <TextButton
	              style={styles.historyItem}
	              key={index}
	              title={text}
	              onPress={() => {
	              	navigation.push('HTTalentSearchResultPage', { keyword: text })
	              }}
	            />
	          ))}
	        </View>
	      </View>
	      <View style={styles.section}>
	        <View style={styles.sectionHeader}>
	          <Text style={styles.sectionTitle}>在线职位</Text>
	        </View>
	        <View style={styles.sectionBody}>
	        {
	        	this.state.onlineJobList.map((item, index) => {
	        		return (
	        			<Pressable key={index} onPress={() => {
	        				navigation.push('HTTalentSearchResultPage', { keyword: item.category[item.category.length - 1] })
	        			}}>
	        				<OnlineJobItem item={item} />
	        			</Pressable>
	        		)
	        	})
	        }
	        </View>
	      </View>
	      {/* <View style={styles.section}>
	      <View style={styles.sectionHeader}>
	        <Text style={styles.sectionTitle}>热搜榜</Text>
	      </View>
	    </View> */}
	    </ScrollView>
	    </View>
	  )
	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  city: {
    marginLeft: 11,
    marginRight: 19,
  },
  cancel: {
    paddingHorizontal: 11,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  section: {
    marginHorizontal: 21,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  clearHistoryButton: {},
  sectionBody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  historyItem: {
    marginRight: 11,
    marginBottom: 11,
    height: 34,
    lineHeight: 34,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    color: '#666666',
    fontSize: 13,
    paddingHorizontal: 14,
  },
  filterbar: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  labelGroup: {
    flex: 1,
    paddingHorizontal: 10.5,
  },
  labelStyle: {
    color: '#7DDBA3',
    fontSize: 13,
    fontWeight: '500',
    // ios 垂直居中
    lineHeight: 40,
  },
  labelInactiveStyle: {
    color: '#666666',
    fontSize: 13,
    fontWeight: 'normal',
    lineHeight: 40,
  },
  filterButton: {
    marginRight: 11,
  },
})
