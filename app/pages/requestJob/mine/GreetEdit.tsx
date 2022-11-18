import React, { Component } from 'react'
import { Text, View, TextInput, } from 'react-native'
import styles from './styles/GreetEdit.style'
import { GenProps } from '../../../utils/StackProps'
import NavBar, { EButtonType } from '../../components/NavBar'

type IProps = GenProps<'GreetEdit'> & {

}

interface IState {
  greetItem: any
  greetValue: string
}

export default class GreetEdit extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { route: { params: { greetItem } } } = props
    this.state = {
      greetItem,
      greetValue: (greetItem && greetItem.title) || ''
    }
  }

  componentDidMount() {

  }

  renderNavBar() {
    const { navigation } = this.props
    const { greetValue } = this.state
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 1,
          borderBottomColor: '#F3F3F3',
          elevation: 0,
        }}
        title="编辑打招呼用语"
        left={{
          style: { width: 17, height: 17, },
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/close-gray.png'),
          act: () => {
            navigation.pop()
          },
        }}
        right={{
          type: EButtonType.TEXT,
          value: '保存',
          style: styles.saveBtn,
          act: () => {
            if (!greetValue) {
              Toast.show('请先填写信息')
            } else {
              ActionToast.show('保存成功')
            }
          }
        }}
      />
    )
  }

  renderEdit() {
    const { greetValue } = this.state
    return (
      <View>
        <View style={styles.inputView}>
          <TextInput
            autoFocus={true}
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            multiline={true}
            style={styles.contentInput}
            placeholder="请填写打招呼用语"
            placeholderTextColor="#AAAAAA"
            value={greetValue}
            maxLength={100}
            onChangeText={(value) => {
              this.setState({ greetValue: value })
            }}
          />
        </View>
        <Text style={styles.contentAmount}>
          {`${greetValue.length}`}
          <Text style={{ color: '#CCCCCC' }}>
            /100
          </Text>
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderEdit()}
      </View>
    )
  }
}