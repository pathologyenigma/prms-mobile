import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar, BackHandler } from 'react-native'
import styles from './styles/EditEducation.style'
import { GenProps } from '../../../utils/StackProps'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextPressable from '../../components/NextPressable'
import { TextInput } from 'react-native-gesture-handler'
import JobStatusModal from '../jobs/JobStatusModal'
import { AnyMxRecord } from 'dns'
import GradientButton from '../../components/GradientButton'
import AlertContentModal from '../../components/AlertContentModal'
import SystemHelper from '../../../utils/system'
import { selectEducation } from '../../../utils/utils'
import DatePickerModal from '../../components/DatePickerModal'
import { format, parse } from 'date-fns'

type IProps = GenProps<'EditEducation'> & {

}

interface IState {
  educationItem: any,
  name: string,
  education: string,
  fullTime: string,
  educationVisible: boolean,
  professional: string,
  beginTime: string,
  endTime: string,
  schoolExperience: string,
  beginTimeVisible: boolean,
  educationLevel: any,
  educationAllDay: any,
  deleteVisible: boolean,
  giveUpSaveVisible: boolean
}

export default class EditEducation extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { route: { params: { educationItem } } } = props
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    this.state = {
      educationItem,
      name: (educationItem && educationItem.school_name) || '',
      education: (educationItem && educationItem.education) || '',
      fullTime: (educationItem && educationItem.is_all_time ? '全日制' : '非全日制') || '',
      professional: (educationItem && educationItem.major) || '',
      beginTime: (educationItem && educationItem.time && educationItem.time.split('-')[0]) || '',
      endTime: (educationItem && educationItem.time.split('-') && educationItem.time.split('-').length > 1 && educationItem.time.split('-')[1]) || '',
      schoolExperience: (educationItem && educationItem.exp_at_school) || '',
      educationVisible: false,
      beginTimeVisible: false,
      endTimeVisible: false,
      deleteVisible: false,
      giveUpSaveVisible: false,
      educationLevel: [
        { label: '初中', value: 'Junior' },
        { label: '高中', value: 'High' },
        { label: '大专', value: 'JuniorCollege' },
        { label: '本科', value: 'RegularCollege' },
        { label: '硕士', value: 'Postgraduate' },
        { label: '博士', value: 'Doctor' }
      ],
      educationAllDay: [
        { label: '全日制', value: '全日制' },
        { label: '非全日制', value: '非全日制' },
      ]
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    // 安卓返回按钮弹出退出确认框
    const { navigation } = this.props
    const { name, professional, beginTime, endTime, schoolExperience, education, fullTime } = this.state
    const editInfo = name || professional || beginTime || endTime || schoolExperience || education || fullTime
    // const editAllInfo = name && professional && beginTime && endTime && schoolExperience && education && fullTime
    if (editInfo) {
      this.setState({ giveUpSaveVisible: true })
    } else {
      navigation.pop()
    }
    return true
  }

  renderNavBar() {
    const { name, professional, beginTime, endTime, schoolExperience, education, fullTime } = this.state
    const { navigation, route: { params: { educationItem, educationItemCallback } } } = this.props
    const editInfo = name || professional || beginTime || endTime || schoolExperience || education || fullTime
    const editAllInfo = name && professional && beginTime && endTime && schoolExperience && education && fullTime
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
            if (editInfo) {
              this.setState({ giveUpSaveVisible: true })
            } else {
              navigation.pop()
            }
          },
        }}
        title={educationItem ? '编辑教育经历' : '添加教育经历'}
        right={{
          type: EButtonType.TEXT,
          style: styles.saveBtn,
          value: educationItem ? '' : ' 保存',
          disable: !editAllInfo,
          act: () => {
            this.saveEduExperience()
          },
        }}
      />
    )
  }

  saveEduExperience() {
    const { name, professional, beginTime, endTime, schoolExperience, education, fullTime } = this.state
    const { navigation, route: { params: { educationItem, educationItemCallback } } } = this.props
    Hud.show()
    const info: any = {
      schoolName: name,
      education,
      major: professional,
      time: `${beginTime}-${endTime}`,
      exp_at_school: schoolExperience,
      isFullTime: fullTime.indexOf('非') > -1 ? false : true,
    }
    if (educationItem && educationItem.id) {
      info.id = educationItem.id
    }
    console.log('infoinfoinfo: ', info)
    HTAPI.CandidateEditEduExp({ info }).then(response => {
    	ActionToast.show('保存成功')
        if (educationItemCallback) {
          educationItemCallback()
        }
        setTimeout(() => {
          navigation.goBack()
        }, 1000)
    })
  }

  removeEduExperience() {
    const { navigation, route: { params: { educationItem, educationItemCallback } } } = this.props
    if (!educationItem || !educationItem.id) {
      Toast.show('配置错误,请重试或联系客服')
      return
    }
    HTAPI.CandidateRemoveEduExp({ id: educationItem.id }).then(response => {
    	ActionToast.show('删除成功')
        if (educationItemCallback) {
          educationItemCallback()
        }
        setTimeout(() => {
          navigation.goBack()
        }, 1000)
    })
  }

  renderProject() {
    const { name } = this.state
    return (
      <View style={styles.cell}>
        <Text style={styles.cellTitle}>学校</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.cellInput}
          placeholder="请填写"
          placeholderTextColor="#AAAAAA"
          value={name}
          onChangeText={(value) => {
            this.setState({ name: value })
          }}
        />
      </View>
    )
  }

  renderProfessional() {
    const { professional } = this.state
    return (
      <View style={styles.cell}>
        <Text style={styles.cellTitle}>专业</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.cellInput}
          placeholder="请填写"
          placeholderTextColor="#AAAAAA"
          value={professional}
          onChangeText={(value) => {
            this.setState({ professional: value })
          }}
        />
      </View>
    )
  }

  renderDurationTime() {
    const { beginTime, endTime } = this.state
    return (
      <View style={styles.cell}>
        <Text style={styles.cellTitle}>时间段</Text>
        <View style={styles.durationView}>
          <NextPressable
            style={{ flex: 1, }}
            onPress={() => {
              this.setState({ beginTimeVisible: true })
            }}
          >
            <Text style={[styles.beginTime, beginTime.length !== 0 && { color: '#333333' }]}>
              {beginTime && format(new Date(beginTime), 'yyyy') || '入校时间'}
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
              {endTime && format(new Date(endTime), 'yyyy') || '毕业时间'}
            </Text>
          </NextPressable>
        </View>
      </View>
    )
  }

  renderEducation() {
    const { education, fullTime } = this.state
    return (
      <View style={styles.cell}>
        <Text style={styles.cellTitle}>学历</Text>
        <View style={styles.durationView}>
          <NextPressable
            style={{ flex: 1, }}
            onPress={() => {
              this.setState({ educationVisible: true })
            }}
          >
            <Text style={[styles.beginTime, education.length !== 0 && { color: '#333333' }]}>
              {(education && fullTime)
                ? `${selectEducation(education)}·${fullTime}`
                : '请选择'
              }
            </Text>
          </NextPressable>
        </View>
      </View>
    )
  }

  renderSchoolExperience() {
    const { schoolExperience } = this.state
    return (
      <View style={styles.contentCell}>
        <Text style={styles.cellTitle}>在校经历</Text>
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
            value={schoolExperience}
            maxLength={500}
            onChangeText={(value) => {
              this.setState({ schoolExperience: value })
            }}
          />
          <Text style={styles.contentAmount}>
            {`${schoolExperience.length}/500`}
          </Text>
        </View>
      </View>
    )
  }

  renderFooterBtn() {
    const { name, professional, beginTime, endTime, schoolExperience, education, fullTime } = this.state
    const { navigation, route: { params: { educationItem, educationItemCallback } } } = this.props
    const disableSave = name && professional && beginTime && endTime && schoolExperience && education && fullTime
    return (
      <View style={styles.footerView}>
        {educationItem && (
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
          containerStyle={[styles.confirmBtn, !educationItem && { marginLeft: 0 }]}
          linearStyle={[styles.linearStyle, !educationItem && { width: SystemHelper.width - 42, marginLeft: 0 }]}
          text="完成"
          onPress={() => {
            this.saveEduExperience()
          }}
        />
      </View>
    )
  }

  render() {
    const { beginTimeVisible, endTimeVisible, beginTime, endTime, educationVisible, educationLevel, fullTime,
      educationAllDay, education,
      deleteVisible, giveUpSaveVisible
    } = this.state
    const { navigation, route: { params: { educationItem, educationItemCallback } } } = this.props
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
          {this.renderProject()}
          {this.renderEducation()}
          {this.renderProfessional()}
          {this.renderDurationTime()}
          {this.renderSchoolExperience()}
        </ScrollView>
        {educationItem && this.renderFooterBtn()}
        <DatePickerModal
          visible={beginTimeVisible}
          currentDate={format(beginTime.length > 0 ? new Date(beginTime) : new Date(), 'yyyy-MM-dd')}
          leftPress={() => {
            this.setState({ beginTimeVisible: false })
          }}
          rightPress={(newDate) => {
            this.setState({
              beginTime: newDate.getFullYear() + '',
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
              endTime: newDate.getFullYear() + '',
              endTimeVisible: false
            })
          }}
        />
        <JobStatusModal
          title="学历"
          visible={educationVisible}
          statusArray={educationLevel}
          timeArray={educationAllDay}
          currentStatus={education}
          currentTime={fullTime}
          leftPress={() => {
            this.setState({ educationVisible: false })
          }}
          rightPress={(selectedEducation, selectFullTime) => {
          	console.log(selectedEducation, selectFullTime)
            this.setState({
              education: selectedEducation,
              fullTime: selectFullTime,
              educationVisible: false,
            })
          }}
        />
        <AlertContentModal
          visible={deleteVisible || giveUpSaveVisible}
          title="友情提示"
          detail={deleteVisible ? '确定删除这条项目经历吗？' : '内容尚未保存，确定放弃？'}
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
                  // 缺少删除接口
                  this.removeEduExperience()
                })
              } else {
                // 退出操作
                this.setState({ giveUpSaveVisible: false }, () => {
                  navigation.pop()
                })
              }
            },
          }}
        />
      </View>
    )
  }
}