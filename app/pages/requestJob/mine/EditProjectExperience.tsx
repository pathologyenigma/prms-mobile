import React, { Component } from 'react'
import { Text, View, BackHandler, ScrollView, StatusBar } from 'react-native'
import styles from './styles/EditProjectExperience.style'
import { GenProps } from '../../../utils/StackProps'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextPressable from '../../components/NextPressable'
import { TextInput } from 'react-native-gesture-handler'
import JobStatusModal from '../jobs/JobStatusModal'
import GradientButton from '../../components/GradientButton'
import AlertContentModal from '../../components/AlertContentModal'
import SystemHelper from '../../../utils/system'
import DatePickerModal from '../../components/DatePickerModal'
import { format, parse } from 'date-fns'

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
  deleteVisible: boolean,
  giveUpSaveVisible: boolean,
  changeContent: boolean
}

export default class EditProjectExperience extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { route: { params: { projectItem } } } = props
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    this.state = {
      project: (projectItem && projectItem.project_name) || '',
      role: (projectItem && projectItem.role) || '',
      beginTime: (projectItem && projectItem.start_at) || '',
      endTime: (projectItem && projectItem.end_at) || '',
      content: (projectItem && projectItem.project_description) || '',
      performance: (projectItem && projectItem.project_performance) || '',
      selectImage: [],
      beginTimeVisible: false,
      endTimeVisible: false,
      deleteVisible: false,
      giveUpSaveVisible: false,
      changeContent: false,
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  onBackAndroid = () => {
    // ???????????????????????????????????????
    const { changeContent } = this.state
    const { navigation } = this.props
    if (changeContent) {
      this.setState({ giveUpSaveVisible: true })
    } else {
      navigation.pop()
    }
    return true
  }

  renderNavBar() {
    const { project, role, beginTime, endTime, content, changeContent } = this.state
    const { navigation, route: { params: { projectItem } } } = this.props
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
            if (changeContent) {
              this.setState({ giveUpSaveVisible: true })
            } else {
              navigation.pop()
            }
          },
        }}
        title={projectItem ? '??????????????????' : '??????????????????'}
        right={{
          type: EButtonType.TEXT,
          style: styles.saveBtn,
          value: projectItem ? '' : '??????',
          disable: !disableSave,
          act: () => {
            this.saveProjectExperience()
          },
        }}
      />
    )
  }

  saveProjectExperience() {
    const { project, role, beginTime, endTime, content, performance } = this.state
    const { navigation, route: { params: { projectItem, projectItemCallback } } } = this.props
    if (new Date(endTime).getTime() < new Date(beginTime).getTime()) {
      Toast.show('????????????????????????????????????')
      return
    }
    Hud.show()
    const info: any = {
      projectName: project,
      role,
      startAt: new Date(beginTime),
      endAt: new Date(endTime),
      description: content,
      performance,
    }
    if (projectItem && projectItem.id) {
      info.id = projectItem.id
    }
    console.log('infoinfoinfo: ', info)
    HTAPI.CandidateEditProExp({ info }).then(response => {
    	ActionToast.show('????????????')
        if (projectItemCallback) {
          projectItemCallback()
        }
        setTimeout(() => {
          navigation.goBack()
        }, 1000)
    })
  }

  removeProjectExp() {
    const { navigation, route: { params: { projectItem, projectItemCallback } } } = this.props
    if (!projectItem || !projectItem.id) {
      Toast.show('????????????,????????????????????????')
      return
    }

    Hud.show()
    HTAPI.CandidateRemoveProExp({ id: projectItem.id }).then(response => {
    	ActionToast.show('????????????')
        if (projectItemCallback) {
          projectItemCallback()
        }
        setTimeout(() => {
          navigation.goBack()
        }, 1000)
    })
  }

  renderProject() {
    const { project } = this.state
    return (
      <View style={styles.cell}>
        <Text style={styles.cellTitle}>????????????</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.cellInput}
          placeholder="?????????"
          placeholderTextColor="#AAAAAA"
          value={project}
          onChangeText={(value) => {
            this.setState({
              project: value,
              changeContent: true,
            })
          }}
        />
      </View>
    )
  }

  renderRole() {
    const { role } = this.state
    return (
      <View style={styles.cell}>
        <Text style={styles.cellTitle}>????????????</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.cellInput}
          placeholder="?????????"
          placeholderTextColor="#AAAAAA"
          value={role}
          onChangeText={(value) => {
            this.setState({ role: value, changeContent: true })
          }}
        />
      </View>
    )
  }

  renderDurationTime() {
    const { beginTime, endTime } = this.state
    const { route: { params: { projectItem } } } = this.props
    return (
      <View style={styles.cell}>
        <Text style={styles.cellTitle}>????????????</Text>
        <View style={styles.durationView}>
          <NextPressable
            style={{ flex: 1, }}
            onPress={() => {
              this.setState({ beginTimeVisible: true, changeContent: true })
            }}
          >
            <Text style={[styles.beginTime, beginTime.length !== 0 && { color: '#333333' }]}>
              {beginTime ? `${new Date(beginTime).getFullYear()}-${new Date(beginTime).getMonth() + 1}` : '????????????'}
            </Text>
          </NextPressable>
          <Text style={styles.timeTips}>???</Text>
          <NextPressable
            style={{ flex: 1, }}
            onPress={() => {
              this.setState({ endTimeVisible: true, changeContent: true })
            }}
          >
            <Text style={[styles.beginTime, { textAlign: 'right' }, endTime.length !== 0 && { color: '#333333' }]}>
              {endTime ? `${new Date(endTime).getFullYear()}-${new Date(endTime).getMonth() + 1}` : '????????????'}
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
        <Text style={styles.cellTitle}>????????????</Text>
        <View style={styles.inputView}>
          <TextInput
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            multiline={true}
            style={styles.contentInput}
            placeholder="?????????"
            placeholderTextColor="#AAAAAA"
            value={content}
            maxLength={500}
            onChangeText={(value) => {
              this.setState({ content: value, changeContent: true })
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
        <Text style={styles.cellTitle}>????????????</Text>
        <View style={styles.inputView}>
          <TextInput
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            multiline={true}
            style={styles.contentInput}
            placeholder="??????"
            placeholderTextColor="#AAAAAA"
            value={performance}
            maxLength={500}
            onChangeText={(value) => {
              this.setState({ performance: value, changeContent: true })
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
    const { project, role, endTime, content, beginTime } = this.state
    const { route: { params: { projectItem } } } = this.props
    const disableSave = project && role && endTime && content && beginTime
    return (
      <View style={styles.footerView}>
        {projectItem && (
          <NextPressable
            style={styles.resetBtn}
            onPress={() => {
              this.setState({ deleteVisible: true })
            }}
          >
            <Text style={styles.resetText}>??????</Text>
          </NextPressable>
        )}
        <GradientButton
          disabled={!disableSave}
          containerStyle={[styles.confirmBtn, !projectItem && { marginLeft: 0 }]}
          linearStyle={[styles.linearStyle, !projectItem && { width: SystemHelper.width - 42, marginLeft: 0 }]}
          text="??????"
          onPress={() => {
            this.saveProjectExperience()
          }}
        />
      </View>
    )
  }

  render() {
    const { beginTimeVisible, endTimeVisible, beginTime, endTime, deleteVisible, giveUpSaveVisible,
    } = this.state
    const { navigation, route: { params: { projectItem } } } = this.props
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
          title="????????????"
          detail={deleteVisible ? '????????????????????????????????????' : '????????????????????????????????????'}
          bottomStyle={{ marginTop: 37 }}
          leftBtn={{
            title: '??????',
            act: () => this.setState({
              deleteVisible: false,
              giveUpSaveVisible: false
            }),
          }}
          rightBtn={{
            title: deleteVisible ? '??????' : '??????',
            act: () => {
              if (deleteVisible) {
                // ????????????
                this.setState({ deleteVisible: false }, () => {
                  // ??????????????????
                  this.removeProjectExp()
                })
              } else {
                // ????????????
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