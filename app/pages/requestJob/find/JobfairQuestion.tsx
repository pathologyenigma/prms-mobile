import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList } from 'react-native'
import styles from './styles/JobfairQuestion.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import GradientButton from '../../components/GradientButton'

type IProps = GenProps<'JobfairQuestion'> & {

}

interface IState {
  content: string,
  description: string,
}

export default class JobfairQuestion extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      content: '',
      description: '',
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
        title="问题"
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

  handleRefresh() {

  }

  handleEndReached() {

  }

  renderTitle() {
    return (
      <View style={styles.titleView}>
        <Text style={styles.title}>来自公司：深圳智慧网络有限公司</Text>
      </View>
    )
  }

  renderInput() {
    const { content } = this.state
    return (
      <View style={styles.inputView}>
        <Text style={styles.inputViewTitle}>问题描述（必填）</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          style={styles.contentInput}
          placeholder="请一句话描述问题，并以问号结尾"
          placeholderTextColor="#AAAAAA"
          value={content}
          onChangeText={(value) => {
            this.setState({ content: value })
          }}
        />
      </View>
    )
  }

  renderInputDescription() {
    const { description } = this.state
    return (
      <View style={styles.descriptionView}>
        <Text style={styles.inputViewTitle}>应聘职位</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          style={styles.descriptionInput}
          placeholder="请填写您应聘的岗位"
          placeholderTextColor="#AAAAAA"
          value={description}
          onChangeText={(value) => {
            this.setState({ description: value })
          }}
        />
      </View>
    )
  }

  renderFooterBtn() {
    const { navigation } = this.props
    const { description, content } = this.state
    return (
      <View style={styles.bottomContainer}>
        <GradientButton
          text="发布"
          containerStyle={styles.btnContainer}
          onPress={() => {
            if (content && description) {
              Toast.show('发布成功')
              navigation.goBack()
            } else {
              Toast.show('请完善发布信息')
            }
          }}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView>
          {this.renderTitle()}
          {this.renderInput()}
          {this.renderInputDescription()}
          {this.renderFooterBtn()}
        </ScrollView>
      </View>
    )
  }
}