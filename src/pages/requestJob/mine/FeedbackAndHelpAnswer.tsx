import React, { Component } from 'react'
import { Text, View, Image, } from 'react-native'
import styles from './styles/FeedbackAndHelpAnswer.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import RootLoading from '../../../utils/rootLoading'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

type IProps = GenProps<'FeedbackAndHelpAnswer'> & {

}

interface IState {
  feedbackItem: any
}

export default class FeedbackAndHelpAnswer extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { navigation, route: { params } } = props
    if (!params || !params.feedbackItem) {
      RootLoading.info('未获取信息,请刷新重试')
      navigation.goBack()
      return
    }
    this.state = {
      feedbackItem: params.feedbackItem
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
          borderBottomWidth: 1,
          borderBottomColor: '#F3F3F3',
          elevation: 0,
        }}
        title="常见问题解答"
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

  renderListHeader() {
    const { feedbackItem } = this.state
    return (
      <View style={styles.listHeaderView}>
        <Text style={styles.listTitle}>
          {feedbackItem.question}
        </Text>
      </View>
    )
  }

  renderAnswer() {
    const { feedbackItem } = this.state
    return (
      <Text style={styles.answerText}>
        {feedbackItem.answer}
      </Text>
    )
  }

  render() {
    const { feedbackItem } = this.state
    if (!feedbackItem) {
      return <View style={{ backgroundColor: '#fff', }} />
    }
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderListHeader()}
        {this.renderAnswer()}
      </View >
    )
  }
}