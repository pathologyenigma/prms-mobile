import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, Pressable } from 'react-native'
import styles from './styles/JobSelectCity.style'
import { GenProps } from '../../../utils/StackProps'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { connect } from 'react-redux'
import NextPressable from '../../components/NextPressable'
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

const ITEM_HEIGHT = 60

export default class HTSelectedButton extends Component {

	render() {
		let selected = this.props.selected
		let containerStyle = [
			{ flexDirection: 'row', alignItems: 'center', height: ITEM_HEIGHT },
			selected && { backgroundColor: '#E9F4EE' },
			this.props.style,
		]
		let titleStyle = [
			{ fontSize: 15, color: '#666666', flex: 1, textAlign: 'center' },
			selected && { color: '#79D398', fontWeight: 'bold' },
			this.props.titleStyle,
		]
		return (
			<Pressable style={containerStyle} onPress={this.props.onPress}>
				{
					selected && this.props.showSeparator && <View style={{ width: 5, height: 15, backgroundColor: '#79D398' }}></View>
				}
				<Text style={titleStyle}>{this.props.text}</Text>
				{
					selected && this.props.showImage && <Image source={require('~/assets/requestJobs/green-check.png')} />
				}
			</Pressable>
		)
	}

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
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    HTAPI.request('/preludeDatas/regions_simplified.json').then(response => {
    	const selectItem = response.find(province => {
    		const nameList = [province.name, this.props.navigation.getParam('province', '')]
    		.map(province => province.replace(/(省|市)$/g, ''))
    		if (nameList[0] == nameList[1]) {
    			return province
    		}
    	}) ?? response[0]
    	const selectedCity = selectItem.Cities.find(city => {
    		const nameList = [city.name, this.props.navigation.getParam('city', '')]
    		.map(city => city.replace(/(省|市)$/g, ''))
    		if (nameList[0] == nameList[1]) {
    			return city
    		}
    	})
    	const provinceIndex = response.indexOf(selectItem)
    	const cityIndex = selectItem.Cities.indexOf(selectedCity)
    	this.setState({
        dataSource: response,
        selectItem: selectItem,
        selectedCity: selectedCity,
        selectItemSecond: selectItem.Cities,
      }, () => {
      	setTimeout(() => {
      		this.provinceScrollView.scrollTo({ y: ITEM_HEIGHT * provinceIndex, animated: false })
      		this.cityScrollView.scrollTo({ y: ITEM_HEIGHT * cityIndex, animated: false })
      	}, 50)
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
        <ScrollView style={styles.detailSecondView} ref={ref => this.provinceScrollView = ref}>
          {dataSource.map((e: any, index: number) => {
            return (
              <HTSelectedButton
              	selected={selectItem?.province_id === e?.province_id}
              	key={index}
              	text={e.name}
              	showSeparator={true}
              	onPress={() => {
                  this.setState({
                    selectItem: e,
                    selectItemSecond: e.Cities,
                  })
                }}
              />
            )
          })}
        </ScrollView>
        <ScrollView style={styles.detailThirdView} ref={ref => this.cityScrollView = ref}>
          {selectItemSecond.map((e: any, index: number) => {
            const isSelected = selectedCity && (selectedCity.city_id === e.city_id)
            return (
              <HTSelectedButton
              	selected={isSelected}
              	key={index}
              	text={e.name}
              	style={{ paddingRight: 20 }}
              	titleStyle={{ flex: 1, textAlign: 'left', marginLeft: 50 }}
              	showImage={true}
              	onPress={() => {
                  this.setState({
                    selectedCity: e,
                    selectZhen: e.Counties[0]
                  })
                }}
              />
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
              <HTSelectedButton
              	selected={selectedArea.id === e.id}
              	key={index}
              	text={e.title}
              	style={{ paddingRight: 20 }}
              	titleStyle={{ flex: 1, textAlign: 'left', marginLeft: 50 }}
              	showSeparator={true}
              	onPress={() => {
                  if (index > 0) {
                    global.TODO_TOAST()
                  } else {
                    this.setState({
                      selectArea: e
                    })
                  }
                }}
              />
            )
          })}
        </ScrollView>
        <ScrollView style={styles.detailQuyuView}>
          {selectedCity.Counties.map((e: any, index: number) => {
            return (
              <HTSelectedButton
              	selected={selectQu.county_id === e.county_id}
              	key={index}
              	text={e.name}
              	style={{ paddingRight: 20 }}
              	titleStyle={{ flex: 1, textAlign: 'center' }}
              	onPress={() => {
                  this.setState({
                    selectQu: e,
                  }, this.loadTown)
                }}
              />
            )
          })}
        </ScrollView>
        <ScrollView style={styles.detailZhenView}>
          {(selectQu?.Towns ?? []).map((e: any, index: number) => {
            const isSelected = selectZhen && selectZhen.town_id === e.town_id
            return (
              <HTSelectedButton
              	selected={isSelected}
              	key={index}
              	text={e.name}
              	style={{ paddingRight: 20 }}
              	titleStyle={{ flex: 1, textAlign: 'center' }}
              	onPress={() => {
                  this.setState({ selectZhen: e })
                }}
              />
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
        <NextPressable
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
        </NextPressable>
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
              selectJobCityCallback([selectItem, selectedCity.name == '市辖区' ? selectItem : selectedCity])
              navigation.goBack()
            } else if (isSelectDetailArea) {
              // 临时把名称返回,具体的等后述需求
              selectJobCityCallback([selectItem, selectedCity.name == '市辖区' ? selectItem : selectedCity, selectQu, selectZhen])
              navigation.goBack()
            } else {
							this.setState({
							    isSelectDetailArea: true,
							    selectedCity: selectedCity,
							    selectQu: selectedCity.Counties[0]
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