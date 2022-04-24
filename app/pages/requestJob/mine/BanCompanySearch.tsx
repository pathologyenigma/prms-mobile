import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, StatusBar, SectionList } from 'react-native'
import styles from './styles/BanCompanySearch.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import NavBar, { EButtonType } from '../../components/NavBar'
import SearchTextinput from '../../components/SearchTextinput'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import GradientButton from '../../components/GradientButton'

type IProps = GenProps<'BanCompanySearch'> & {

}

interface IState {
  dataSource: any,
  searchValue: string,
  allConnect: boolean
}

export default class BanCompanySearch extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      dataSource: [],
      searchValue: '',
      allConnect: false,
    }
  }

  componentDidMount() {

  }

  loadData() {
    this.setState({
      dataSource: [{
        id: 1,
        name: '深圳智慧网络有限公司1'
      }, {
        id: 2,
        name: '深圳智慧网络有限公司2'
      }]
    })
  }

  renderNavBar() {
    const { navigation } = this.props
    const { searchValue } = this.state
    return (
      <View style={styles.navBar}>
        <SearchTextinput
          cellStyle={{ flex: 1, height: 33 }}
          inputStyle={{ color: '#888888', fontSize: 13 }}
          inputProps={{
            value: searchValue,
            placeholder: '请输入要屏蔽的公司',
            autoFocus: true
          }}
          onChangeText={(value: string) => {
            this.setState({ searchValue: value }, () => {
              this.loadData()
            })
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

  renderItem(item: any) {
    const { dataSource } = this.state
    let selectIcon = require('../../../assets/requestJobs/pingbi-weixuan.png')
    if (item.selected) {
      selectIcon = require('../../../assets/requestJobs/pingbi-xuanzhong.png')
    }
    return (
      <NextTouchableOpacity
        key={item.id.toString()}
        style={styles.tagBtn}
        onPress={() => {
          const nextDs: any = []
          dataSource.forEach((comItem: any) => {
            if (comItem.id === item.id) {
              nextDs.push({
                ...item,
                selected: !item.selected
              })
            } else {
              nextDs.push(comItem)
            }
          })
          this.setState({
            dataSource: nextDs
          })
        }}
      >
        <Image
          source={selectIcon}
          style={styles.selectedIcon}
          resizeMode="center"
        />
        <Text
          numberOfLines={1}
          style={[styles.tagText,
            // selectItem && selectItem.id === item.id && { backgroundColor: '#E2FFF0', } && { color: greenColor, fontWeight: 'bold' }
          ]}>
          {item.name}
        </Text>
      </NextTouchableOpacity>
    )
  }

  renderList() {
    const { dataSource } = this.state
    return (
      <RefreshListView
        style={styles.listView}
        automaticallyAdjustContentInsets={false}
        data={dataSource}
        renderItem={({ item }: any) => this.renderItem(item)}
        keyExtractor={(item: any) => item.id.toString()}
        footerRefreshingText="加载更多"
        footerNoMoreDataText="没有更多了"
      />
    )
  }

  renderTips() {
    return (
      <View style={styles.searchTipsView}>
        <Image
          source={require('../../../assets/requestJobs/ban-company-search-tips.png')}
          style={styles.searchTipsIcon}
        />
        <View style={styles.tipsView}>
          <Text style={styles.wxts}>
            温馨提示：
          </Text>
          <Text style={styles.tips1}>
            请使用企业全称或企业简称中包含的关键词进行搜索：
          </Text>
          <Text style={styles.tipsDetail}>
            1、可选择屏蔽关键词，直接屏蔽名称中匹配关键词的全部企业
          </Text>
          <Text style={styles.tipsDetail}>
            2、可选择企业名称
          </Text>
          <Text style={styles.wxts}>
            屏蔽生效后，被屏蔽企业将无法查看你的简历
          </Text>
        </View>
      </View>
    )
  }

  renderFooterBtn() {
    const { dataSource, allConnect } = this.state
    const selectItems = dataSource.filter((e: any) => e.selected === true)
    return (
      <View style={styles.footerView}>
        <NextTouchableOpacity
          style={styles.checkAll}
          onPress={() => {
            this.setState({ allConnect: !allConnect })
          }}
        >
          <Image
            source={allConnect
              ? require('../../../assets/requestJobs/pingbi-xuanzhong.png')
              : require('../../../assets/requestJobs/pingbi-weixuan.png')}
            style={styles.checkAllIcon}
            resizeMode="center"
          />
          <Text style={styles.resetText}>所有与【深圳智慧网络有限公司】相关的公司</Text>
        </NextTouchableOpacity>
        <GradientButton
          disabled={selectItems.length === 0}
          containerStyle={styles.confirmBtn}
          linearStyle={styles.linearStyle}
          text={`屏蔽所选公司（${selectItems.length}）`}
          onPress={() => {

          }}
        />
      </View>
    )
  }

  render() {
    const { searchValue } = this.state
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          animated
          barStyle={'dark-content'}
        />
        {this.renderNavBar()}
        {searchValue ? (
          <View style={{ flex: 1 }}>
            {this.renderList()}
            {this.renderFooterBtn()}
          </View>
        ) : (
          this.renderTips()
        )}
      </View>
    )
  }
}