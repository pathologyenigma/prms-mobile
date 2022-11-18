import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar, BackHandler, Switch } from 'react-native'
import styles from './styles/EditWorkExperience.style'
import { GenProps } from '../../../utils/StackProps'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextPressable from '../../components/NextPressable'
import { TextInput } from 'react-native-gesture-handler'
import JobStatusModal from '../jobs/JobStatusModal'
import AlertContentModal from '../../components/AlertContentModal'
import SystemHelper from '../../../utils/system'
import GradientButton from '../../components/GradientButton'
import DatePickerModal from '../../components/DatePickerModal'
import { format, parse } from 'date-fns'

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
          <NextPressable
            style={{ flex: 1, }}
            onPress={() => {
              this.setState({ beginTimeVisible: true })
            }}
          >
            <Text style={[styles.beginTime, beginTime.length !== 0 && { color: '#333333' }]}>
              {beginTime && format(new Date(beginTime), 'yyyy.MM') || '入职时间'}
            </Text>
          </NextPressable>
          <Text style={styles.timeTips}>至</Text>
          <NextPressable
            style={{ flex: 1, }}
            onPress={() => {
              this.setState({ endTimeVisible: true })
            }}
          >
            <Text style={[styles.beginTime, { textAlign: 'right' }, endTime.length !== 0 && { color: '#333333' }]}>
              {endTime && format(new Date(endTime), 'yyyy.MM') || '离职时间'}
            </Text>
          </NextPressable>
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
        <NextPressable
          onPress={() => {
            global.TODO_TOAST()
          }}
        >
          <Switch
            onValueChange={(res: boolean) => this.setState({ hideInfo: res })}
            thumbColor="#ffffff"
            trackColor={{ false: '#ddd', true: '#57DE9E' }}
            value={hideInfo}
            disabled={true}
          />
        </NextPressable>
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
          <NextPressable
            style={styles.resetBtn}
            onPress={() => {
              this.setState({ deleteVisible: true })
            }}
          >
            <Text style={styles.resetText}>删除</Text>
          </NextPressable>
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
    const { beginTimeVisible, endTimeVisible, beginTime, endTime,
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
        <DatePickerModal
          visible={beginTimeVisible}
          currentDate={format(beginTime.length > 0 ? new Date(beginTime) : new Date(), 'yyyy-MM-dd')}
          leftPress={() => {
            this.setState({ beginTimeVisible: false })
          }}
          rightPress={(newDate) => {
            this.setState({
              beginTime: newDate.toISOString(),
              beginTimeVisible: false
            })
          }}
        />
        <DatePickerModal
          visible={endTimeVisible}
          currentDate={format(endTime.length > 0 ? new Date(endTime) : new Date(), 'yyyy-MM-dd')}
          leftPress={() => {
            this.setState({ endTimeVisible: false })
          }}
          rightPress={(newDate) => {
            this.setState({
              endTime: newDate.toISOString(),
              endTimeVisible: false
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