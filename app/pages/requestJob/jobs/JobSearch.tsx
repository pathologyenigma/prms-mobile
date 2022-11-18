import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, StatusBar, SectionList, Pressable } from 'react-native'
import styles from './styles/JobSearch.style'
import { GenProps } from '../../../utils/StackProps'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextPressable from '../../components/NextPressable'
import NavBar, { EButtonType } from '../../components/NavBar'
import SearchTextinput from '../../components/SearchTextinput'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { greenColor } from '../../../utils/constant'
import GradientButton from '../../components/GradientButton'

import HTHistoryManager from './model/HTHistoryManager'

type IProps = GenProps<'JobSearch'> & {

}

interface IState {
  dataSource: [],
  selectItem: any,
  searchValue: string,
  selectCity: string
  searchHistory: any,
  searchGuess: any,
  searchHot: any,
}

export default class JobSearch extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      searchHistory: [],
      searchGuess: [
        { id: 0, label: '网页设计师' },
        { id: 1, label: '富德生命人寿保险' },
        { id: 2, label: '兼职设计' },
        { id: 3, label: '三七互娱' },
        { id: 4, label: '面试直达', fire: 1 },
      ],
      searchHot: [
        { id: 0, label: '多益网络' },
        { id: 1, label: '欢聚集团（JOYY )' },
        { id: 2, label: '小鹏汽车' },
        { id: 3, label: '三七互娱' },
        { id: 4, label: '华资软件' },
      ],
      refreshState: RefreshState.HeaderRefreshing,
      selectItem: undefined,
      searchValue: '',
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
  	this.setState({ searchHistory: valueList.map((item, index) => ({ id: index, label: item })) })
  }

  renderNavBar() {
    const { navigation } = this.props
    const { selectCity, searchValue } = this.state
    return (
      <View style={styles.navBar}>
        <NextPressable
          style={styles.locationBtn}
          onPress={() => {
          	navigation.push('JobSelectCity', {
              mode: 1,
              selectJobCityCallback: (e: any) => {
                console.log('eeeee: ', e)
                this.setState({ selectCity: e[1].name })
              }
            })
          }}
        >
          <Image
            style={styles.locationIcon}
            source={require('../../../assets/requestJobs/location-icon.png')}
          />
          <Text style={styles.locationText}>{selectCity}</Text>
        </NextPressable>
        <Pressable style={CONTAINER} onPress={() => {
        	navigation.push('JobSearchResult')
        }}>
        <SearchTextinput
          cellStyle={{ flex: 1, height: 33 }}
          inputProps={{
          	pointerEvents: 'none',
	        editable: false,
            value: searchValue,
            placeholder: '搜索职位/公司/商区',
            onSubmitEditing: () => {
            	navigation.push('JobSearchResult', { value: this.state.searchValue })
            }
          }}
          onChangeText={(value: string) => {
            this.setState({ searchValue: value })
          }}
        />
        </Pressable>
        <NextPressable
          style={styles.cancelBtn}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Text style={styles.cancelText}>取消</Text>
        </NextPressable>
      </View>
    )
  }

  renderSectionHeader(section: any) {
    if (section.title === '搜索历史') {
      return (
        <View style={styles.searchHeader}>
          <Text style={styles.searchHeaderTitle}>{section.title}</Text>
          <NextPressable
            style={styles.deleteHistory}
            onPress={async () => {
            	await HTHistoryManager.clearValueList()
            	this.loadData()
            }}
          >
            <Image
              source={require('../../../assets/requestJobs/delete-icon.png')}
              style={styles.deleteHistoryIcon}
            />
          </NextPressable>
        </View>
      )
    }
    return (
      <View style={styles.searchHeader}>
        <Text style={styles.searchHeaderTitle}>{section.title}</Text>
      </View>
    )
  }

  renderItem(item: any) {
    const { selectItem, dataSource } = this.state
    const { navigation } = this.props
    return (
      <NextPressable
        style={[styles.tagBtn,
          // selectItem && selectItem.id === item.id && { backgroundColor: '#E2FFF0', }
        ]}
        onPress={() => {
          this.setState({ searchValue: item.label }, () => {
            navigation.push('JobSearchResult', { value: this.state.searchValue })
          })
        }}
      >
        <Text
          numberOfLines={1}
          style={[styles.tagText,
            // selectItem && selectItem.id === item.id && { backgroundColor: '#E2FFF0', } && { color: greenColor, fontWeight: 'bold' }
          ]}>
          {item.label}
        </Text>
      </NextPressable>
    )
  }

  renderList() {
    const { selectItem } = this.state
    const { searchHistory, searchGuess, searchHot } = this.state
    const dataSource = [
      {
        title: '搜索历史',
        data: searchHistory
      },
      {
        title: '猜你要搜',
        data: searchGuess
      },
      {
        title: '热门公司',
        data: searchHot
      },
    ]
    return (
      <SectionList
        style={styles.listView}
        // 注意:下述样式用于 section 分 3 列展示,可能在后面版本被弃用.若被弃用,考虑每个 section 使用 flatlist 或者 ScrollView 的方案
        // https://github.com/facebook/react-native/issues/13192
        contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}
        sections={dataSource}
        renderSectionHeader={({ section }) => this.renderSectionHeader(section)}
        renderItem={({ item }: any) => this.renderItem(item)}
        keyExtractor={item => item.id.toString()}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          animated
          barStyle={'dark-content'}
        />
        {this.renderNavBar()}
        {this.renderList()}
      </View>
    )
  }
}