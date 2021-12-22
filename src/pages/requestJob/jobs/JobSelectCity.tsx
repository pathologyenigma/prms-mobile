import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/JobSelectCity.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import * as actions from '../../../action/jobsAction'
import { IStoreState } from '../../../reducer'
import { connect } from 'react-redux'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import RootLoading from '../../../utils/rootLoading'
import NavBar, { EButtonType } from '../../components/NavBar'
import { greenColor } from '../../../utils/constant'

// import { site_address } from '../../../utils/address'
import GradientButton from '../../components/GradientButton'
import SystemHelper from '../../../utils/system'

type IProps = GenProps<'JobSelectCity'> & ReturnType<typeof mapDispatchToProps>

interface IState {
  dataSource: [],
  selectItem: any
  selectItemSecond: any
  selectedCity: any           // 选定的省份
  isSelectDetailArea: boolean // 选定的城市
  selectArea: any             // 选定的区域 (区域、地铁、附近、家附近)
  selectQu: any               // 选定的区
  selectZhen: any             // 选定的乡镇
}

class JobSelectCity extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      dataSource: [],
      selectItem: [],
      selectItemSecond: undefined,
      selectedCity: undefined,
      isSelectDetailArea: false,
      selectQu: undefined,
      selectZhen: undefined,
    }
  }

  componentDidMount() {
    this.loadData()
    // console.log('cityList: ', site_address)
  }

  loadData() {
    RootLoading.loading()
    const { getAllRegion, navigation } = this.props
    getAllRegion((error, result) => {
      console.log('getAll:" ', error, result)
      RootLoading.hide()
      // 缺少后面层级,待沟通
      if (!error && result && result.StaticGetAllRegion && result.StaticGetAllRegion.data) {
        this.setState({
          dataSource: result.StaticGetAllRegion.data,
          selectItem: result.StaticGetAllRegion.data[0],
          selectItemSecond: result.StaticGetAllRegion.data[0].Cities,
      // if (!error && result) {
      //   this.setState({
      //     dataSource: result,
      //     selectItem: result[0],
      //     selectItemSecond: result[0].Cities,
        })
        // if (result.StaticGetAllRegion
        //   && result.StaticGetAllRegion.data
        // ) {
        //   if (result.StaticGetAllRegion.data.length === 0) {
        //     RootLoading.info('城市列表为空,请重试或联系客服')
        //     setTimeout(() => {
        //       navigation.goBack()
        //     }, 1000)
        //   } else {
        //     // TODO:此处将数据设置到页面中进行展示
        //   }
        // } else {
        //   RootLoading.fail('城市列表数据异常,请重试或联系客服')
        // }
      } else {
        RootLoading.fail('城市列表加载失败,请重试')
        navigation.goBack()
      }
    })
  }

  loadData1() {
    const dataSource = [
      {
        id: 0,
        title: '热门',
        sublist: [
          {
            id: 0,
            title: '北京',
            sublist: [
              {
                id: 1, title: '福田区',
                sublist: [
                  { id: 0, title: '全部' },
                  { id: 1, title: '西乡' },
                  { id: 2, title: '福永' },
                  { id: 3, title: '沙井' },
                  { id: 4, title: '松岗' },
                  { id: 5, title: '新安' },
                ]
              }
            ]
          },
          {
            id: 1,
            title: '深圳',
            sublist: [
              {
                id: 1, title: '福田区',
                sublist: [
                  { id: 6, title: '全部' },
                  { id: 7, title: '西乡' },
                  { id: 8, title: '福永' },
                  { id: 9, title: '沙井' },
                  { id: 10, title: '松岗' },
                  { id: 11, title: '新安' },
                ]
              }
            ]
          },
          {
            id: 2,
            title: '广东',
            sublist: [
              {
                id: 1, title: '福田区',
                sublist: [
                  { id: 12, title: '全部' },
                  { id: 13, title: '西乡' },
                  { id: 14, title: '福永' },
                  { id: 15, title: '沙井' },
                  { id: 16, title: '松岗' },
                  { id: 17, title: '新安' },
                ]
              }
            ]
          },
        ]
      },
      {
        id: 1,
        title: '安徽',
        sublist: [
          {
            id: 0,
            title: '北京',
            sublist: [
              {
                id: 1, title: '福田区',
                sublist: [
                  { id: 0, title: '全部' },
                  { id: 1, title: '西乡' },
                  { id: 2, title: '福永' },
                  { id: 3, title: '沙井' },
                  { id: 4, title: '松岗' },
                  { id: 5, title: '新安' },
                ]
              }
            ]
          },
          {
            id: 0,
            title: '北京',
            sublist: [
              {
                id: 1, title: '福田区',
                sublist: [
                  { id: 0, title: '全部' },
                  { id: 1, title: '西乡' },
                  { id: 2, title: '福永' },
                  { id: 3, title: '沙井' },
                  { id: 4, title: '松岗' },
                  { id: 5, title: '新安' },
                ]
              }
            ]
          },
          {
            id: 0,
            title: '北京',
            sublist: [
              {
                id: 1, title: '福田区',
                sublist: [
                  { id: 0, title: '全部' },
                  { id: 1, title: '西乡' },
                  { id: 2, title: '福永' },
                  { id: 3, title: '沙井' },
                  { id: 4, title: '松岗' },
                  { id: 5, title: '新安' },
                ]
              }
            ]
          },
        ]
      },
      {
        id: 3,
        title: '福建',
        sublist: [
          {
            id: 0,
            title: '北京',
            sublist: [
              {
                id: 1, title: '福田区',
                sublist: [
                  { id: 0, title: '全部' },
                  { id: 1, title: '西乡' },
                  { id: 2, title: '福永' },
                  { id: 3, title: '沙井' },
                  { id: 4, title: '松岗' },
                  { id: 5, title: '新安' },
                ]
              }
            ]
          },
          {
            id: 0,
            title: '北京',
            sublist: [
              {
                id: 1, title: '福田区',
                sublist: [
                  { id: 0, title: '全部' },
                  { id: 1, title: '西乡' },
                  { id: 2, title: '福永' },
                  { id: 3, title: '沙井' },
                  { id: 4, title: '松岗' },
                  { id: 5, title: '新安' },
                ]
              }
            ]
          },
          {
            id: 0,
            title: '北京',
            sublist: [
              {
                id: 1, title: '福田区',
                sublist: [
                  { id: 0, title: '全部' },
                  { id: 1, title: '西乡' },
                  { id: 2, title: '福永' },
                  { id: 3, title: '沙井' },
                  { id: 4, title: '松岗' },
                  { id: 5, title: '新安' },
                ]
              }
            ]
          },
        ]
      },
    ]
    setTimeout(() => {
      this.setState({
        dataSource,
        selectItem: dataSource[0],
        selectItemSecond: dataSource[0].sublist,
      })
    }, 500);
  }

  renderNavBar() {
    const { selectedCity, isSelectDetailArea } = this.state
    console.log('isSelectDetailArea: ', isSelectDetailArea, selectedCity)
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
        }}
        title={isSelectDetailArea ? ((selectedCity && selectedCity.name)) || '切换城市' : '请先选择城市'}
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/job-select-back.png'),
          act: () => {
            const { navigation } = this.props
            navigation.pop()
          },
        }}
        right={{
          type: EButtonType.TEXT,
          value: isSelectDetailArea ? '切换城市' : '',
          style: styles.saveBtn,
          act: () => {
            this.setState({
              selectedCity: undefined,
              isSelectDetailArea: false,
              selectQu: undefined,
              selectZhen: undefined,
            })
          }
        }}
      />
    )
  }

  renderCityView() {
    const { selectItem, selectItemSecond, dataSource, selectedCity } = this.state
    if (!selectItem || selectItem.length === 0) {
      return null
    }
    return (
      <View style={styles.detailView}>
        <ScrollView style={styles.detailSecondView}>
          {dataSource.map((e: any, index: number) => {
            return (
              <NextTouchableOpacity
                style={[styles.detailSecondBtn,
                selectItem.name === e.name && {
                  borderLeftColor: greenColor,
                }
                ]}
                key={index.toString()}
                onPress={() => {
                  this.setState({
                    selectItem: e,
                    selectItemSecond: e.Cities,
                  })
                }}
              >
                <Text style={[styles.detailSecondText, selectItem.name === e.name && { color: greenColor, fontWeight: 'bold' }]}>{e.name}</Text>
              </NextTouchableOpacity>
            )
          })}
        </ScrollView>
        <ScrollView style={styles.detailThirdView}>
          {selectItemSecond.map((e: any, index: number) => {
            const isSelected = selectedCity && (selectedCity.city_id === e.city_id)
            return (
              <NextTouchableOpacity
                style={styles.detailThirdBtn}
                key={index.toString()}
                onPress={() => {
                  this.setState({
                    selectedCity: e,
                    selectZhen: e.Counties[0]
                  })
                }}
              >
                <Text style={
                  [styles.detailSecondText, isSelected && { color: greenColor, fontWeight: 'bold', flex: 1 }]
                }>{e.name}</Text>
                {isSelected ? (
                  <Image
                    style={styles.selectTag}
                    source={require('../../../assets/requestJobs/green-check.png')}
                  />
                ) : null}
              </NextTouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    )
  }

  renderDetailView() {
    const { selectItem, selectArea, selectedCity, selectQu, selectZhen } = this.state
    if (!selectItem || selectItem.length === 0) {
      return null
    }
    const araeType = [
      {
        id: 0,
        title: '区域',
      },
      {
        id: 1,
        title: '地铁',
      },
      {
        id: 2,
        title: '附近',
      },
      {
        id: 3,
        title: '家附近',
      },
    ]
    const selectedArea = selectArea || araeType[0]
    return (
      <View
        style={styles.detailView}
      >
        <ScrollView style={styles.detailSecondView}>
          {araeType.map((e: any, index: number) => {
            return (
              <NextTouchableOpacity
                style={[styles.detailSecondBtn,
                selectedArea.id === e.id && {
                  borderLeftColor: greenColor,
                }
                ]}
                key={index.toString()}
                onPress={() => {
                  this.setState({
                    selectArea: e
                  })
                }}
              >
                <Text style=
                  {[styles.detailSecondText, selectedArea.id === e.id && { color: greenColor, fontWeight: 'bold' }]}>
                  {e.title}
                </Text>
              </NextTouchableOpacity>
            )
          })}
        </ScrollView>
        <ScrollView style={styles.detailQuyuView}>
          {selectedCity.Counties.map((e: any, index: number) => {
            return (
              <NextTouchableOpacity
                style={[styles.detailSecondBtn,
                { borderLeftColor: '#F8F8F8', }
                ]}
                key={index.toString()}
                onPress={() => {
                  console.log('selectedCity: ', selectedCity)
                  this.setState({
                    selectQu: e,
                  })
                }}
              >
                <Text
                  style={[
                    styles.detailSecondText,
                    selectQu.county_id === e.county_id && { color: greenColor }]}>
                  {e.name}
                </Text>
              </NextTouchableOpacity>
            )
          })}
        </ScrollView>
        <ScrollView style={styles.detailZhenView}>
          {selectQu.Towns.map((e: any, index: number) => {
            const isSelected = selectZhen && selectZhen.town_id === e.town_id
            return (
              <NextTouchableOpacity
                style={[styles.detailThirdBtn, { borderLeftColor: '#F0F0F0', }]}
                key={index.toString()}
                onPress={() => {
                  this.setState({ selectZhen: e })
                }}
              >
                <Text style={
                  [styles.detailSecondText, isSelected && { color: greenColor, fontWeight: 'bold', flex: 1 }]
                }>{e.name}</Text>
                {isSelected ? (
                  <Image
                    style={styles.selectTag}
                    source={require('../../../assets/requestJobs/green-check.png')}
                  />
                ) : null}
              </NextTouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    )
  }

  renderFooterBtn() {
    const {
      selectItem,
      selectedCity,
      selectQu,
      selectZhen,
      isSelectDetailArea,
    } = this.state
    console.log('222222222: ', selectItem,
      selectedCity,
      selectQu,
      selectZhen)
    return (
      <View style={styles.footerView}>
        <NextTouchableOpacity
          style={styles.resetBtn}
          onPress={() => {
            this.setState({
              selectedCity: undefined,
              isSelectDetailArea: false,
              selectQu: undefined,
              selectZhen: undefined,
            })
          }}
        >
          <Text style={styles.resetText}>重置</Text>
        </NextTouchableOpacity>
        <GradientButton
          disabled={!selectedCity}
          containerStyle={styles.confirmBtn}
          linearStyle={styles.linearStyle}
          text="确定"
          onPress={() => {
            if (isSelectDetailArea) {
              const { navigation, route: { params: { selectJobCityCallback } } } = this.props
              // 临时把名称返回,具体的等后述需求
              selectJobCityCallback(`${selectItem.name} ${selectedCity.name} ${selectQu.name} ${selectZhen.name}`)
              navigation.goBack()
            } else {
              this.setState({
                isSelectDetailArea: true,
                selectedCity: selectItem.Cities[0],
                selectQu: selectItem.Cities[0].Counties[0],
                selectZhen: selectItem.Cities[0].Counties[0].Towns[0]
              })
            }
          }}
        />
      </View>
    )
  }

  render() {
    const { isSelectDetailArea, dataSource } = this.state
    if (!dataSource || dataSource.length === 0) {
      return (
        <View style={styles.container}>
          {this.renderNavBar()}
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {isSelectDetailArea ? (
          this.renderDetailView()
        ) : (
          this.renderCityView()
        )}
        {this.renderFooterBtn()}
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators({
    getAllRegion: actions.getAllRegion
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(JobSelectCity)