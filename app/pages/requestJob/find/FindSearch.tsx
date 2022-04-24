import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, StatusBar, SectionList } from 'react-native'
import styles from './styles/FindSearch.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import NavBar, { EButtonType } from '../../components/NavBar'
import SearchTextinput from '../../components/SearchTextinput'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { greenColor } from '../../../utils/constant'
import GradientButton from '../../components/GradientButton'

type IProps = GenProps<'FindSearch'> & {

}

interface IState {
  dataSource: [],
  selectItem: any,
  searchValue: string,
  searchHistory: any,
  searchHot: any,
  searchType: number // 0-找公司; 1-找招聘会
}

export default class FindSearch extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { route: { params } } = props
    this.state = {
      searchType: params && params.searchType || 0,
      searchHistory: [
        { id: 0, label: '项目经理' },
        { id: 1, label: '德科科技有限公司' },
        { id: 2, label: 'UI兼职' },
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
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {

  }

  renderNavBar() {
    const { navigation } = this.props
    const { searchValue, searchType } = this.state
    return (
      <View style={styles.navBar}>
        <SearchTextinput
          cellStyle={{ flex: 1, height: 33 }}
          inputProps={{
            value: searchValue,
            placeholder: searchType === 0 ? '找公司' : '找招聘会',
          }}
          onChangeText={(value: string) => {
            this.setState({ searchValue: value })
          }}
        />
        <NextTouchableOpacity
          style={styles.cancelBtn}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Text style={styles.cancelText}>取消</Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  renderSectionHeader(section: any) {
    if (section.title === '搜索历史') {
      return (
        <View style={styles.searchHeader}>
          <Text style={styles.searchHeaderTitle}>{section.title}</Text>
          <NextTouchableOpacity
            style={styles.deleteHistory}
            onPress={() => {

            }}
          >
            <Image
              source={require('../../../assets/requestJobs/delete-icon.png')}
              style={styles.deleteHistoryIcon}
            />
          </NextTouchableOpacity>
        </View>
      )
    }
    return (
      <View style={styles.hotSearchHeader}>
        <Text style={styles.searchHeaderTitle}>{section.title}</Text>
        <Image
          style={styles.hotIcon}
          source={require('../../../assets/requestJobs/zhaopinhui-hot.png')}
        />
      </View>
    )
  }

  renderItem(item: any, section: any, index: number) {
    console.log('section: ', section)
    const { selectItem, dataSource } = this.state
    const { navigation } = this.props
    return (
      <NextTouchableOpacity
        style={[styles.tagBtn,
          // selectItem && selectItem.id === item.id && { backgroundColor: '#E2FFF0', }
        ]}
        onPress={() => {
          this.setState({ searchValue: item.label }, () => {
            navigation.push('FindSearchResult')
          })
        }}
      >
        <Text
          numberOfLines={1}
          style={[styles.tagText,
            // selectItem && selectItem.id === item.id && { backgroundColor: '#E2FFF0', } && { color: greenColor, fontWeight: 'bold' }
          ]}>
          {section.title !== '搜索历史' && index < 3 && (
            <Text style={styles.rank}>{`${(index + 1).toString()} `}</Text>
          )}
          {item.label}
        </Text>
      </NextTouchableOpacity>
    )
  }

  renderList() {
    const { searchType } = this.state
    const { searchHistory, searchHot } = this.state
    const dataSource = [
      {
        title: '搜索历史',
        data: searchHistory
      },
      {
        title: searchType === 0 ? '热门公司' : '人气最旺招聘会',
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
        renderItem={({ item, section, index }: any) => this.renderItem(item, section, index)}
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