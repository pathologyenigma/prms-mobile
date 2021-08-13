import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/JobExpectDetail.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import * as actions from '../../../action/loginAction'
import { IStoreState } from '../../../reducer'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import RootLoading from '../../../utils/rootLoading'
import AlertContentModal from '../../components/AlertContentModal'
import WhiteContentModal from '../../components/WhiteContentModal'
import GradientButton from '../../components/GradientButton'
import SystemHelper from '../../../utils/system'
import NavBar, { EButtonType } from '../../components/NavBar'
import { greenColor } from '../../../utils/constant'

type IProps = GenProps<'JobExpectDetail'> & {
  email: string,
  password: string,
  number: string,
}

interface IState {
  email: string
  phone: string
  password: string
  verifyCode: string
  countTime: number
  selectJobIndustry: []
  selectJobType: string
  selectJobNatureVisible: boolean
  selectJobNature: string
}

class JobExpectDetail extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      selectJobIndustry: [],
      selectJobType: '',
      selectJobNatureVisible: false,
      selectJobNature: '',
    }
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
        title="求职意向"
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
        right={{
          type: EButtonType.TEXT,
          value: '保存',
          style: styles.saveBtn,
          act: () => {
            RootLoading.info('保存成功')
          }
        }}
      />
    )
  }

  renderQiWangGangWei() {
    const { selectJobType } = this.state
    return (
      <View style={styles.cellView}>
        <NextTouchableOpacity
          style={styles.cellTextView}
          onPress={() => {
            const { navigation } = this.props
            navigation.push('JobSelectZhiwei', {
              selectJobTypeCallback: (e: any) => {
                this.setState({ selectJobType: e.title })
              }
            })
          }}
        >
          <Text style={styles.cellText}>
            求职期望
          </Text>
          <Image
            style={styles.nextImage}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </NextTouchableOpacity>
        <Text style={styles.cellViewDetail}>{selectJobType || ' 如: 销售经理'}</Text>
      </View>
    )
  }

  renderQiWangHangYe() {
    const { selectJobIndustry = [] } = this.state
    let selectJobIndustryText = ''
    selectJobIndustry.forEach((e: any, index: number) => {
      if (index === 0) {
        selectJobIndustryText = `${e.title}`
      } else {
        selectJobIndustryText = `${selectJobIndustryText}、${e.title}`
      }
    })
    return (
      <View style={styles.cellView}>
        <NextTouchableOpacity
          style={styles.cellTextView}
          onPress={() => {
            const { navigation } = this.props
            navigation.push('JobSelectIndustry', {
              selectJobIndustryCallback: (e: any) => {
                console.log('eeeee: ', e)
                this.setState({ selectJobIndustry: e })
              }
            })
          }}
        >
          <Text style={styles.cellText}>
            期望行业
          </Text>
          <Image
            style={styles.nextImage}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </NextTouchableOpacity>
        <Text style={styles.cellViewDetail}>{selectJobIndustryText || '如: 互联网'}</Text>
      </View>
    )
  }

  renderQiWangCity() {
    return (
      <View style={styles.cellView}>
        <NextTouchableOpacity
          style={styles.cellTextView}
          onPress={() => {
            const { navigation } = this.props
            navigation.push('JobSelectCity', {
              selectJobCityCallback: (e: any) => {
                console.log('eeeee: ', e)
                RootLoading.info(e.title || e)
              }
            })
          }}
        >
          <Text style={styles.cellText}>
            期望城市
          </Text>
          <Image
            style={styles.nextImage}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </NextTouchableOpacity>
        <Text style={styles.cellViewDetail}>如: 北京</Text>
      </View>
    )
  }

  renderQiWangSalary() {
    return (
      <View style={styles.cellView}>
        <NextTouchableOpacity
          style={styles.cellTextView}
          onPress={() => {

          }}
        >
          <Text style={styles.cellText}>
            期望薪资
          </Text>
          <Image
            style={styles.nextImage}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </NextTouchableOpacity>
        <Text style={styles.cellViewDetail}>如:  15K-20K</Text>
      </View>
    )
  }

  renderGongZuoXingZhi() {
    const { selectJobNature } = this.state
    return (
      <View style={styles.cellView}>
        <NextTouchableOpacity
          style={styles.cellTextView}
          onPress={() => {
            this.setState({ selectJobNatureVisible: true })
          }}
        >
          <Text style={styles.cellText}>
            工作性质
          </Text>
          <Image
            style={styles.nextImage}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </NextTouchableOpacity>
        <Text style={styles.cellViewDetail}>{selectJobNature || '全职、兼职、实习'}</Text>
      </View>
    )
  }

  renderJobNatureContent() {
    const { selectJobNature } = this.state
    return (
      <View style={styles.modalContentView}>
        <Text style={styles.jobNatureTitle}>工作性质</Text>
        <NextTouchableOpacity
          style={styles.rightBtn}
          disabled={!selectJobNature}
          onPress={() => {
            this.setState({ selectJobNatureVisible: false })
          }}
        >
          <Text style={[styles.rightText, !selectJobNature && { color: '#666' }]}>
            确定
          </Text>
        </NextTouchableOpacity>
        <View style={styles.jobNatureView}>
          <NextTouchableOpacity
            style={[styles.jobNatureBtn,
            selectJobNature === '全职' && { backgroundColor: '#E2FFF0', }
            ]}
            onPress={() => {
              this.setState({ selectJobNature: '全职' })
            }}
          >
            <Text style={[styles.jobNatureText,
            selectJobNature === '全职' && { color: greenColor, fontWeight: 'bold' }]}>
              全职
            </Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={[styles.jobNatureBtn,
            selectJobNature === '兼职' && { backgroundColor: '#E2FFF0', }
            ]}
            onPress={() => {
              this.setState({ selectJobNature: '兼职' })
            }}
          >
            <Text style={[styles.jobNatureText,
            selectJobNature === '兼职' && { color: greenColor, fontWeight: 'bold' }]}>
              兼职
            </Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={[styles.jobNatureBtn,
            selectJobNature === '实习' && { backgroundColor: '#E2FFF0', }
            ]}
            onPress={() => {
              this.setState({ selectJobNature: '实习' })
            }}
          >
            <Text style={[styles.jobNatureText,
            selectJobNature === '实习' && { color: greenColor, fontWeight: 'bold' }]}>
              实习
            </Text>
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const { selectJobNatureVisible } = this.state
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={styles.scrollview}
        >
          {this.renderQiWangGangWei()}
          {this.renderQiWangHangYe()}
          {this.renderQiWangCity()}
          {this.renderQiWangSalary()}
          {this.renderGongZuoXingZhi()}
        </ScrollView>
        <WhiteContentModal
          visible={selectJobNatureVisible}
          showCloseBtn={false}
          modalStyle={{ justifyContent: 'flex-end' }}
          contextStyle={styles.contextStyle}
        >
          {this.renderJobNatureContent()}
        </WhiteContentModal>
      </View>
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    email: state.loginInfo.email,
    phone: state.loginInfo.phone,
    password: state.loginInfo.password,
    verifyCode: state.loginInfo.verifyCode,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators({
    reset_reducer: actions.reset_reducer,
    update_kv: actions.update_kv,
    loginMobile: actions.loginMobile,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(JobExpectDetail)