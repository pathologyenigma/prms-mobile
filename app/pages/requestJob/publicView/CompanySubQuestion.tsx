import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList } from 'react-native'
import styles from './styles/CompanySubQuestion.style'
import { GenProps } from '../../../utils/StackProps'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import GradientButton from '../../components/GradientButton'
import CompanyQuestionCell from './CompanyQuestionCell'
import NextPressable from '../../components/NextPressable'

type IProps = GenProps<'CompanySubQuestion'> & {

}

interface IState {
  content: string,
  description: string,
  anonymous: boolean,
  askObject: number, // 提问对象: 1 : 该公司员工; 2: 面试者
}

export default class CompanySubQuestion extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      content: '',
      description: '',
      anonymous: false,
      askObject: 1
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
    const { askObject } = this.state
    return (
      <View style={styles.titleView}>
        <Text style={styles.title}>来自公司：深圳智慧网络有限公司</Text>
        <Text style={styles.detail}>选择提问对象</Text>
        <View style={styles.objectView}>
          {askObject === 1 ? (
            <GradientButton
              text="该公司员工"
              textStyle={styles.yuangongTextStyle}
              containerStyle={styles.yuangongStyle}
            />
          ) : (
            <NextPressable
              style={[styles.reviewerBtn, { width: 100, marginRight: 15 }]}
              onPress={() => {
                this.setState({ askObject: 1 })
              }}
            >
              <Text style={styles.reviewerText}>该公司员工</Text>
            </NextPressable>
          )}
          {askObject === 2 ? (
            <GradientButton
              text="面试者"
              textStyle={styles.yuangongTextStyle}
              containerStyle={styles.mianshiStyle}
            />
          ) : (
            <NextPressable
              style={styles.reviewerBtn}
              onPress={() => {
                this.setState({ askObject: 2 })
              }}
            >
              <Text style={styles.reviewerText}>面试者</Text>
            </NextPressable>
          )}
        </View>
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
        <Text style={styles.inputViewTitle}>补充说明</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          style={styles.descriptionInput}
          placeholder="补充说明你的问题，如背景、相关资料等"
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
    const { anonymous, content } = this.state
    return (
      <View style={styles.bottomContainer}>
        <GradientButton
          text="发布"
          containerStyle={styles.btnContainer}
          onPress={() => {
            if (content) {
              Toast.show('发布成功')
              navigation.goBack()
            } else {
              Toast.show('请完善发布信息')
            }
          }}
        />
        <View style={styles.tipsView}>
          <View style={styles.tipsTextView}>
            <Text style={styles.tipsText}>你的回答需遵守</Text>
            <NextPressable
              onPress={() => {
                Toast.show('趁早找社区管理规范')
              }}
            >
              <Text style={styles.tipsGuifan}>
                《趁早找社区管理规范》
              </Text>
            </NextPressable>
          </View>
          <NextPressable
            style={styles.checkBtn}
            onPress={() => {
              this.setState({ anonymous: !anonymous })
            }}
          >
            <View style={styles.checkView}>
              {anonymous && (
                <Image
                  style={styles.checkIcon}
                  resizeMode="center"
                  source={require('../../../assets/requestJobs/green-check.png')}
                />
              )}
            </View>
            <Text style={styles.anonymousText}>匿名</Text>
          </NextPressable>
        </View>
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