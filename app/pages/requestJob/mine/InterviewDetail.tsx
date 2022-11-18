import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList, Alert, Linking, ViewPagerAndroidComponent } from 'react-native'
import styles from './styles/InterviewDetail.style'
import { GenProps } from '../../../utils/StackProps'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import GradientButton from '../../components/GradientButton'
import { format } from 'date-fns'
import NextPressable from '../../components/NextPressable'
import { greenColor } from '../../../utils/constant'
import WhiteContentModal from '../../components/WhiteContentModal'

type IProps = GenProps<'InterviewDetail'> & {

}

interface IState {
  dataSource: any,
  jobDescribeScore: number,
  companyStatusScore: number,
  interviewerScore: number,
  interviewerTag: any,
  interviewContent: any,
  editModalVisible: boolean,
  editTag: string
}

const shadowOpt = {
  width: 100,
  height: 100,
  color: "#000",
  border: 2,
  radius: 3,
  opacity: 0.2,
  x: 0,
  y: 3,
  style: { marginVertical: 5 }
}

export default class InterviewDetail extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      dataSource: undefined,
      jobDescribeScore: 0,
      companyStatusScore: 0,
      interviewerScore: 0,
      interviewContent: '',
      editModalVisible: false,
      editTag: '',
      interviewerTag: [{
        title: '面试官很nice',
        select: false
      }, {
        title: '面试效率高',
        select: false
      }, {
        title: '地址好找',
        select: false
      }, {
        title: '地址方便',
        select: false
      }]
    }
  }

  componentDidMount() {
    Hud.show()
    this.loadData()
  }

  loadData() {
    const localDataSource = {
      id: 1,
      time: '2021-09-20T17:30:10.000Z',
      company: '智慧网络有限公司',
      type: '线下面试',
      job: '视觉设计师',
      salary: '10K-15K',
      interviewer: '王先生·HR',
      contactName: '拉面',
      contactPhone: '13800000000',
      status: '已面试',
      location: '深圳市南山区创智云城（建设中）创智云城A2栋8楼',
      remark: '带上简历和手机端作品展示，准备绿码和口罩。',
      progress: [{
        id: 3,
        type: 3,
        time: '2021-09-20T17:30:10.000Z',
        content: '已参加面试',
      }, {
        id: 2,
        type: 2,
        time: '2021-09-19T17:30:10.000Z',
        content: '已被邀约面试',
      }, {
        id: 1,
        type: 1,
        time: '2021-09-18T17:30:10.000Z',
        content: '成功接受您的简历',
      }]
    }
    HTAPI.CommonGetIterviewDetail({
    	interviewId: this.props.navigation.getParam('id')
    }).then(response => {
    	console.log(response, this.props.navigation.getParam('id'))
    })
    setTimeout(() => {
      this.setState({
        dataSource: localDataSource,
      })
      Hud.hidden()
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
        title="面试详情"
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

  renderTitle() {
    const { navigation } = this.props
    const { dataSource } = this.state
    return (
      <View style={styles.titleViewStyle}>
        <View style={styles.interviewInfoView}>
          <CacheImage
            style={styles.companyIcon}
            source={global.AVATAR_IMAGE()}
          />
          <View style={styles.companyInfo}>
            <Text style={styles.cellCompany}>{dataSource.company}</Text>
            <View style={styles.interviewerInfo}>
              <CacheImage
                style={styles.interviewerIcon}
                source={global.AVATAR_IMAGE()}
              />
              <Text style={styles.interviewer}>{dataSource.interviewer}</Text>
              <NextPressable>
                <Image
                  style={styles.messageIcon}
                  source={require('../../../assets/requestJobs/message-blue.png')} />
              </NextPressable>
            </View>
          </View>
        </View>
        <View style={styles.titleCell}>
          <Text style={styles.titleCellText}>时间</Text>
          <Text style={styles.titleCellDetail}>{format(new Date(dataSource.time), 'yyyy-MM-dd HH:mm')}</Text>
        </View>
        <View style={styles.titleCell}>
          <Text style={styles.titleCellText}>职位</Text>
          <Text style={styles.titleCellDetail}>{`${dataSource.job}  |  ${dataSource.salary}`}</Text>
        </View>
        <NextPressable
          style={styles.titleCell}
          onPress={() => {
            const tel = `tel:${dataSource.contactPhone}`
            Alert.alert('温馨提示', '这将调用系统电话进行拨打,是否确认拨打?',
              [{ text: '取消', onPress: () => { console.log('取消') } },
              {
                text: '确定',
                onPress: () => {
                  Linking.canOpenURL(tel).then((supported) => {
                    if (!supported) {
                      console.log('Can not handle tel:' + tel)
                    } else {
                      return Linking.openURL(tel)
                    }
                  }).catch(error => console.log('tel error', error))
                }
              }])
          }}
        >
          <Text style={styles.titleCellText}>联系人</Text>
          <View style={styles.phoneView}>
            <Text style={styles.phoneDetail}>{dataSource.contactName}</Text>
            <Image
              style={styles.phoneIcon}
              source={require('../../../assets/requestJobs/phone-green.png')} />
          </View>
        </NextPressable>
        <View style={styles.titleCell}>
          <Text style={styles.titleCellText}>面试形式</Text>
          <Text style={styles.titleCellDetail}>{dataSource.type}</Text>
        </View>
        <View style={styles.titleCell}>
          <Text style={styles.titleCellText}>地址</Text>
          <Text style={styles.titleCellDetail}>{dataSource.location}</Text>
        </View>
        <NextPressable
          style={styles.locationMap}
        />
        <View style={styles.titleCell}>
          <Text style={styles.titleCellText}>备注信息</Text>
          <Text style={styles.titleCellDetail}>{dataSource.remark}</Text>
        </View>
      </View>
    )
  }

  renderProgress() {
    const { dataSource: { progress } } = this.state
    return (
      <View style={styles.progressView}>
        <Text style={styles.progressTitle}>面试进度</Text>
        {progress.map((item: any, index: number) => {
          return (
            <View
              key={index.toString()}
              style={styles.cellStyle}
            >
              <View style={styles.timeView}>
                <View style={[styles.grayCircle, index === 0 && { backgroundColor: greenColor }]} />
                <View style={styles.grayLine}>
                  {item.id !== progress[progress.length - 1].id && this.renderDashLine()}
                </View>
              </View>
              <View>
                <Text style={[styles.progressStatus, index === 0 && { color: '#333333' }]}>{item.content}</Text>
                <Text style={styles.progressTime}>{format(new Date(item.time), 'yyyy/MM/dd  hh:mm')}</Text>
              </View>
            </View>
          )
        })}
      </View>
    )
  }

  renderEvaluation() {
    const { jobDescribeScore, companyStatusScore, interviewerScore } = this.state
    return (
      <View style={styles.progressView}>
        <Text style={styles.progressTitle}>面试评价</Text>
        <Text style={styles.progressDetail}>请评价一下您的面试情况吧～</Text>
        <Text style={styles.scoreTitle}>综合评分</Text>
        <View style={styles.scoreView}>
          <Text style={styles.scoreCellTitle}>职位描述:</Text>
          {['', '', '', '', ''].map((item, index: number) => {
            if (index < jobDescribeScore) {
              return (
                <NextPressable
                  onPress={() => {
                    this.setState({ jobDescribeScore: index + 1 })
                  }}
                >
                  <Image
                    style={styles.scoreStar}
                    source={require('../../../assets/requestJobs/star.png')}
                  />
                </NextPressable>
              )
            }
            return (
              <NextPressable
                onPress={() => {
                  this.setState({ jobDescribeScore: index + 1 })
                }}
              >
                <Image
                  style={styles.scoreStar}
                  source={require('../../../assets/requestJobs/star-gray.png')}
                />
              </NextPressable>
            )
          })}
        </View>
        <View style={styles.scoreView}>
          <Text style={styles.scoreCellTitle}>公司情况:</Text>
          {['', '', '', '', ''].map((item, index: number) => {
            if (index < companyStatusScore) {
              return (
                <NextPressable
                  onPress={() => {
                    this.setState({ companyStatusScore: index + 1 })
                  }}
                >
                  <Image
                    style={styles.scoreStar}
                    source={require('../../../assets/requestJobs/star.png')}
                  />
                </NextPressable>
              )
            }
            return (
              <NextPressable
                onPress={() => {
                  this.setState({ companyStatusScore: index + 1 })
                }}
              >
                <Image
                  style={styles.scoreStar}
                  source={require('../../../assets/requestJobs/star-gray.png')}
                />
              </NextPressable>
            )
          })}
        </View>
        <View style={styles.scoreView}>
          <Text style={styles.scoreCellTitle}>面试官:</Text>
          {['', '', '', '', ''].map((item, index: number) => {
            if (index < interviewerScore) {
              return (
                <NextPressable
                  onPress={() => {
                    this.setState({ interviewerScore: index + 1 })
                  }}
                >
                  <Image
                    style={styles.scoreStar}
                    source={require('../../../assets/requestJobs/star.png')}
                  />
                </NextPressable>
              )
            }
            return (
              <NextPressable
                onPress={() => {
                  this.setState({ interviewerScore: index + 1 })
                }}
              >
                <Image
                  style={styles.scoreStar}
                  source={require('../../../assets/requestJobs/star-gray.png')}
                />
              </NextPressable>
            )
          })}
        </View>
        {this.renderInterviewTag()}
      </View>
    )
  }

  renderInterviewTag() {
    const { interviewerTag, interviewContent } = this.state
    return (
      <View>
        <Text style={styles.scoreTitle}>面试标签</Text>
        <View style={styles.tagView}>
          {interviewerTag.map((item: any, index: number) => {
            return (
              <NextPressable
                style={[styles.tagBtn, item.select && { borderColor: greenColor }]}
                onPress={() => {
                  const nextInterviewerTag = []
                  for (let i = 0; i < interviewerTag.length; i++) {
                    if (i !== index) {
                      nextInterviewerTag.push(interviewerTag[i])
                    } else {
                      nextInterviewerTag.push({
                        title: interviewerTag[i].title,
                        select: !interviewerTag[i].select
                      })
                    }
                  }
                  this.setState({ interviewerTag: nextInterviewerTag })
                }}
              >
                <Text style={[styles.tagText, item.select && { color: greenColor }]}>{item.title}</Text>
              </NextPressable>
            )
          })}
          <NextPressable
            style={styles.tagBtn}
            onPress={() => {
              this.setState({ editModalVisible: true })
            }}
          >
            <Text style={styles.tagText}>添加标签+</Text>
          </NextPressable>
        </View>
        <View style={styles.inputView}>
          <TextInput
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            multiline={true}
            style={styles.contentInput}
            placeholder="请描述您的整个面试过程。"
            placeholderTextColor="#AAAAAA"
            value={interviewContent}
            maxLength={500}
            onChangeText={(value) => {
              this.setState({ interviewContent: value })
            }}
          />
          <Text style={styles.contentAmount}>
            {`${interviewContent.length}/200`}
          </Text>
        </View>
        <GradientButton
          text="提交评价"
          containerStyle={styles.btnContainer}
        />
      </View>
    )
  }

  renderDashLine() {
    const dashArray = ['', '', '', '', '',]
    return (
      <View style={styles.dashView}>
        {dashArray.map((item, index) => {
          return (
            <View
              key={index.toString()}
              style={styles.dashItem}
            />
          )
        })}
      </View>
    )
  }

  renderModalContent() {
    const { editTag, interviewerTag } = this.state
    return (
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>添加标签</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.modalInput}
          placeholder="自定义标签，最多8个字哦～"
          maxLength={8}
          placeholderTextColor="rgba(32,33,38,0.3)"
          value={editTag}
          onChangeText={(value) => this.setState({ editTag: value })}
        />
        <NextPressable
          disabled={!editTag}
          style={[styles.modalBtn, !editTag && { backgroundColor: '#eee', }]}
          onPress={() => {
            const nextInterviewerTag = interviewerTag
            nextInterviewerTag.push({
              title: editTag,
              select: true
            })
            this.setState({
              editModalVisible: false,
              interviewerTag: nextInterviewerTag,
            }, () => {
              this.setState({
                editTag: '',
              })
            })
          }}
        >
          <Text style={styles.modalBtnText}>确定</Text>
        </NextPressable>
      </View>
    )
  }

  render() {
    const { dataSource, editModalVisible } = this.state
    if (!dataSource) {
      return (
        <View style={styles.container}>
          {this.renderNavBar()}
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView style={styles.container}>
          {this.renderTitle()}
          {this.renderProgress()}
          {this.renderEvaluation()}
        </ScrollView>
        <WhiteContentModal
          visible={editModalVisible}
          closeOnPress={() => this.setState({ editModalVisible: false })}
        >
          {this.renderModalContent()}
        </WhiteContentModal>
      </View>
    )
  }
}