import React, { Component } from 'react'
import { GenProps } from '../../../navigator/requestJob/stack'
import RootLoading from '../../../utils/rootLoading'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { SafeAreaView, StatusBar, ImageBackground, Image, ScrollView, View, Text, ImageSourcePropType, TouchableOpacity } from 'react-native'
import styles from './styles/JinbiSignin.style'
import LinearGradient from 'react-native-linear-gradient'

type IProps = GenProps<'JinbiSignin'> & {

}

type IState = {
  signinDay: number
  signinRank: number
  rewardAmount: number
  isSignin: boolean
}

export default class JinbiSignin extends Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      signinDay: 2,
      signinRank: 4392,
      rewardAmount: 1,
      isSignin: false
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {

  }

  renderNavBar() {
    const { navigation } = this.props
    const { signinDay } = this.state
    return (
      <ImageBackground
        style={styles.topImage}
        resizeMode="stretch"
        source={require('../../../assets/requestJobs/qiandao-beijing.png')}
      >
        <View style={styles.bar}>
          <TouchableOpacity
            style={styles.backBtn}
            activeOpacity={0.9}
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Image
              style={styles.backIcon}
              resizeMode="contain"
              source={require('../../../assets/requestJobs/jinbi-back.png')}
            />
          </TouchableOpacity>
          <Text style={styles.barTitle}>签到</Text>
          <View style={styles.backBtn} />
        </View>
        <Image
          style={styles.qiandaoBtnIcon}
          resizeMode="contain"
          source={require('../../../assets/requestJobs/qiandao-rili.png')}
        />
        <Text style={styles.signinDay}>{`已连续签到${signinDay}天`}</Text>
      </ImageBackground>
    )
  }

  renderSignin() {
    const { signinDay, signinRank, rewardAmount, isSignin } = this.state
    const dayAll = [1, 2, 3, 4, 5, 6, 7]
    const start = { x: 0.5, y: 0 }
    const end = { x: 0.5, y: 1 }
    return (
      <View>
        <View style={styles.dayContainer}>
          {dayAll.map((e: any, index: number) => {
            return (
              index < signinDay ? (
                <LinearGradient
                  start={start}
                  end={end}
                  colors={['#F6A636', '#FDB940']}
                  style={styles.linear}
                >
                  <Text style={styles.dayText}>
                    {e}
                  </Text>
                  <Image
                    style={styles.signinIcon}
                    resizeMode="contain"
                    source={require('../../../assets/requestJobs/qiandao-dui.png')}
                  />
                </LinearGradient>
              ) : (
                <View style={styles.dayView}>
                  <Text style={styles.unsigninText}>
                    {e}
                  </Text>
                  <Image
                    style={styles.unsigninIcon}
                    resizeMode="contain"
                    source={require('../../../assets/requestJobs/qiandao-jinbi.png')}
                  />
                </View>
              )
            )
          })}
        </View >
        <View style={styles.rankView}>
          <Text style={styles.rankText}>{`你是今日第${signinRank}名签到用户，获得了${rewardAmount}枚`}</Text>
          <Image
            style={styles.unsigninIcon}
            resizeMode="contain"
            source={require('../../../assets/requestJobs/qiandao-jinbi.png')}
          />
        </View>
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={['#78A8F8', '#7396F7']}
          style={styles.signLinear}
        >
          <NextTouchableOpacity
            style={styles.signinBtn}
            onPress={() => {
              if (!isSignin) {
                this.setState({
                  isSignin: true
                })
              } else {
                RootLoading.info('今日已签到')
              }
            }}
          >
            <Text style={[styles.signinText, isSignin && { opacity: 0.5 }]}>
              {isSignin ? '已签到' : '签到'}
            </Text>
          </NextTouchableOpacity>
        </LinearGradient>
        <NextTouchableOpacity
          style={styles.signinRulesBtn}
          onPress={() => {
            const { navigation } = this.props
            navigation.push('JinbiSigninRules')
          }}
        >
          <Text style={styles.signinRulesText}>签到规则说明</Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container} >
        <StatusBar
          translucent={true}
          barStyle={'light-content'}
          animated />
        <ScrollView>
          {this.renderNavBar()}
          {this.renderSignin()}
        </ScrollView>
      </SafeAreaView>
    )
  }
}
