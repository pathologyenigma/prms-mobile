import React, { Component } from 'react'
import { SafeAreaView, StatusBar, ImageBackground, Image, ScrollView, View, Text, ImageSourcePropType, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import styles from './styles/JinbiRecharge.style'
import RootLoading from '../../../utils/rootLoading'
import AsyncStorage from "@react-native-community/async-storage";
import { CommonActions } from '@react-navigation/native';
import { GenProps } from '../../../navigator/requestJob/stack'
import { TextInput } from 'react-native-gesture-handler'
import GradientButton from '../../components/GradientButton'

type IProps = GenProps<'JinbiRecharge'> & {

}

type IState = {
  jinbiList: any,
  isCustomAmount: boolean,
  customAmount: string,
  payType: any
}

export default class JinbiRecharge extends Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    console.log('props: ', props)
    this.state = {
      jinbiList: undefined,
      isCustomAmount: false,
      customAmount: '',
      payType: undefined
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    setTimeout(() => {
      this.setState({
        jinbiList: [{
          id: 1,
          amount: 6,
          money: 6
        }, {
          id: 2,
          amount: 50,
          money: 50
        }, {
          id: 3,
          amount: 100,
          money: 100
        }, {
          id: 4,
          amount: 150,
          money: 150
        }, {
          id: 5,
          amount: 200,
          money: 200
        }, {
          id: 6,
          amount: 250,
          money: 250
        }, {
          id: 7,
          amount: 300,
          money: 300
        },]
      })
    }, 300);
  }

  renderNavBar() {
    const { navigation } = this.props
    return (
      <ImageBackground
        style={styles.topImage}
        resizeMode="cover"
        source={require('../../../assets/requestJobs/jinbi-bg.png')}
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
          <Text style={styles.barTitle}>金币充值</Text>
          <View style={styles.backBtn} />
        </View>
        <NextTouchableOpacity
          style={styles.qiandaoBtn}
          onPress={() => {
            navigation.push('JinbiSignin')
          }}
        >
          <Image
            style={styles.qiandaoBtnIcon}
            resizeMode="contain"
            source={require('../../../assets/requestJobs/jinbi-qiandao.png')}
          />
        </NextTouchableOpacity>
        <Text style={styles.jinbiValue}>10</Text>
        <Text style={styles.jinbiTitle}>当前金币</Text>
      </ImageBackground>
    )
  }

  renderJinbi() {
    const { jinbiList, isCustomAmount } = this.state
    if (!jinbiList || jinbiList.length === 0) {
      return null
    }
    return (
      <View style={{ marginTop: 14 }}>
        <View style={styles.tagView}>
          {jinbiList.map((item: any, index: number) => {
            return (
              <NextTouchableOpacity
                style={[styles.tagBtn, item.select && { backgroundColor: '#fff' }]}
                onPress={() => {
                  const nextJinbilistTag = []
                  for (let i = 0; i < jinbiList.length; i++) {
                    if (i !== index) {
                      nextJinbilistTag.push({
                        ...jinbiList[i],
                        select: false
                      })
                    } else {
                      nextJinbilistTag.push({
                        ...jinbiList[i],
                        select: true
                      })
                    }
                  }
                  this.setState({
                    isCustomAmount: false,
                    jinbiList: nextJinbilistTag,
                    customAmount: item.money
                  })
                }}
              >
                {item.select ? (
                  <Image
                    style={styles.selectJinboTag}
                    source={require('../../../assets/requestJobs/jinbi-xuanzhong.png')}
                  />
                ) : null}
                <Text style={styles.tagAmount}>{`${item.amount}金币`}</Text>
                <Text style={styles.tagMoney}>{`¥${item.money}`}</Text>
              </NextTouchableOpacity>
            )
          })}
          <NextTouchableOpacity
            style={[styles.tagBtn, isCustomAmount && { backgroundColor: '#fff' }]}
            onPress={() => {
              if (!isCustomAmount) {
                const nextJinbilistTag = []
                for (let i = 0; i < jinbiList.length; i++) {
                  nextJinbilistTag.push({
                    ...jinbiList[i],
                    select: false
                  })
                }
                this.setState({
                  isCustomAmount: true,
                  jinbiList: nextJinbilistTag,
                  customAmount: '',
                })
              }
            }}
          >
            {isCustomAmount ? (
              <Image
                style={styles.selectJinboTag}
                source={require('../../../assets/requestJobs/jinbi-xuanzhong.png')}
              />
            ) : null}
            <Text style={styles.tagCustomText}>自定义充值</Text>
          </NextTouchableOpacity>
        </View>
        {this.renderInputAmount()}
      </View>
    )
  }

  renderInputAmount() {
    const { customAmount, isCustomAmount } = this.state
    if (!isCustomAmount) {
      return null
    }
    return (
      <View style={styles.customInputView}>
        <Text style={styles.customTitle}>
          ¥
        </Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="number-pad"
          style={styles.customInput}
          placeholder="请输入充值金额"
          value={customAmount.toString()}
          onChangeText={(value) => {
            this.setState({ customAmount: value })
          }}
        />
        <NextTouchableOpacity
          onPress={() => {

          }}
        >
          <Text style={styles.customAllText}>{`获得${customAmount || 0}金币`}</Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  renderPayTypeCell(
    icon: ImageSourcePropType,
    title: string,
    payIndex: number,
  ) {
    const { payType } = this.state
    return (
      <NextTouchableOpacity
        style={styles.cellItem}
        key={title.toString()}
        onPress={() => {
          this.setState({ payType: payIndex })
        }}
      >
        <View style={styles.titleView}>
          <Image
            resizeMode="contain"
            style={styles.leftArrow}
            source={icon}
          />
          <View>
            <Text style={styles.otherTitle}>{title}</Text>
            {payIndex === 3 && (
              <Text style={styles.yueTitle}>余额支付99.90元，可兑换99个金币</Text>
            )}
          </View>
        </View>
        <Image
          style={styles.rightArrow}
          source={payIndex === payType
            ? require('../../../assets/requestJobs/jinbi-paytype.png')
            : require('../../../assets/requestJobs/jinbi-paytype-gray.png')
          }
        />
      </NextTouchableOpacity>
    )
  }

  renderPayType() {
    const imageSource = [
      require('../../../assets/requestJobs/jinbi-zhifubao.png'),
      require('../../../assets/requestJobs/jinbi-weixin.png'),
      require('../../../assets/requestJobs/jinbi-yue.png'),
    ]
    const titleArray = [{
      id: 1,
      title: '支付宝支付',
    }, {
      id: 2,
      title: '微信支付',
    }, {
      id: 3,
      title: '余额支付',
    }]
    const { navigation } = this.props
    return (
      <View style={{ marginTop: 4 }}>
        <Text style={styles.payTypeText}>选择支付方式</Text>
        {titleArray.map((item, index) => {
          {
            return (
              this.renderPayTypeCell(
                imageSource[index],
                item.title,
                item.id,
              )
            )
          }
        })}
        <ImageBackground
          style={styles.tipsBg}
          source={require('../../../assets/requestJobs/jinbi-tipsbg.png')}
        >
          <View style={styles.tipsTitleView}>
            <Image
              style={styles.tipsIcon}
              source={require('../../../assets/requestJobs/jinbi-zhuyi.png')}
            />
            <Text style={styles.tipsText}>温馨提示：</Text>
          </View>
          <Text style={styles.tipsItem}>
            1、IOS充值金币不能在非IOS使用
          </Text>
          <Text style={styles.tipsItem}>
            2、兑换比例：1元=1金币
          </Text>
          <Text style={styles.tipsItem}>
            3、我们强烈建议您在实名认证之后再进行充值交易
          </Text>
          <Text style={styles.tipsItem}>
            4、购买后若长时间无变化，请保存相关交易记录证明，致客服QQ：13000000
          </Text>
        </ImageBackground>
      </View>
    )
  }

  renderFooterBtn() {
    const { customAmount } = this.state
    return (
      <View style={styles.footerView}>
        <Text style={styles.moneyTitle}>充值金额</Text>
        <Text style={styles.moneyTitleValue}>{`¥ ${customAmount || '0'}元`}</Text>
        <GradientButton
          disabled={!customAmount || customAmount === '0'}
          containerStyle={styles.confirmBtn}
          linearStyle={styles.linearStyle}
          text="充值"
          onPress={() => {

          }}
        />
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent={true}
          barStyle="light-content"
          animated />
        <ScrollView>
          {this.renderNavBar()}
          {this.renderJinbi()}
          {this.renderPayType()}
        </ScrollView>
        {this.renderFooterBtn()}
      </SafeAreaView>
    )
  }
}
