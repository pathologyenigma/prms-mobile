import React, { Component } from 'react'
import { Text, View, ScrollView, } from 'react-native'
import styles from './styles/SubmitVerifyResult.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import RootLoading from '../../../utils/rootLoading'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { TextInput } from 'react-native-gesture-handler'

type IProps = GenProps<'SubmitVerifyResult'> & {

}

interface IState {
  content: string
  contact: string
}

export default class SubmitVerifyResult extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      content: '',
      contact: ''
    }
  }

  componentDidMount() {

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
        title="申诉"
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

  renderContent() {
    const { content } = this.state
    return (
      <View style={styles.contentView}>
        <Text style={styles.typeTitle}>申诉描述</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          style={styles.contentInput}
          placeholder="请详细描述您的问题"
          placeholderTextColor="#AAAAAA"
          value={content}
          onChangeText={(value) => {
            this.setState({ content: value })
          }}
        />
      </View>
    )
  }

  renderContact() {
    const { contact } = this.state
    return (
      <View style={styles.contentView}>
        <Text style={styles.typeTitle}>联系方式（非必填）</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.contactInput}
          placeholder="如需得到反馈，请输入您的联系方式"
          placeholderTextColor="#AAAAAA"
          value={contact}
          onChangeText={(value) => {
            this.setState({ contact: value })
          }}
        />
      </View>
    )
  }

  renderBtn() {
    const { content } = this.state
    const { navigation } = this.props
    return (
      <NextTouchableOpacity
        style={[styles.submitBtn, !content && { opacity: 0.6 }]}
        onPress={() => {
          if (!content) {
            RootLoading.info('请先输入申诉内容')
          } else {
            RootLoading.success('申诉成功')
            navigation.goBack()
          }
        }}
      >
        <Text style={styles.selectText}>
          提交申诉
        </Text>
      </NextTouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView style={styles.scrollView}>
          {this.renderContent()}
          {this.renderContact()}
          {this.renderBtn()}
        </ScrollView>
      </View >
    )
  }
}