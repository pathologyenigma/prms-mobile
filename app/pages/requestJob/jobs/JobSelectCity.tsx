import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter } from 'react-native'
import styles from './styles/JobSelectCity.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { connect } from 'react-redux'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import NavBar, { EButtonType } from '../../components/NavBar'
import { greenColor } from '../../../utils/constant'

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
  }

  loadData() {
    HTAPI.request('/preludeDatas/regions_simplified.json').then(response => {
    	this.setState({
          dataSource: response,
          selectItem: response[0],
          selectItemSecond: response[0].Cities,
        })
    })
  }

  loadTown() {
  	HTAPI.StaticGetTowns({
  		countyId: this.state.selectQu.county_id
  	}).then(response => {
  		this.state.selectQu.Towns = response
		this.state.selectZhen = this.state.selectQu.Towns[0]
		this.setState(this.state)
  	})
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
              	hitSlop={{top: 20, bottom: 20}}
                style={[styles.detailSecondBtn,
                selectItem?.province_id === e?.province_id && {
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
                <Text style={[styles.detailSecondText, selectItem.province_id === e.province_id && { color: greenColor, fontWeight: 'bold' }]}>{e.name}</Text>
              </NextTouchableOpacity>
            )
          })}
        </ScrollView>
        <ScrollView style={styles.detailThirdView}>
          {selectItemSecond.map((e: any, index: number) => {
            const isSelected = selectedCity && (selectedCity.city_id === e.city_id)
            return (
              <NextTouchableOpacity
              	hitSlop={{top: 20, bottom: 20}}
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
                  if (index > 0) {
                    Toast.show('敬请期待')
                  } else {
                    this.setState({
                      selectArea: e
                    })
                  }
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
                  }, this.loadTown)
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
          {(selectQu?.Towns ?? []).map((e: any, index: number) => {
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
          textStyle={!selectedCity ? {
            color: '#666', fontSize: 13,
            fontWeight: 'normal'
          } : null}
          containerStyle={styles.confirmBtn}
          linearStyle={styles.linearStyle}
          text="确定"
          onPress={() => {
            const { navigation, route: { params: { selectJobCityCallback, mode } } } = this.props
            if (mode === 1) {
              // 选择城市级别
              selectJobCityCallback([selectItem, selectedCity, selectedCity.name == '市辖区' ? selectItem : selectedCity])
              navigation.goBack()
            } else if (isSelectDetailArea) {
              // 临时把名称返回,具体的等后述需求
              selectJobCityCallback([selectItem, selectedCity, selectQu, selectZhen])
              navigation.goBack()
            } else {
				this.setState({
				    isSelectDetailArea: true,
				    selectedCity: selectItem.Cities[0],
				    selectQu: selectItem.Cities[0].Counties[0]
				}, this.loadTown)
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

export default JobSelectCity