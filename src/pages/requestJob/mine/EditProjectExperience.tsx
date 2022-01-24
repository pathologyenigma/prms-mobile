import React, { Component } from 'react'
import { Text, View, BackHandler, ScrollView, StatusBar } from 'react-native'
import styles from './styles/EditProjectExperience.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { TextInput } from 'react-native-gesture-handler'
import JobStatusModal from '../jobs/JobStatusModal'
import GradientButton from '../../components/GradientButton'
import AlertContentModal from '../../components/AlertContentModal'
import SystemHelper from '../../../utils/system'
import { editProjectExperience } from '../../../action/mineAction'
import RootLoading from '../../../utils/rootLoading'

type IProps = GenProps<'EditProjectExperience'> & {

}

interface IState {
  selectImage: any,
  project: string,
  role: string,
  beginTime: string,
  endTime: string,
  content: string,
  performance: string,
  beginTimeVisible: boolean,
  endTimeVisible: boolean,
  beginTimeArray: any,
  beginDateArray: any,
  deleteVisible: boolean,
  giveUpSaveVisible: boolean
}

export default class EditProjectExperience extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { route: { params: { projectItem } } } = props
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    this.state = {
      project: (projectItem && projectItem.project) || '',
      role: (projectItem && projectItem.role) || '',
      beginTime: (projectItem && projectItem.beginTime) || '',
      endTime: (projectItem && projectItem.endTime) || '',
      content: (projectItem && projectItem.content) || '',
      performance: (projectItem && projectItem.performance) || '',
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

  onBackAndroid = () => {
    // 安卓返回按钮弹出退出确认框
    const { project, role, beginTime, endTime, content } = this.state
    const { navigation } = this.props
    const editInfo = project || role || beginTime || endTime || content
    // const editAllInfo = name && professional && beginTime && endTime && schoolExperience && education && fullTime
    if (editInfo) {
      this.setState({ giveUpSaveVisible: true })
    } else {
      navigation.pop()
    }
    return true
  }

  renderNavBar() {
    const { project, role, beginTime, endTime, content } = this.state
    const { navigation, route: { params: { projectItem, projectItemCallback } } } = this.props
    const disableSave = project && role && beginTime && endTime && content
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
        title={projectItem ? '编辑项目经历' : '添加项目经历'}
        right={{
          type: EButtonType.TEXT,
          style: styles.saveBtn,
          value: projectItem ? '' : '保存',
          disable: !disableSave,
          act: () => {
            this.savePersonalProject()
          },
        }}
      />
    )
  }

  savePersonalProject() {
    // const { project, role, beginTime, endTime, content } = this.state
    // const { navigation, route: { params: { projectItemCallback } } } = this.props
    // RootLoading.loading()
    // const info = {

    // }
    // editProjectExperience(selectedSkills, (error) => {
    //   if (!error) {
    //     RootLoading.success('保存成功')
    //     if (personalSkillsCallback) {
    //       personalSkillsCallback()
    //     }
    //     setTimeout(() => {
    //       navigation.goBack()
    //     }, 1000)
    //   } else {
    //     RootLoading.fail(error.toString())
    //   }
    // })
  }

  renderProject() {
    const { project } = this.state
    return (
      <View style={styles.cell}>
        <Text style={styles.cellTitle}>项目名称</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          style={styles.cellInput}
          placeholder="请填写"
          placeholderTextColor="#AAAAAA"
          value={project}
          onChangeText={(value) => {
            this.setState({ project: value })
          }}
        />
      </View>
    )
  }

  renderRole() {
    const { role } = this.state
    return (
      <View style={styles.cell}>
        <Text style={styles.cellTitle}>担任角色</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          style={styles.cellInput}
          placeholder="请填写"
          placeholderTextColor="#AAAAAA"
          value={role}
          onChangeText={(value) => {
            this.setState({ role: value })
          }}
        />
      </View>
    )
  }

  renderDurationTime() {
    const { beginTime, endTime } = this.state
    return (
      <View style={styles.cell}>
        <Text style={styles.cellTitle}>项目时间</Text>
        <View style={styles.durationView}>
          <NextTouchableOpacity
            style={{ flex: 1, }}
            onPress={() => {
              this.setState({ beginTimeVisible: true })
            }}
          >
            <Text style={[styles.beginTime, beginTime.length !== 0 && { color: '#333333' }]}>
              {beginTime || '入职时间'}
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
              {endTime || '离职时间'}
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
        <Text style={styles.cellTitle}>项目描述</Text>
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

  renderWorkPerformance() {
    const { performance } = this.state
    return (
      <View style={styles.contentCell}>
        <Text style={styles.cellTitle}>项目业绩</Text>
        <View style={styles.inputView}>
          <TextInput
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            multiline={true}
            style={styles.contentInput}
            placeholder="选填"
            placeholderTextColor="#AAAAAA"
            value={performance}
            maxLength={500}
            onChangeText={(value) => {
              this.setState({ performance: value })
            }}
          />
          <Text style={styles.contentAmount}>
            {`${performance.length}/500`}
          </Text>
        </View>
      </View>
    )
  }

  renderFooterBtn() {
    const { project, role, endTime, content, beginTime, performance } = this.state
    const { navigation, route: { params: { projectItem, projectItemCallback } } } = this.props
    const disableSave = project && role && endTime && content && beginTime
    return (
      <View style={styles.footerView}>
        {projectItem && (
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
          containerStyle={[styles.confirmBtn, !projectItem && { marginLeft: 0 }]}
          linearStyle={[styles.linearStyle, !projectItem && { width: SystemHelper.width - 42, marginLeft: 0 }]}
          text="完成"
          onPress={() => {
            if (projectItemCallback) {
              projectItemCallback({ project, role, beginTime, endTime, content, performance, index: projectItem && projectItem.index })
            }
            navigation.pop()
          }}
        />
      </View>
    )
  }

  render() {
    const { beginTimeVisible, endTimeVisible, beginTimeArray, beginDateArray,
      beginTime, deleteVisible, giveUpSaveVisible
    } = this.state
    const { navigation, route: { params: { projectItem, projectItemCallback } } } = this.props
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          animated
          barStyle={'dark-content'}
        />
        {this.renderNavBar()}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {this.renderProject()}
          {this.renderRole()}
          {this.renderDurationTime()}
          {this.renderWorkContent()}
          {this.renderWorkPerformance()}
        </ScrollView>
        {projectItem && this.renderFooterBtn()}
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
                  if (projectItemCallback) {
                    projectItemCallback({ index: projectItem && projectItem.index, deleteItem: true })
                  }
                  navigation.pop()
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