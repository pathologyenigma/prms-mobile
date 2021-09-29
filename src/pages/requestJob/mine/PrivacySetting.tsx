import React, { Component } from 'react'
import { Text, View, Image, ScrollView, } from 'react-native'
import styles from './styles/PrivacySetting.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

type IProps = GenProps<'PrivacySetting'> & {

}

interface IState {
  showName: string
}

export default class PrivacySetting extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      showName: '李小冉'
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
          borderBottomWidth: 1,
          borderBottomColor: '#ececec',
          elevation: 0,
        }}
        title="隐私设置"
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

  renderName() {
    const { showName } = this.state
    return (
      <NextTouchableOpacity
        style={styles.name}
        onPress={() => {
          const { navigation } = this.props
          navigation.push('PrivacyName')
        }}
      >
        <Text style={styles.nameText}>姓名展示</Text>
        <Text style={styles.nameDetail}>{showName}</Text>
        <Image
          style={styles.nextIcon}
          source={require('../../../assets/requestJobs/next-gray.png')}
        />
      </NextTouchableOpacity>
    )
  }

  renderBanCompany() {
    return (
      <NextTouchableOpacity
        style={styles.companyConatinerView}
        onPress={() => {
          const { navigation } = this.props
          navigation.push('BanCompany')
        }}
      >
        <View style={styles.companyView}>
          <Text style={styles.nameText}>屏蔽企业</Text>
          <Image
            style={styles.nextIcon}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </View>
        <Text style={styles.companyDetail}>屏蔽生效后，被屏蔽企业将无法查看你的简历</Text>
      </NextTouchableOpacity>
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
          {this.renderName()}
          {this.renderBanCompany()}
        </ScrollView>
      </View>
    )
  }
}