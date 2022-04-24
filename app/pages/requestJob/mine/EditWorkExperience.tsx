import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar, BackHandler, Switch } from 'react-native'
import styles from './styles/EditWorkExperience.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { TextInput } from 'react-native-gesture-handler'
import JobStatusModal from '../jobs/JobStatusModal'
import AlertContentModal from '../../components/AlertContentModal'
import SystemHelper from '../../../utils/system'
import GradientButton from '../../components/GradientButton'
import { format } from 'date-fns'

type IProps = GenProps<'EditWorkExperience'> & {

}

interface IState {
  selectImage: any,
  company: string,
  job: string,
  apartment: string,
  beginTime: string,
  endTime: string,
  content: string,
  hideInfo: boolean,
  beginTimeVisible: boolean,
  endTimeVisible: boolean,
  beginTimeArray: any,
  beginDateArray: any,
  deleteVisible: boolean,
  giveUpSaveVisible: boolean
}

export default class EditWorkExperience extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { route: { params: { workItem } } } = props
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    this.state = {
      company: (workItem && workItem.comp_name) || '',
      job: (workItem && workItem.pos_name) || '',
      apartment: (workItem && workItem.department) || '',
      beginTime: (workItem && workItem.start_at) || '',
      endTime: (workItem && workItem.end_at) || '',
      content: (workItem && workItem.working_detail) || '',
      hideInfo: (workItem && workItem.hideInfo) || false,
      selectImage: [],
      beginTimeVisible: false,
      endTimeVisible: false,
      deleteVisible: false,
      giveUpSaveVisible: false,
      beginTimeArray: [
        { label: '至今', value: '至今' },
        { label: '2021', value: '2021' },
        { label: '2020', value: '2020' },
        { label: '2019', value: '2019' },
        { label: '2018', value: '2018' },
        { label: '2017', value: '2017' },
        { label: '2016', value: '2016' },
        { label: '2015', value: '2015' },
        { label: '2014', value: '2014' },
        { label: '2013', value: '2013' },
        { label: '2012', value: '2012' },
        { label: '2011', value: '2011' },
        { label: '2010', value: '2010' },
      ],
      beginDateArray: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },
      ]
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  saveInfo() {
    const { navigation, route: { params: { workItem, workItemCallback } } } = this.props
    const { company, job, apartment, beginTime, endTime, content, hideInfo } = this.state
    const info: any = {
      compName: company,
      posName: job,
      department: apartment,
      startAt: beginTime,
      endAt: endTime,
      workDetail: content,
      hideFromThisCompany: false // TODO:一期对公司隐藏功能暂未开放
    }
    if (workItem && workItem.id) {
      info.id = workItem.id
    }
    console.log('infoinfo: ', info)
    HTAPI.CandidateEditWorkExprience({
    	info
    }).then(response => {
    	if (workItemCallback) {
          workItemCallback()
        }
        Toast.show('保存成功')
        setTimeout(() => {
          navigation.goBack()
        }, 1000)
    })
  }

  removeWorkExp() {
    const { navigation, route: { params: { workItem, workItemCallback } } } = this.props
    if (!workItem || !workItem.id) {
      Toast.show('配置错误,请重试或联系客服')
      return
    }
    HTAPI.CandidateRemoveWorkExp({ id: workItem.id }).then(response => {
    	Toast.show('删除成功')
        if (workItemCallback) {
          workItemCallback()
        }
        setTimeout(() => {
          navigation.goBack()
        }, 1000)
    })
  }

  onBackAndroid = () => {
    // 安卓返回按钮弹出退出确认框
    const { company, job, apartment, beginTime, endTime, content } = this.state
    const { navigation, route: { params: { workItem, workItemCallback } } } = this.props
    const disableSave = company || job || apartment || beginTime || endTime || content
    if (disableSave) {
      this.setState({ giveUpSaveVisible: true })
    } else {
      navigation.pop()
    }
    return true
  }

  renderNavBar() {
    const { company, job, apartment, beginTime, endTime, content, hideInfo } = this.state
    const { navigation, route: { params: { workItem, workItemCallback } } } = this.props
    const disableSave = company && job && apartment && beginTime && endTime && content
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
        }}
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/black_back.png'),
          act: () => {
            navigation.pop()
          },
        }}
        title={workItem ? '编辑工作经历' : '添加工作经历'}
        right={{
          type: EButtonType.TEXT,
          style: styles.saveBtn,
          value: workItem ? '' : ' 保存',
          disable: !disableSave,
          act: () => {
            this.saveInfo()
            // if (workItemCallback) {
            //   workItemCallback({ company, job, apartment, beginTime, endTime, content, hideInfo, index: workItem && workItem.index })
            // }
            // navigation.pop()
          },
        }}
      />
    )
  }

  renderCompany() {
    const { company } = this.state
    return (
      <View style={styles.cell}>
        <Text style={styles.cellTitle}>公司名称</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          style={styles.cellInput}
          placeholder="请填写"
          placeholderTextColor="#AAAAAA"
          value={company}
          onChangeText={(value) => {
            this.setState({ company: value })
          }}
        />
      </View>
    )
  }

  renderJob() {
    const { job } = this.state
    return (
      <View style={styles.cell}>
        <Text style={styles.cellTitle}>职位名称</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          style={styles.cellInput}
          placeholder="请填写"
          placeholderTextColor="#AAAAAA"
          value={job}
          onChangeText={(value) => {
            this.setState({ job: value })
          }}
        />
      </View>
    )
  }

  renderApartment() {
    const { apartment } = this.state
    return (
      <View style={styles.cell}>
        <Text style={styles.cellTitle}>所属部门</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          style={styles.cellInput}
          placeholder="请填写"
          placeholderTextColor="#AAAAAA"
          value={apartment}
          onChangeText={(value) => {
            this.setState({ apartment: value })
          }}
        />
      </View>
    )
  }

  renderDurationTime() {
    const { beginTime, endTime } = this.state
    return (
      <View style={styles.cell}>
        <Text style={styles.cellTitle}>在职时间</Text>
        <View style={styles.durationView}>
          <NextTouchableOpacity
            style={{ flex: 1, }}
            onPress={() => {
              this.setState({ beginTimeVisible: true })
            }}
          >
            <Text style={[styles.beginTime, beginTime.length !== 0 && { color: '#333333' }]}>
              {beginTime && format(new Date(beginTime), 'yyyy.MM') || '入职时间'}
            </Text>
          </NextTouchableOpacity>
          <Text style={styles.timeTips}>至</Text>
          <NextTouchableOpacity
            style={{ flex: 1, }}
            onPress={() => {
              this.setState({ endTimeVisible: true })
            }}
          >
            <Text style={[styles.beginTime, { textAlign: 'right' }, endTime.length !== 0 && { color: '#333333' }]}>
              {endTime && format(new Date(endTime), 'yyyy.MM') || '离职时间'}
            </Text>
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  renderWorkContent() {
    const { content } = this.state
    return (
      <View style={styles.contentCell}>
        <Text style={styles.cellTitle}>工作内容</Text>
        <View style={styles.inputView}>
          <TextInput
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            multiline={true}
            style={styles.contentInput}
            placeholder="请填写"
            placeholderTextColor="#AAAAAA"
            value={content}
            maxLength={500}
            onChangeText={(value) => {
              this.setState({ content: value })
            }}
          />
          <Text style={styles.contentAmount}>
            {`${content.length}/500`}
          </Text>
        </View>
      </View>
    )
  }

  renderHide() {
    const { hideInfo } = this.state
    return (
      <View style={styles.hideView}>
        <Text style={styles.hideText}>对这家公司隐藏我的信息</Text>
        <NextTouchableOpacity
          onPress={() => {
            Toast.show('暂未开放')
          }}
        >
          <Switch
            onValueChange={(res: boolean) => this.setState({ hideInfo: res })}
            thumbColor="#ffffff"
            trackColor={{ false: '#ddd', true: '#57DE9E' }}
            value={hideInfo}
            disabled={true}
          />
        </NextTouchableOpacity>
      </View>
    )
  }

  renderFooterBtn() {
    const { company, job, apartment, beginTime, endTime, content, hideInfo } = this.state
    const { navigation, route: { params: { workItem, workItemCallback } } } = this.props
    const disableSave = company && job && apartment && beginTime && endTime && content
    return (
      <View style={styles.footerView}>
        {workItem && (
          <NextTouchableOpacity
            style={styles.resetBtn}
            onPress={() => {
              this.setState({ deleteVisible: true })
            }}
          >
            <Text style={styles.resetText}>删除</Text>
          </NextTouchableOpacity>
        )}
        <GradientButton
          disabled={!disableSave}
          containerStyle={[styles.confirmBtn, !workItem && { marginLeft: 0 }]}
          linearStyle={[styles.linearStyle, !workItem && { width: SystemHelper.width - 42, marginLeft: 0 }]}
          text="完成"
          onPress={() => {
            this.saveInfo()
            // if (workItemCallback) {
            //   workItemCallback({ company, job, apartment, beginTime, endTime, content, hideInfo, index: workItem && workItem.index })
            // }
            // navigation.pop()
          }}
        />
      </View>
    )
  }

  render() {
    const { beginTimeVisible, endTimeVisible, beginTimeArray, beginDateArray, beginTime,
      deleteVisible, giveUpSaveVisible
    } = this.state
    const { navigation, route: { params: { workItem, workItemCallback } } } = this.props
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          animated
          barStyle={'dark-content'}
        />
        {this.renderNavBar()}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {this.renderCompany()}
          {this.renderJob()}
          {this.renderApartment()}
          {this.renderDurationTime()}
          {this.renderWorkContent()}
          {this.renderHide()}
        </ScrollView>
        {workItem && this.renderFooterBtn()}
        <JobStatusModal
          title="时间段"
          visible={beginTimeVisible}
          statusArray={beginTimeArray}
          timeArray={beginDateArray}
          currentStatus={beginTime}
          currentTime={beginTime}
          leftPress={() => {
            this.setState({ beginTimeVisible: false })
          }}
          rightPress={(selectBeginYear, selectBeginMonth) => {
            this.setState({
              beginTime: `${selectBeginYear}.${selectBeginMonth}`,
              beginTimeVisible: false,
            })
          }}
        />
        <JobStatusModal
          title="时间段"
          visible={endTimeVisible}
          statusArray={beginTimeArray}
          timeArray={beginDateArray}
          currentStatus={beginTime}
          currentTime={beginTime}
          leftPress={() => {
            this.setState({ endTimeVisible: false })
          }}
          rightPress={(selectBeginYear, selectBeginMonth) => {
            this.setState({
              endTime: `${selectBeginYear}.${selectBeginMonth}`,
              endTimeVisible: false,
            })
          }}
        />
        <AlertContentModal
          visible={deleteVisible || giveUpSaveVisible}
          title="友情提示"
          detail={deleteVisible ? '确定删除这条工作经历吗？' : '内容尚未保存，确定放弃？'}
          bottomStyle={{ marginTop: 37 }}
          leftBtn={{
            title: '取消',
            act: () => this.setState({
              deleteVisible: false,
              giveUpSaveVisible: false
            }),
          }}
          rightBtn={{
            title: deleteVisible ? '删除' : '退出',
            act: () => {
              if (deleteVisible) {
                // 删除操作
                this.setState({ deleteVisible: false }, () => {
                  this.removeWorkExp()
                })
              } else {
                // 退出操作
                navigation.pop()
              }
            },
          }}
        />
      </View>
    )
  }
}