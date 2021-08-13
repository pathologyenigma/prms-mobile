import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/JobSelectCity.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import RootLoading from '../../../utils/rootLoading'
import NavBar, { EButtonType } from '../../components/NavBar'
import { greenColor } from '../../../utils/constant'

import { site_address } from '../../../utils/address'
import GradientButton from '../../components/GradientButton'
import SystemHelper from '../../../utils/system'

type IProps = GenProps<'JobSelectCity'> & {

}

interface IState {
  dataSource: [],
  selectItem: any
  selectItemSecond: any
  selectedCity: any           // 选定的省份
  isSelectDetailArea: boolean // 选定的城市
  selectArea: any             // 选定的区域 (区域、地铁、附近、家附近)
  selectQu: any               // 选定的区
  selectZhen: any             // 选定的乡镇
  selectedZhen: any           // 确定的乡镇
}

export default class JobSelectCity extends Component<IProps, IState> {
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
      selectedZhen: undefined
    }
  }

  componentDidMount() {
    this.loadData()
    console.log('cityList: ', site_address)
  }

  loadData() {
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
    const { navigation, route: { params: { selectJobCityCallback } } } = this.props
    const { selectedCity, isSelectDetailArea } = this.state
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
        }}
        title={isSelectDetailArea ? (selectedCity && selectedCity.title) || '请先选择城市' : '切换城市'}
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/job-select-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
        right={{
          type: EButtonType.TEXT,
          value: isSelectDetailArea ? '切换城市' : '',
          style: styles.saveBtn,
          act: () => {
            if (isSelectDetailArea) {
              this.setState({ isSelectDetailArea: false })
            }
            // if (!selectedCity || selectedCity.length === 0) {
            //   RootLoading.info('请选择城市')
            // } else if (selectJobCityCallback) {
            //   selectJobCityCallback(selectedCity)
            //   navigation.goBack()
            // }
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
                selectItem.id === e.id && {
                  borderLeftColor: greenColor,
                }
                ]}
                key={index.toString()}
                onPress={() => {
                  this.setState({
                    selectItem: e,
                    selectItemSecond: e.sublist,
                  })
                }}
              >
                <Text style={[styles.detailSecondText, selectItem.id === e.id && { color: greenColor, fontWeight: 'bold' }]}>{e.title}</Text>
              </NextTouchableOpacity>
            )
          })}
        </ScrollView>
        <ScrollView style={styles.detailThirdView}>
          {selectItemSecond.map((e: any, index: number) => {
            const isSelected = selectedCity && (selectedCity.id === e.id)
            return (
              <NextTouchableOpacity
                style={styles.detailThirdBtn}
                key={index.toString()}
                onPress={() => {
                  this.setState({
                    selectedCity: e,
                    selectZhen: e.sublist[0]
                  })
                }}
              >
                <Text style={
                  [styles.detailSecondText, isSelected && { color: greenColor, fontWeight: 'bold', flex: 1 }]
                }>{e.title}</Text>
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
    const { selectItem, selectedZhen, selectArea, selectedCity, selectZhen } = this.state
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
          {selectedCity.sublist.map((e: any, index: number) => {
            return (
              <NextTouchableOpacity
                style={[styles.detailSecondBtn,
                { borderLeftColor: '#F8F8F8', }
                ]}
                key={index.toString()}
                onPress={() => {
                  this.setState({
                    selectZhen: e,
                  })
                }}
              >
                <Text
                  style={[
                    styles.detailSecondText,
                    selectedCity.id === e.id && { color: greenColor }]}>
                  {e.title}
                </Text>
              </NextTouchableOpacity>
            )
          })}
        </ScrollView>
        <ScrollView style={styles.detailZhenView}>
          {selectZhen.sublist.map((e: any, index: number) => {
            const isSelected = selectedZhen && selectedZhen.id === e.id
            return (
              <NextTouchableOpacity
                style={[styles.detailThirdBtn, { borderLeftColor: '#F0F0F0', }]}
                key={index.toString()}
                onPress={() => {
                  this.setState({ selectedZhen: e })
                }}
              >
                <Text style={
                  [styles.detailSecondText, isSelected && { color: greenColor, fontWeight: 'bold', flex: 1 }]
                }>{e.title}</Text>
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
    const { selectedCity, isSelectDetailArea } = this.state
    return (
      <View style={styles.footerView}>
        <NextTouchableOpacity
          style={styles.resetBtn}
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

            } else {
              this.setState({ isSelectDetailArea: true })
            }
          }}
        />
      </View>
    )
  }

  render() {
    const { isSelectDetailArea } = this.state
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