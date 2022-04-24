import React, { Component } from 'react'
import { Text, View, Image, ScrollView } from 'react-native'
import styles from './styles/AttachedResumeUploadType.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import SystemHelper from '../../../utils/system'
import LinearGradient from 'react-native-linear-gradient'
import { BoxShadow } from 'react-native-shadow'
import WhiteContentModal from '../../components/WhiteContentModal'

type IProps = GenProps<'AttachedResumeUploadType'> & {

}

interface IState {
  selectTypeVisible: boolean,
}

export default class AttachedResumeUploadType extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      selectTypeVisible: false,
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
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
        title=""
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

  renderTitle() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>任选一种方式上传附件简历</Text>
        <Text style={styles.headerDetail}>支持word、pdf、ppt、txt、wps格式文件，文件大小需小于10M</Text>
      </View>
    )
  }

  renderComputerLoad() {
    const shadowOpt = {
      width: SystemHelper.width - 22,
      height: 71,
      color: "#eee",
      border: 2,
      radius: 6,
      opacity: 0.4,
      x: 0,
      y: 5,
    }
    return (
      <View style={{ marginTop: 30 }}>
        <BoxShadow setting={shadowOpt}>
          <NextTouchableOpacity
            style={styles.uploadView}
            onPress={() => {
              const { navigation } = this.props
              navigation.push('AttachedResumeComputer')
            }}
          >
            <Image
              style={styles.uploadVipIcon}
              resizeMode="center"
              source={require('../../../assets/requestJobs/diannao-upload.png')}
            />
            <Text style={styles.uploadTypeText}>电脑上传</Text>
            <Image
              style={styles.nextIcon}
              source={require('../../../assets/requestJobs/next-gray.png')}
            />
          </NextTouchableOpacity>
        </BoxShadow>
      </View>
    )
  }

  renderWeixinLoad() {
    const shadowOpt = {
      width: SystemHelper.width - 22,
      height: 71,
      color: "#eee",
      border: 2,
      radius: 6,
      opacity: 0.4,
      x: 0,
      y: 5,
    }
    return (
      <View style={{ marginTop: 30 }}>
        <BoxShadow setting={shadowOpt}>
          <NextTouchableOpacity
            style={styles.uploadView}
            onPress={() => {
              const { navigation } = this.props
              navigation.push('AttachedResumeWeixin')
            }}
          >
            <Image
              style={styles.uploadVipIcon}
              resizeMode="center"
              source={require('../../../assets/requestJobs/weixin-upload.png')}
            />
            <Text style={styles.uploadTypeText}>微信上传</Text>
            <Image
              style={styles.nextIcon}
              source={require('../../../assets/requestJobs/next-gray.png')}
            />
          </NextTouchableOpacity>
        </BoxShadow>
      </View>
    )
  }

  renderVipService() {
    const start = { x: 0, y: 1 }
    const end = { x: 0, y: 0 }
    return (
      <NextTouchableOpacity
        style={{ marginTop: 30 }}
        onPress={() => {
          Toast.show('敬请期待')
        }}
      >
        <LinearGradient
          start={start}
          end={end}
          colors={['#FFFFFF', '#FFF7EA']}
          style={styles.linear}
        >
          <Image
            style={styles.uploadVipIcon}
            resizeMode="center"
            source={require('../../../assets/requestJobs/bianjijianli.png')}
          />
          <View style={styles.cellInfo}>
            <Text style={styles.vipTitle}>1对1简历精修服务</Text>
            <Text style={styles.vipDetail}>面试邀约提升2倍</Text>
          </View>
          <Image
            style={styles.nextIcon}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </LinearGradient>
      </NextTouchableOpacity>
    )
  }

  renderSelectType() {
    return (
      <View style={styles.selectTypeView}>
        <Text style={styles.selectTypeTitle}>将此文件作为附件上传到趁早找？</Text>
        <Text style={styles.selectTypeDetail}>确认附件类型</Text>
        <NextTouchableOpacity
          style={styles.selectTypeBtn}
          onPress={() => {
            this.setState({ selectTypeVisible: false })
          }}
        >
          <Text style={styles.selectTypeBtnText}>简历附件</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.selectTypeBtn}
          onPress={() => {
            this.setState({ selectTypeVisible: false })
          }}
        >
          <Text style={styles.selectTypeBtnText}>作品集附件</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.selectTypeBtn}
          onPress={() => {
            this.setState({ selectTypeVisible: false })
          }}
        >
          <Text style={styles.cancelText}>取消</Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  render() {
    const { selectTypeVisible } = this.state
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView
          style={styles.scrollview}
        >
          {this.renderTitle()}
          {this.renderComputerLoad()}
          {this.renderWeixinLoad()}
          {this.renderVipService()}
        </ScrollView>
        <WhiteContentModal
          visible={selectTypeVisible}
          contextChildrenStyle={{ paddingBottom: 10 }}
        >
          {this.renderSelectType()}
        </WhiteContentModal>
      </View>
    )
  }
}