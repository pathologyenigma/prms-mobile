import React, { Component } from 'react'
import { Text, View, ScrollView, } from 'react-native'
import styles from './styles/FeedbackAndHelpSubmit.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import RootLoading from '../../../utils/rootLoading'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import GradientButton from '../../components/GradientButton'
import { TextInput } from 'react-native-gesture-handler'

type IProps = GenProps<'FeedbackAndHelpSubmit'> & {

}

interface IState {
  typeTags: any
  content: string
  contact: string
}

export default class FeedbackAndHelpSubmit extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      typeTags: [{
        id: 1,
        title: '功能建议',
        selected: true,
      }, {
        id: 2,
        title: '性能问题',
        selected: false,
      }, {
        id: 3,
        title: '其他',
        selected: false,
      }],
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
        title="用户反馈"
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

  renderTag() {
    const { typeTags } = this.state
    return (
      <View>
        <Text style={styles.typeTitle}>分类标签</Text>
        <View style={styles.tagView}>
          {typeTags.map((item: any, index: number) => {
            { console.log('item: ', item) }
            if (item.selected) {
              return (
                <GradientButton
                  key={index.toString()}
                  text={item.title}
                  containerStyle={styles.selectBtnContainer}
                  linearStyle={styles.selectBtn}
                  textStyle={styles.selectTitle}
                  onPress={() => {
                    const nextTypeTags = []
                    for (let i = 0; i < typeTags.length; i++) {
                      if (typeTags[i].id === item.id) {
                        nextTypeTags.push({
                          ...typeTags[i],
                          selected: true
                        })
                      } else {
                        nextTypeTags.push({
                          ...typeTags[i],
                          selected: false
                        })
                      }

                    }
                    this.setState({ typeTags: nextTypeTags })
                  }}
                />)
            }
            return (
              <NextTouchableOpacity
                style={styles.normalBtn}
                key={index.toString()}
                onPress={() => {
                  const nextTypeTags = []
                  for (let i = 0; i < typeTags.length; i++) {
                    if (typeTags[i].id === item.id) {
                      nextTypeTags.push({
                        ...typeTags[i],
                        selected: true
                      })
                    } else {
                      nextTypeTags.push({
                        ...typeTags[i],
                        selected: false
                      })
                    }
                  }
                  this.setState({
                    typeTags: nextTypeTags
                  })
                }}>
                <Text style={styles.normalText}>
                  {item.title}
                </Text>
              </NextTouchableOpacity>
            )
          })}
        </View>
      </View >
    )
  }

  renderContent() {
    const { content } = this.state
    return (
      <View style={styles.contentView}>
        <Text style={styles.typeTitle}>反馈内容</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          style={styles.contentInput}
          placeholder="请输入反馈内容"
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
        style={styles.submitBtn}
        onPress={() => {
          if (!content) {
            RootLoading.info('请先输入反馈内容')
          } else {
            RootLoading.success('反馈成功')
            navigation.goBack()
          }
        }}
      >
        <Text style={styles.selectText}>
          提交反馈
        </Text>
      </NextTouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView style={styles.scrollView}>
          {this.renderTag()}
          {this.renderContent()}
          {this.renderContact()}
          {this.renderBtn()}
        </ScrollView>
      </View >
    )
  }
}