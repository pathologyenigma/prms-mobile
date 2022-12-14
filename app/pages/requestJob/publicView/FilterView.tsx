import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList } from 'react-native'
import styles from './styles/FilterView.style'
import { GenProps } from '../../../utils/StackProps'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextPressable from '../../components/NextPressable'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { greenColor } from '../../../utils/constant'
import GradientButton from '../../components/GradientButton'

type IProps = GenProps<'FilterView'> & {

}

interface IState {
  salaryDataSource: any,          // 期望薪资
  experienceDataSource: any,      // 工作经验
  educationDataSource: any,       // 学历
  companySizeDataSource: any,     // 公司规模
  companyFinancingDataSource: any,// 公司融资
  companyIndustryDataSource: any, // 公司行业
  selectFilter: {},
  dataSource: any
}

export default class FilterView extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      salaryDataSource: [],
      experienceDataSource: [],
      educationDataSource: [],
      companySizeDataSource: [],
      companyFinancingDataSource: [],
      companyIndustryDataSource: [],
      refreshState: RefreshState.HeaderRefreshing,
      selectFilter: {},
      dataSource: []
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    const { route: { params: { filterMode } } } = this.props
    const salaryDataSource = [
      { id: 0, label: '不限', value: null },
      { id: 1, label: '5k以下', value: [0, 5000] },
      { id: 2, label: '5-8k', value: [5000, 8000] },
      { id: 3, label: '8-10k', value: [8000, 10000] },
      { id: 4, label: '10-15k', value: [10000, 15000] },
      { id: 5, label: '15-20k', value: [15000, 20000] },
      { id: 6, label: '20-25k', value: [20000, 25000] },
      { id: 7, label: '25-30k', value: [25000, 30000] },
      { id: 8, label: '30k以上', value: [30000, 0] }
    ]
    const experienceDataSource = [
      { id: 0, label: '在校/应届', value: 0 },
      { id: 1, label: '3年及以下', value: 1 },
      { id: 2, label: '3-5年', value: 3 },
      { id: 3, label: '5-10年', value: 5 },
      { id: 4, label: '10年以上', value: 10 },
      { id: 5, label: '经验不限', value: null },
    ]
    const educationDataSource = [
      { id: 0, label: '大专', value: 'JuniorCollege' },
      { id: 1, label: '本科', value: 'RegularCollege' },
      { id: 2, label: '硕士', value: 'Postgraduate' },
      { id: 3, label: '博士', value: 'Doctor' },
      { id: 4, label: '不要求', value: null },
    ]
    const companySizeDataSource = [
      { id: 0, label: '少于15人', value: 'LessThanFifteen' },
      { id: 1, label: '15-50人', value: 'FifteenToFifty' },
      { id: 2, label: '50-100人', value: 'FiftyToOneHundredFifty' },
      { id: 3, label: '100-500人', value: 'OneHundredFiftyToFiveHundreds' },
      { id: 4, label: '500-2000人', value: 'FiveHundredsToTwoThousands' },
      { id: 5, label: '2000人以上', value: 'MoreThanTwoThousands' },
    ]
    const companyFinancingDataSource = [
      { id: 0, label: '未融资', value: null },
      { id: 1, label: '不需要融资', value: 'NoNeed' },
      { id: 2, label: '天使轮', value: 'AngelFinancing' },
      { id: 3, label: 'A轮', value: 'A' },
      { id: 4, label: 'B轮', value: 'B' },
      { id: 5, label: 'C轮', value: 'C' },
      { id: 6, label: 'D轮以上', value: 'D' },
    ]
    const companyIndustryDataSource = [
      { id: 0, label: '不限' },
      { id: 1, label: '电子商务' },
      { id: 2, label: '区块链' },
      { id: 3, label: '新媒体' },
      { id: 4, label: '数据服务' },
      { id: 5, label: '医疗健康' },
    ]
    const jobFairSizeDataSource = [
      { id: 0, label: '少于15企业' },
      { id: 1, label: '15-50企业' },
      { id: 2, label: '50-150企业' },
      { id: 3, label: '150-500企业' },
    ]
    const jobFairJieduanDataSource = [
      { id: 0, label: '正在热招' },
      { id: 1, label: '即将开始' },
      { id: 2, label: '未开始' },
    ]
    let localDataSource: any = []
    switch (filterMode) {
      case 0:
        localDataSource = [
          { key: 'salaryExpected', title: '期望薪资', data: salaryDataSource },
          { key: 'experience', title: '工作经验', data: experienceDataSource },
          { key: 'education', title: '学历要求', data: educationDataSource },
          { key: 'enterpriseSize', title: '公司规模', data: companySizeDataSource },
          { key: 'enterpriseFinancing', title: '融资阶段', data: companyFinancingDataSource },
        ]
        break;
      case 1:
        localDataSource = [
          { key: 'salaryExpected', title: '期望薪资', data: salaryDataSource },
          { key: 'experience', title: '工作经验', data: experienceDataSource },
          { key: 'education', title: '学历要求', data: educationDataSource },
        ]
        break;
      case 2:
        localDataSource = [
          { key: 'companySize', title: '公司规模', data: companySizeDataSource },
          { key: 'companyFinancing', title: '融资阶段', data: companyFinancingDataSource },
          { key: 'companyIndustry', title: '行业领域', data: companyIndustryDataSource },
        ]
        break;
      case 4:
        // 发现-搜索-招聘会-筛选
        localDataSource = [
          { key: 'jobFairSizeDataSource', title: '招聘会规模', data: jobFairSizeDataSource },
          { key: 'jobFairJieduanDataSource', title: '招聘阶段', data: jobFairJieduanDataSource },
          { key: 'companyIndustry', title: '行业领域', data: companyIndustryDataSource },
        ]
        break;

      default:
        localDataSource = [
          { key: 'salary', title: '期望薪资', data: salaryDataSource },
          { key: 'experience', title: '工作经验', data: experienceDataSource },
          { key: 'education', title: '学历要求', data: educationDataSource },
          { key: 'companySize', title: '公司规模', data: companySizeDataSource },
          { key: 'companyFinancing', title: '融资阶段', data: companyFinancingDataSource },
        ]
        break;
    }
    let selectFilter = {}
    localDataSource.map(section => {
    	selectFilter[section.key] = undefined
    })
    this.setState({
    	dataSource: localDataSource,
    	selectFilter
  	})
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
        title="筛选"
        left={{
          style: { width: 17, height: 17, },
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/close-gray.png'),
          act: () => {
            navigation.pop()
          },
        }}
      />
    )
  }

  renderItem(item: any, section: any) {
    const { selectFilter } = this.state
    const sectionKey = section.key
    const selectItem = selectFilter && selectFilter[sectionKey] == item
    return (
      <NextPressable
        style={[styles.jobSalaryBtn,
        selectItem && { backgroundColor: '#E2FFF0', }
        ]}
        onPress={() => {
          const nextSelectFilter = selectFilter
          nextSelectFilter[sectionKey] = item
          this.setState({ selectFilter: nextSelectFilter })
        }}
      >
        <Text style={[styles.jobSalaryText,
        selectItem && { backgroundColor: '#E2FFF0', } && { color: greenColor, fontWeight: 'bold' }]}>
          {item.label}
        </Text>
      </NextPressable>
    )
  }

  renderSectionHeader(section: any) {
    return (
      <View style={styles.searchHeader}>
        <Text style={styles.searchHeaderTitle}>{section.title}</Text>
      </View>
    )
  }

  renderList() {
    const { dataSource } = this.state
    return (
      <SectionList
        style={styles.listView}
        // 注意:下述样式用于 section 分 3 列展示,可能在后面版本被弃用.若被弃用,考虑每个 section 使用 flatlist 或者 ScrollView 的方案
        // https://github.com/facebook/react-native/issues/13192
        contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}
        sections={dataSource}
        renderSectionHeader={({ section }) => this.renderSectionHeader(section)}
        renderItem={({ item, section }: any) => this.renderItem(item, section)}
        stickySectionHeadersEnabled={false}
        keyExtractor={item => item.id.toString()}
      />
    )
  }

  renderFooterBtn() {
    const { selectFilter } = this.state
    const { navigation, route: { params: { filterResultCallback } } } = this.props
    return (
      <View style={styles.footerView}>
        <NextPressable
          style={styles.resetBtn}
          onPress={() => {
            this.setState({ selectFilter: {} })
          }}
        >
          <Text style={styles.resetText}>重置</Text>
        </NextPressable>
        <GradientButton
          disabled={Object.values(selectFilter).length === 0}
          containerStyle={styles.confirmBtn}
          linearStyle={styles.linearStyle}
          text="确定"
          onPress={() => {
            if (filterResultCallback) {
              let filterConfig = {}
              Object.keys(selectFilter).map(key => {
              	let value = selectFilter[key]?.value
              	filterConfig[key] = value
              })
              filterResultCallback(filterConfig)
              navigation.goBack()
            }
          }}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {this.renderNavBar()}
          {this.renderList()}
        </View>
        {this.renderFooterBtn()}
      </View>
    )
  }
}