import React, { Component } from 'react'
import { Text, View, Image, ScrollView, } from 'react-native'
import styles from './styles/AttachedResumeComputer.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

type IProps = GenProps<'AttachedResumeComputer'> & {

}

interface IState {

}

export default class AttachedResumeComputer extends Component<IProps, IState> {
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
        title="电脑上传附件简历"
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

  renderFirst() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>第一步</Text>
        <Text style={styles.headerDetail}>在电脑浏览器输入“chenzaozhao.com”</Text>
        <View style={styles.searchBox}>
          <View style={styles.searchInput} />
          <Image
            style={styles.sousuo}
            source={require('../../../assets/requestJobs/sousuo-green.png')}
          />
        </View>
      </View>
    )
  }

  renderSecond() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>第二步</Text>
        <Text style={styles.headerDetail}>点击下方按钮，扫描电脑上的二维码</Text>
        <Image
          style={styles.qrcode}
          source={require('../../../assets/requestJobs/qrcode-green.png')}
        />
        <NextTouchableOpacity
          style={styles.scanBtn}
        >
          <Text style={styles.scanText}>点击扫码</Text>
        </NextTouchableOpacity>
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
          {this.renderFirst()}
          {this.renderSecond()}
        </ScrollView>
      </View>
    )
  }
}