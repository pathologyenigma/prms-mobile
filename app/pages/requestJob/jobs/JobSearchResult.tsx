import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, StatusBar, FlatList, SectionList } from 'react-native'
import styles from './styles/JobSearchResult.style'
import { GenProps } from '../../../utils/StackProps'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextPressable from '../../components/NextPressable'
import { Tabs } from '@ant-design/react-native'
import NavBar, { EButtonType } from '../../components/NavBar'
import SearchTextinput from '../../components/SearchTextinput'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { greenColor } from '../../../utils/constant'
import GradientButton from '../../components/GradientButton'
import JobCellData from '../../components/JobCellData'

import SystemHelper from '../../../utils/system'
import CompanyJobCell from '../publicView/CompanyJobCell'
import CompanyCell from '../find/CompanyCell'

import { connect } from 'react-redux'
import { reformComFinancing, reformCompanySize, reformEducation, reformSalary } from '~/utils/utils'

import HTRefreshManager from '~/common/refresh/HTRefreshManager'
import { HTPageHeaderView, HTPageManager } from 'react-native-selected-page'

import HTHistoryManager from './model/HTHistoryManager'

type IProps = GenProps < 'JobSearchResult' > & {

}

interface IState {
    jobDataSource: any,
        companyDataSource: any,
        searchValue: string,
        selectCity: string,
        selectTabs: number
    jobRefreshState: any,
        companyRefreshState: any,
}

class JobSearchContent extends Component {

	constructor(props) {
		super(props)
		this.refreshManager = new HTRefreshManager()
		this.state = {
			itemList: []
		}
	}

	_onRefresh = (isHeaderRefresh = true, shouldLoading = false) => {
		if (this.refreshManager.cantHandlerRefresh(isHeaderRefresh)) {
    		return
    	}
        HTAPI.CandidateSearchJob({
	        filter: {
	            page: this.refreshManager.reloadPageIndex(isHeaderRefresh),
	            pageSize: this.refreshManager.pageCount,
	            ...this.props.filterConfig
	        },
	        keyword: this.props.searchValue
	    }).then(response => {
	    	this.state.itemList = this.refreshManager.reloadItemList(response.data.map(item => {
        		item.min_education = item.item?.min_education.name
        		return item
        	}), this.state.itemList, isHeaderRefresh)
	    }).finally(() => this.setState(this.state))
	}

	renderJobCell(item: any) {
        return (
            <JobCellData
	            cellStyle={{
	            	borderRadius: 0,
	            	borderBottomWidth: 5,
	            	borderBottomColor: '#F7F7F7',
	            	marginTop: 0
	            }}
	            cellItem={item}
	            index={0}
	            onPress={() => {
	            	this.props.navigation.push('JobDetail', { jobid: item.job_id })
	            }}
	      />
        )
    }

	render() {
		return (
			<FlatList
        		data={this.state.itemList}
        		renderItem={({ item }: any) => this.renderJobCell(item)}
        		onRefresh={() => this._onRefresh(true)}
		        onEndReached={() => this._onRefresh(false)}
		        refreshManager={this.refreshManager}
		        {...global.BIND_EMPTY_VIEW()}
        	/>
        )
	}

}

class CompanySearchContent extends Component {

	constructor(props) {
		super(props)
		this.refreshManager = new HTRefreshManager()
		this.state = {
			itemList: []
		}
	}

	_onRefresh = (isHeaderRefresh = true, shouldLoading = false) => {
		if (this.refreshManager.cantHandlerRefresh(isHeaderRefresh)) {
    		return
    	}
        HTAPI.UserSearchEnterprise({
            keyword: this.props.searchValue,
            page: this.refreshManager.reloadPageIndex(isHeaderRefresh),
            pageSize: this.refreshManager.pageCount,
        }).then(response => {
        	this.state.itemList = this.refreshManager.reloadItemList(response.data.map(item => {
        		item.data = item.jobs.map(job => {
                	job.experience = job.min_experience
                	job.education = job.min_education
                	job.salary = [job.min_salary, job.max_salary]
                	const [address, city, province, ...other] = [...job.address_description].reverse()
                	job.location = `${province} ${city}`
                	return job
                })
                item.company = item.enterprise_name
                item.isOfficial = true
                item.isBestEmployer = true

                item.welfare = item.enterprise_welfare
                // item.industry = item.industry_involved
                // item.years = 10
                item.tag = item.tags

                item.score = 5
                item.onlineJobs = `在招职位154个`


                item.location = null
                item.logo = item.enterprise_logo
                item.financing = reformComFinancing(item.enterprise_financing)
                item.staffAmount = reformCompanySize(item.enterprise_size)
                item.feature = item.industry_involved.join(' ')
                return item
        	}), this.state.itemList, isHeaderRefresh)
        }).finally(() => this.setState(this.state))
	}

	renderSectionHeader(section: any) {
        return (
            <CompanyCell
		        cellStyle={{
		          marginTop: 0,
		          borderRadius: 0,
		          borderBottomWidth: 5,
		          borderBottomColor: '#F7F7F7',
		        }}
		        cellItem={section}
		        onPress={() => this.props.navigation.push('CompanyDetail', { id: section.id })}
      		/>
        )
    }

    renderSectionFooter(section: any) {
        return (
            <NextPressable
        style={styles.moreJobsBtn}
        onPress={() => this.props.navigation.push('CompanyDetail', { id: section.id })}
      >
        <Text style={styles.moreJobsText}>
          查看更多
        </Text>
        <Image
          style={styles.moreJobsImage}
          source={require('../../../assets/requestJobs/next-green.png')}
        />
      </NextPressable>
        )
    }

    renderItemSeparatorComponent() {
        return (
            <View style={{
		        marginLeft: 21,
		        width: SystemHelper.width - 42,
		        height: 1,
		        backgroundColor: '#F0F0F0',
      		}} 
      		/>
        )
    }

    renderCompanyCell(item: any) {
        return (
            <CompanyJobCell
		        cellItem={item}
		        onPress={() => {
		        	this.props.navigation.push('JobDetail', { jobid: item.id })
		        }}
		    />
        )
    }

	render() {
		return (
            <SectionList
		        style={styles.listView}
		        sections={this.state.itemList}
		        ItemSeparatorComponent={() => this.renderItemSeparatorComponent()}
		        renderSectionHeader={({ section }) => this.renderSectionHeader(section)}
		        renderSectionFooter={({ section }) => this.renderSectionFooter(section)}
		        onRefresh={() => this._onRefresh(true)}
		        onEndReached={() => this._onRefresh(false)}
		        refreshManager={this.refreshManager}
		        {...global.BIND_EMPTY_VIEW()}
		        renderItem={({ item }: any) => this.renderCompanyCell(item)}
		        stickySectionHeadersEnabled={false}
      		/>
        )
	}
}












class JobSearchResult extends Component < IProps, IState > {
    constructor(props: IProps) {
        super(props)
        this.pageList = [
        	{ title: '职位', PageClass: JobSearchContent },
        	{ title: '公司', PageClass: CompanySearchContent },
        ]
        this.pageManager = new HTPageManager(this.pageList, (pageIndex) => {
        	this.pageList.map(item => item.selected = false)
        	this.pageList[pageIndex].selected = true
        	this.pageList[pageIndex].ref._onRefresh(true, true)
        })
        this.state = {
            searchValue: this?.props?.route?.params?.value ?? '',
            selectCity: '广州',
            filterConfig: {},
        }
        HTHistoryManager.insertValue(this.state.searchValue)
    }

    renderNavBar() {
        const { navigation } = this.props
        const { selectCity, searchValue } = this.state
        return (
            <View style={styles.navBar}>
        <NextPressable
          style={styles.locationBtn}
          onPress={ navigation.goBack }
        >
          <Image
            style={styles.locationIcon}
            source={require('../../../assets/requestJobs/navbar-back.png')}
          />
        </NextPressable>
        <SearchTextinput
          cellStyle={{ flex: 1, height: 33 }}
          inputProps={{
            value: searchValue,
            placeholder: '搜索职位/公司/商区',
            onSubmitEditing: () => {
            	HTHistoryManager.insertValue(this.state.searchValue)
            	this.pageList.map(item => item.ref._onRefresh(true, true))
            }
          }}
          onChangeText={(value: string) => {
            this.setState({ searchValue: value })
          }}
        />
        {/* <NextPressable
          style={styles.cancelBtn}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Text style={styles.cancelText}>取消</Text>
        </NextPressable> */}
      </View>
        )
    }

    render() {
        let Header = this.pageManager.renderHeaderView
        let Content = this.pageManager.renderContentView
        return (
            <View style={styles.container}>
		        <StatusBar
		          translucent
		          backgroundColor="transparent"
		          animated
		          barStyle={'dark-content'}
		        />
		        {this.renderNavBar()}
		        <View style={{ flex: 1 }} >
		          <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 15 }}>
		          <Header
			          style={{ flex: 1, height: 50 }}
			          titleFromItem={item => item.title}
			          initScrollIndex={0}
			          itemContainerStyle={{ paddingHorizontal: 10, marginLeft: 0 }}
			          itemTitleStyle={{ fontSize: 13, fontWeight: '500' }}
			          itemTitleNormalStyle={{ color: '#666' }}
			          itemTitleSelectedStyle= {{ color: '#7DDBA3' }}
			          cursorStyle={{ width: null, transform: [{ scaleX: 0.4 }], height: 2, backgroundColor: 'transparent' }}
		          />
		          <View style={styles.conditionRightView}>
			          <NextPressable style={styles.conditionRightBtn} onPress={() => {
			          	this.props.navigation.push('JobSelectCity', {
			              mode: 1,
			              selectJobCityCallback: (e: any) => {
			                console.log('eeeee: ', e)
			                // this.setState({ selectJobCity: e })
			              }
			            })
			          }}>
			            <Text style={styles.conditionRightText}>
			              地点
			            </Text>
			            <Image
			              style={styles.rightBottomImg}
			              source={require('../../../assets/requestJobs/right-bootom-triangle.png')}
			            />
			          </NextPressable>
			          <NextPressable
			            style={[styles.conditionRightBtn, { marginLeft: 9 }]}
			            onPress={() => {
			              const { navigation } = this.props
			              navigation.push('FilterView', {
			                filterMode: this.pageList.findIndex(item => item.selected) + 1,
			                filterResultCallback: ((result) => {
			                   this.setState({ filterConfig: result }, () => this.pageList.map(item => item.ref._onRefresh(true, true)))
			                })
			              })
			            }}
			          >
			            <Text style={styles.conditionRightText}>
			            筛选
			            </Text>
			            <Image
			              style={styles.rightBottomImg}
			              source={require('../../../assets/requestJobs/right-bootom-triangle.png')}
			            />
			          </NextPressable>
			        </View>
		          </View>
		          <Content
		          	renderItem={({ item, index }) => {
		          		return <item.PageClass 
		          			ref={ref => item.ref = ref} 
		          			navigation={this.props.navigation}
		          			searchValue={this.state.searchValue} 
		          			filterConfig={this.state.filterConfig}
		          		/>
		          	}}
		          />
		        </View>
		    </View>
        )
    }
}


export default JobSearchResult