import React, { Component } from 'react'
import { Text, View, TextInput } from 'react-native'
import styles from './styles/AttachedResumeRename.style'
import { GenProps } from '../../../utils/StackProps'
import NavBar, { EButtonType } from '../../components/NavBar'
import { greenColor } from '../../../utils/constant'

type IProps = GenProps<'AttachedResumeRename'> & {

}

interface IState {
  newName: string
}

export default class AttachedResumeRename extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      newName: ''
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {

  }

  renderNavBar() {
    const { navigation } = this.props
    const { newName } = this.state
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
        }}
        title=""
        left={{
          style: { width: 17, height: 17, },
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
        right={{
          type: EButtonType.TEXT,
          value: '保存',
          style: [styles.saveBtn, newName.length === 0 && { color: '#999' }],
          act: () => {
            if (newName.length === 0) {
              Toast.show('请输入完整的简历名称')
            } else {
              Toast.show('保存成功')
            }
          }
        }}
      />
    )
  }

  renderContent() {
    const { newName } = this.state
    return (
      <View style={styles.content}>
        <Text style={styles.title}>
          附件简历重命名
        </Text>
        <Text style={styles.detail}>
          建议简历命名方式以 姓名-应聘岗位-工作经验的格式命名
        </Text>
        <View style={styles.inputView}>
          <TextInput
            selectionColor={greenColor}
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            multiline={true}
            style={styles.contentInput}
            placeholder="请输入附件简历名称"
            placeholderTextColor="#CCCCCC"
            value={newName}
            maxLength={30}
            onChangeText={(value) => {
              this.setState({ newName: value })
            }}
          />
          <Text style={styles.contentAmount}>
            {`${newName.length}/30`}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderContent()}
      </View>
    )
  }
}