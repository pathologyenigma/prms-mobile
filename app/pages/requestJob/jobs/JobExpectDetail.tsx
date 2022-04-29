import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/JobExpectDetail.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import AlertContentModal from '../../components/AlertContentModal'
import WhiteContentModal from '../../components/WhiteContentModal'
import GradientButton from '../../components/GradientButton'
import SystemHelper from '../../../utils/system'
import NavBar, { EButtonType } from '../../components/NavBar'
import { greenColor } from '../../../utils/constant'
import { reformComFinancing, reformCompanySize, reformEducation, reformSalary, reformFullTime } from '~/utils/utils'
import { stringForFullTime } from '~/recruitment/utils/JobHelper.ts'
import Picker from '~/recruitment/components/Picker/index.tsx'

type IProps = GenProps<'JobExpectDetail'>

interface IState {
  selectJobNatureVisible: boolean
  selectJobSalaryVisible: boolean
}

class JobExpectDetail extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    let item = this?.props?.route?.params?.item
    this.state = {
      ...item,
      selectJobSalaryVisible: false,
      selectJobNatureVisible: false
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
          	this._saveJobExpectation()
            // Toast.show('保存成功')
          }
        }}
      />
    )
  }

  _saveJobExpectation = () => {
  	HTAPI.CandidateEditJobExpectations({
  		info: {
  			id: this.state.id,
  			job_category: this.state.job_category,
  			industry_involved: this.state.industry_involved,
  			aimed_city: this.state.aimed_city,
  			full_time_job: this.state.full_time_job,
  			min_salary_expectation: parseInt(this.state.min_salary_expectation),
  			max_salary_expectation: parseInt(this.state.max_salary_expectation)
  		}
  	}).then(response => {
  		Toast.show('保存成功')
  		this.props.navigation.goBack()
  	})
  }

  renderQiWangGangWei() {
    const { job_category } = this.state
    return (
      <View style={styles.cellView}>
        <NextTouchableOpacity
          style={styles.cellTextView}
          onPress={() => {
            const { navigation } = this.props
            navigation.push('JobSelectZhiwei', {
              selectJobTypeCallback: (e: any) => {
                this.setState({ job_category: e })
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
        <Text style={styles.cellViewDetail}>{job_category ? job_category[job_category.length - 1] : ' 如: 销售经理'}</Text>
      </View>
    )
  }

  renderQiWangHangYe() {
    const { industry_involved = [] } = this.state
    let selectJobIndustryText = industry_involved.join('、')
    return (
      <View style={styles.cellView}>
        <NextTouchableOpacity
          style={styles.cellTextView}
          onPress={() => {
            const { navigation } = this.props
            navigation.push('JobSelectIndustry', {
              selectJobIndustryCallback: (e: any) => {
                console.log('eeeee: ', e)
                this.setState({ industry_involved: e.map(item => item.join('|')) })
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
    const { aimed_city } = this.state
    return (
      <View style={styles.cellView}>
        <NextTouchableOpacity
          style={styles.cellTextView}
          onPress={() => {
            const { navigation } = this.props
            navigation.push('JobSelectCity', {
              mode: 1,
              selectJobCityCallback: (e: any) => {
                console.log('eeeee: ', e)
                this.setState({ aimed_city: e[2].name })
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
        <Text style={styles.cellViewDetail}>{aimed_city || '如: 北京'}</Text>
      </View>
    )
  }

  renderQiWangSalary() {
    const { navigation } = this.props
    const { min_salary_expectation, max_salary_expectation } = this.state
    return (
      <View style={styles.cellView}>
        <NextTouchableOpacity
          style={styles.cellTextView}
          onPress={() => {
          	this.setState({ selectJobSalaryVisible: true })

            // navigation.push('JobSelectSalary', {
            //   selectJobSalaryCallback: (e: any) => {
            //     console.log('JobSelectSalary: ', e)
            //     this.setState({ selectJobSalary: e.label })
            //   }
            // })
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
        <Text style={styles.cellViewDetail}>{min_salary_expectation && max_salary_expectation ? `${reformSalary(parseInt(min_salary_expectation))}-${reformSalary(parseInt(max_salary_expectation))}` : '如:  15K-20K'}</Text>
      </View>
    )
  }

  renderGongZuoXingZhi() {
    const { full_time_job } = this.state
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
        <Text style={styles.cellViewDetail}>{full_time_job ? stringForFullTime(full_time_job) : '全职、兼职、实习'}</Text>
      </View>
    )
  }

  _renderJobSalaryContent() {
  	let salaryList = new Array(100000 / 1000).fill(0).map((_, index) => `${(index + 1) * 1000}`)
  	let minSalaryList = salaryList.filter(item => parseInt(item) <= parseInt(this.state.max_salary_expectation))
  	let maxSalaryList = salaryList.filter(item => parseInt(item) >= parseInt(this.state.min_salary_expectation))
  	return (
      <View style={styles.modalContentView}>
      	<NextTouchableOpacity
          style={styles.leftBtn}
          onPress={() => {
            this.setState({ selectJobSalaryVisible: false })
          }}
        >
          <Text style={[styles.rightText]}>
            取消
          </Text>
        </NextTouchableOpacity>
        <Text style={styles.jobNatureTitle}>期望薪资</Text>
        <NextTouchableOpacity
          style={styles.rightBtn}
          onPress={() => {
            this.setState({ selectJobSalaryVisible: false })
          }}
        >
          <Text style={[styles.rightText]}>
            确定
          </Text>
        </NextTouchableOpacity>
        <View style={styles.jobSalaryView}>
          <Picker
              roundRectType="left"
              style={[
                styles.picker,
                { marginRight: Platform.OS === 'ios' ? -9 : 0 },
              ]}
              itemStyle={styles.pickerItem}
              values={minSalaryList}
              selectedValue={this.state.min_salary_expectation}
              onValueChange={(_, index) =>
                this.setState({ min_salary_expectation: minSalaryList[index] })
              }
            />
            <Picker
              roundRectType="none"
              style={[
                styles.picker,
                { marginHorizontal: 0, borderRadius: 0, padding: 0 },
              ]}
              itemStyle={styles.pickerItem}
              values={maxSalaryList}
              selectedValue={this.state.max_salary_expectation}
              onValueChange={(_, index) =>
                this.setState({ max_salary_expectation: maxSalaryList[index] })
              }
            />
        </View>
      </View>
    )
  }

  renderJobNatureContent() {
    const { full_time_job } = this.state
    let itemList = [{ value: 'Full' }, { value: 'Part' }, { value: 'InternShip' }]
    itemList.map(item => item.title = stringForFullTime(item.value))
    return (
      <View style={styles.modalContentView}>
        <Text style={styles.jobNatureTitle}>工作性质</Text>
        <NextTouchableOpacity
          style={styles.rightBtn}
          disabled={!full_time_job}
          onPress={() => {
            this.setState({ selectJobNatureVisible: false })
          }}
        >
          <Text style={[styles.rightText, !full_time_job && { color: '#666' }]}>
            确定
          </Text>
        </NextTouchableOpacity>
        <View style={styles.jobNatureView}>
          {
          	itemList.map(item => {
          		let selected = item.value == full_time_job
          		return (
          			<NextTouchableOpacity
			            style={[styles.jobNatureBtn,
			            selected && { backgroundColor: '#E2FFF0', }
			            ]}
			            onPress={() => {
			              this.setState({ full_time_job: item.value })
			            }}
			          >
			            <Text style={[styles.jobNatureText,
			            selected && { color: greenColor, fontWeight: 'bold' }]}>
			              { item.title }
			            </Text>
			          </NextTouchableOpacity>
          		)
          	})
          }
        </View>
      </View>
    )
  }

  render() {
    const { selectJobNatureVisible, selectJobSalaryVisible } = this.state
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
          visible={selectJobSalaryVisible}
          showCloseBtn={false}
          modalStyle={{ justifyContent: 'flex-end' }}
          contextStyle={styles.contextStyle}
        >
          {this._renderJobSalaryContent()}
        </WhiteContentModal>
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

export default JobExpectDetail