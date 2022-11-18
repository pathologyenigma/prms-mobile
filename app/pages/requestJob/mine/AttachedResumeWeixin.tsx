import React, { Component } from 'react'
import { Text, View, Image, ScrollView, } from 'react-native'
import styles from './styles/AttachedResumeWeixin.style'
import { GenProps } from '../../../utils/StackProps'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextPressable from '../../components/NextPressable'

type IProps = GenProps<'AttachedResumeWeixin'> & {

}

interface IState {

}

export default class AttachedResumeWeixin extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
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
        title="微信上传附件简历"
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

  renderTitle() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>详情及操作步骤</Text>
        <View style={styles.headerGreen} />
      </View>
    )
  }

  renderFirst() {
    return (
      <View style={styles.itemView}>
        <Text style={styles.itemDetail}>（1）微信找到要上传的文件</Text>
        <Image
          style={styles.itemImage}
          source={require('../../../assets/requestJobs/weixin-stepone.png')}
        />
      </View>
    )
  }

  renderSecond() {
    return (
      <View style={styles.itemView}>
        <Text style={styles.itemDetail}>（2）打开文件点开查看更多</Text>
        <Image
          style={styles.itemImage}
          source={require('../../../assets/requestJobs/weixin-steptwo.png')}
        />
      </View>
    )
  }

  renderThree() {
    return (
      <View style={styles.itemView}>
        <Text style={styles.itemDetail}>（3）点击弹窗的“用其他应用打开”</Text>
        <Image
          style={styles.itemImage}
          source={require('../../../assets/requestJobs/weixin-stepthree.png')}
        />
      </View>
    )
  }

  renderFour() {
    return (
      <View style={styles.itemView}>
        <Text style={styles.itemDetail}>（4）在其他应用中找到“趁早找”</Text>
        <Image
          style={styles.itemImage}
          source={require('../../../assets/requestJobs/weixin-stepfour.png')}
        />
      </View>
    )
  }

  renderFive() {
    return (
      <View style={styles.itemView}>
        <Text style={styles.itemDetail}>（5）在app选择上传附件类型</Text>
        <Image
          style={styles.itemImage}
          source={require('../../../assets/requestJobs/weixin-stepfive.png')}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView
          style={styles.scrollview}
          contentContainerStyle={styles.contentContainerStyle}
        >
          {this.renderTitle()}
          {this.renderFirst()}
          {this.renderSecond()}
          {this.renderThree()}
          {this.renderFour()}
          {this.renderFive()}
        </ScrollView>
      </View>
    )
  }
}