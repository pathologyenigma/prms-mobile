import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList } from 'react-native'
import styles from './styles/AttachedResume.style'
import { GenProps } from '../../../utils/StackProps'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import ListEmptyComponent from '../../components/ListEmptyComponent'
import { format } from 'date-fns'
import NextPressable from '../../components/NextPressable'
import SystemHelper from '../../../utils/system'
import { calculateSize } from '../../../utils/utils'
import LinearGradient from 'react-native-linear-gradient'
import BottomContentModal from '../../components/BottomContentModal'
import AlertContentModal from '../../components/AlertContentModal'

type IProps = GenProps<'AttachedResume'> & {

}

interface IState {
  refreshState: RefreshState.HeaderRefreshing,
  dataSource: any,
  editVisible: boolean,
  deleteVisible: boolean
}

export default class AttachedResume extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      refreshState: RefreshState.HeaderRefreshing,
      dataSource: [],
      editVisible: false,
      deleteVisible: false
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    const localDataSource = [{
      id: 1,
      type: '文件简历',
      name: '李小冉的个人作品集.PDF',
      fileType: 'PDF',
      fileSize: 4.92 * 1024 * 1024,
      time: '2021-08-23T17:30:10.000Z',
    }, {
      id: 2,
      type: '文件简历',
      name: '李小冉的个人简历.PDF',
      fileType: 'PDF',
      fileSize: 9.92 * 1024,
      time: '2021-08-29T17:30:10.000Z',
    }]
    setTimeout(() => {
      this.setState({
        dataSource: localDataSource,
        refreshState: 3
      })
    }, 300);
  }

  renderNavBar() {
    const { navigation } = this.props
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
        }}
        title="附件简历"
        left={{
          style: { width: 17, height: 17, },
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
      />
    )
  }

  handleRefresh() {

  }

  handleEndReached() {

  }

  renderHeader() {
    const { dataSource } = this.state
    return (
      <View style={styles.cellHeader}>
        <Text style={styles.cellHeaderTitle}>文件简历</Text>
        <Text style={styles.jianliText}>
          <Text style={styles.jianliAmount}>{dataSource.length}</Text>
          /3
        </Text>
      </View>
    )
  }

  renderUploadBtn() {
    const start = { x: 0, y: 1 }
    const end = { x: 0, y: 0 }
    return (
      <View style={styles.footerView}>
        <NextPressable
          style={styles.uploadBtn}
          onPress={() => {
            const { navigation } = this.props
            navigation.push('AttachedResumeUploadType')
          }}
        >
          <Image
            style={styles.uploadIcon}
            resizeMode="center"
            source={require('../../../assets/requestJobs/jianli-tianjia.png')}
          />
          <Text style={styles.uploadText}>上传简历/作品集</Text>
        </NextPressable>
        <Text style={styles.useVipText}>使用专业级简历模板升级简历</Text>
        <LinearGradient
          start={start}
          end={end}
          colors={['#FFFFFF', '#FFF0E8']}
          style={styles.linear}
        >
          <Image
            style={styles.uploadVipIcon}
            resizeMode="center"
            source={require('../../../assets/requestJobs/jianli-vip.png')}
          />
          <View style={styles.cellInfo}>
            <Text style={styles.vipTitle}>专属简历模版</Text>
            <Text style={styles.vipDetail}>专业面试官好评  一键生成  多款样式</Text>
          </View>
          <Image
            style={styles.nextIcon}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </LinearGradient>
      </View>
    )
  }

  renderItem(item: any) {
    const fileSize = calculateSize(item.fileSize)
    let fileType = require('../../../assets/requestJobs/jianli-pdf.png')
    if (item.fileType === 'PDF') {
      fileType = require('../../../assets/requestJobs/jianli-pdf.png')
    }
    return (
      <NextPressable
        style={styles.cellStyle}
        onPress={() => {

        }}
      >
        <Image
          source={fileType}
          style={styles.fileType}
          resizeMode="center"
        />
        <View style={styles.cellInfo}>
          <Text style={styles.cellName}>{item.name}</Text>
          <Text style={styles.fileInfo}>{`${fileSize} ${format(new Date(item.time), 'yyyy.MM.dd hh:mm')}上传`}</Text>
        </View>
        <NextPressable
          style={styles.editBtn}
          onPress={() => {
            this.setState({ editVisible: true })
          }}
        >
          <Image
            style={styles.chakanIcon}
            source={require('../../../assets/requestJobs/jianli-chakan.png')}
          />
        </NextPressable>
      </NextPressable >
    )
  }

  renderList() {
    const { dataSource, refreshState } = this.state
    return (
      <RefreshListView
        style={styles.listView}
        onHeaderRefresh={() => this.handleRefresh()}
        refreshState={refreshState}
        automaticallyAdjustContentInsets={false}
        data={dataSource}
        renderItem={({ item }: any) => this.renderItem(item)}
        ListHeaderComponent={this.renderHeader()}
        ListFooterComponent={this.renderUploadBtn()}
        // ListEmptyComponent={
        //   refreshState !== RefreshState.HeaderRefreshing && (
        //     <ListEmptyComponent
        //       emptyText="暂无关注其他成员"
        //       emptyImage={require('../../../assets/requestJobs/no-focus.png')}
        //     />
        //   )
        // }
        onFooterRefresh={() => this.handleEndReached}
        keyExtractor={(item: any) => item.id.toString()}
        footerRefreshingText=""
        footerNoMoreDataText=""
      />
    )
  }

  renderRename() {
    const { navigation } = this.props
    return (
      <View style={styles.bottomView}>
        <NextPressable
          style={styles.editNameBtn}
          onPress={() => {
            this.setState({
              editVisible: false
            }, () => {
              navigation.push('AttachedResumeRename')
            })
          }}
        >
          <Text style={styles.editNameText}>重命名</Text>
        </NextPressable>
        <NextPressable
          style={styles.deleteBtn}
          onPress={() => {
            this.setState({
              editVisible: false,
            }, () => {
              this.setState({ deleteVisible: true })
            })
          }}
        >
          <Text style={styles.deleteText}>删除</Text>
        </NextPressable>
        <NextPressable
          style={styles.cancelBtn}
          onPress={() => {
            this.setState({
              editVisible: false
            })
          }}
        >
          <Text style={styles.editNameText}>取消</Text>
        </NextPressable>
      </View>
    )
  }

  render() {
    const { editVisible, deleteVisible } = this.state
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderList()}
        <BottomContentModal
          visible={editVisible}
        >
          {this.renderRename()}
        </BottomContentModal>
        <AlertContentModal
          visible={deleteVisible}
          detail="是否确定删除此附件简历"
          bottomStyle={{ marginTop: 37 }}
          leftBtn={{
            title: '取消',
            act: () => this.setState({
              deleteVisible: false,
            }),
          }}
          rightBtn={{
            title: '确定',
            act: () => {
              // 删除操作
              this.setState({ deleteVisible: false }, () => {

              })
            },
          }}
        />
      </View>
    )
  }
}