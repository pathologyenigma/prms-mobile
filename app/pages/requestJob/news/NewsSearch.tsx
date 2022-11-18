import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, StatusBar, SectionList } from 'react-native'
import styles from './styles/NewsSearch.style'
import { GenProps } from '../../../utils/StackProps'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextPressable from '../../components/NextPressable'
import NavBar, { EButtonType } from '../../components/NavBar'
import SearchTextinput from '../../components/SearchTextinput'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { greenColor } from '../../../utils/constant'
import GradientButton from '../../components/GradientButton'
import ListEmptyComponent from '../../components/ListEmptyComponent'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import MessageCell from './MessageCell'

type IProps = GenProps<'NewsSearch'> & {

}

interface IState {
  dataSource: [],
  selectItem: any,
  searchValue: string,
  searchHistory: any,
  searchList: any,
}

export default class NewsSearch extends Component<IProps, IState> {
  private openKey: any = undefined
  constructor(props: IProps) {
    super(props)
    const { route: { params } } = props
    this.state = {
      searchHistory: [
        { id: 0, label: '项目经理' },
        { id: 1, label: '德科科技有限公司' },
        { id: 2, label: 'UI兼职' },
      ],
      searchList: [
        {
          id: 1,
          name: '李女士',
          company: '深圳市猎优管理咨询有限公司',
          time: '19:20',
          message: '您好，我们公司正在招聘这个职位，有兴趣来么？',
        },
        {
          id: 2,
          name: '王女士',
          company: '深圳市猎优管理咨询有限公司',
          time: '19:20',
          message: '您好，我们公司正在招聘这个职位，有兴趣来么？',
        }
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
    const { searchValue } = this.state
    return (
      <View style={styles.navBar}>
        <SearchTextinput
          cellStyle={{ flex: 1, height: 33 }}
          inputProps={{
            value: searchValue,
            placeholder: '通过姓名或公司搜索联系人',
          }}
          onChangeText={(value: string) => {
            this.setState({ searchValue: value })
          }}
        />
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
            onPress={() => {

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
      <View style={styles.hotSearchHeader}>
        <Text style={styles.searchHeaderTitle}>{section.title}</Text>
        <Image
          style={styles.hotIcon}
          source={require('../../../assets/requestJobs/zhaopinhui-hot.png')}
        />
      </View>
    )
  }

  renderItem(item: any) {
    const { selectItem, dataSource } = this.state
    const { navigation } = this.props
    return (
      <NextPressable
        style={styles.cellItem}
        onPress={() => {
          this.setState({ searchValue: item.label }, () => {
            
          })
        }}
      >
        <Image
          style={styles.searchIcon}
          source={require('../../../assets/requestJobs/search-gray.png')}
        />
        <Text
          numberOfLines={1}
          style={styles.tagText}>
          {item.label}
        </Text>
        <NextPressable
          style={styles.deleteHistory}
          onPress={() => {

          }}
        >
          <Image
            source={require('../../../assets/requestJobs/delete-icon.png')}
            style={styles.deleteHistoryIcon}
          />
        </NextPressable>
      </NextPressable>
    )
  }

  renderHeaderView() {
    return (
      <View style={styles.searchHeader}>
        <Text style={styles.searchHeaderTitle}>最近搜索</Text>
      </View>
    )
  }

  renderFooterView() {
    return (
      <NextPressable
        style={styles.clearAllBtn}
        onPress={() => {

        }}
      >
        <Text style={styles.clearAllText}>清空历史记录</Text>
      </NextPressable>
    )
  }

  renderHistoryList() {
    const { searchHistory } = this.state
    return (
      <RefreshListView
        style={styles.listView}
        automaticallyAdjustContentInsets={false}
        ListHeaderComponent={this.renderHeaderView()}
        ListFooterComponent={this.renderFooterView()}
        data={searchHistory}
        renderItem={({ item }: any) => this.renderItem(item)}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <ListEmptyComponent
            emptyText="暂无搜索记录"
            emptyImage={require('../../../assets/requestJobs/find-search-empty.png')}
          />
        }
        // ItemSeparatorComponent={() => this.renderItemSeparatorComponent()}
        footerNoMoreDataText="没有更多了"
      />
    )
  }

  renderEmptyListImage() {
    return (
      <Text>
        没有更多了
      </Text>
    )
  }

  renderSearhListItem(item: any, rowMap: any, dataSource: any) {
    return (
      <SwipeRow
        key={item.item.id.toString()}
        rightOpenValue={-150}
        recalculateHiddenLayout
        closeOnRowPress
        disableRightSwipe
      >
        <View style={{
          alignItems: 'center',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          backgroundColor: '#f5f5f6',
        }}>
          <NextPressable
            style={styles.setTop}
            onPress={() => {
              if (this.openKey) {
                rowMap[this.openKey].closeRow()
              }
              Toast.show('消息置顶')
            }}
          >
            <Text style={styles.hideBtnText}>置顶</Text>
          </NextPressable>
          <NextPressable
            style={[styles.setTop, {
              backgroundColor: '#FF7777',
            }]}
            onPress={() => {
              if (this.openKey) {
                rowMap[this.openKey].closeRow()
              }
              Toast.show('消息删除')
            }}
          >
            <Text style={styles.hideBtnText}>删除</Text>
          </NextPressable>
        </View>
        <MessageCell
          cellItem={item.item}
          onPress={() => {
            Toast.show('click message')
          }}
        />
      </SwipeRow >
    )
  }

  renderSearchList() {
    const { searchList } = this.state
    return (
      <SwipeListView
        useFlatList
        keyExtractor={item => item.id.toString()}
        initialNumToRender={10}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        style={styles.listView}
        onRowClose={() => { this.openKey = undefined }}
        onRowOpen={(e) => { this.openKey = e }}
        automaticallyAdjustContentInsets={false}
        data={searchList}
        // renderHiddenItem={(item, rowMap) => {
        //   this.renderHiddenItem(item, rowMap)
        // }}
        // listViewRef={(e) => { this.flatList = e }}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator
        previewOpenValue={0.3}
        ListEmptyComponent={() => this.renderEmptyListImage()}
        renderItem={(item, rowMap) => this.renderSearhListItem(item, rowMap, searchList)}
      // ItemSeparatorComponent={() => this.renderSeparatorLine()}
      />
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
          this.renderSearchList()
        ) : this.renderHistoryList()}
      </View>
    )
  }
}