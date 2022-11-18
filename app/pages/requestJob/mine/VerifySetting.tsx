import React, { Component } from 'react'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/VerifySetting.style'
import { GenProps } from '../../../utils/StackProps'
import { Text, View, Image, StatusBar, TextInput } from 'react-native'
import NextPressable from '../../components/NextPressable'
import GradientButton from '../../components/GradientButton'
import LinearGradient from 'react-native-linear-gradient'
import { gradienRightGreenColor, greenColor } from '../../../utils/constant'
import { ScrollView } from 'react-native-gesture-handler'
import AlertContentModal from '../../components/AlertContentModal'

type IProps = GenProps<'VerifySetting'> & {

}

interface IState {
  name: string,
  idNumber: string,
  editName: string,
  editIdNumber: string,
  verifySucceedVisible: boolean
}

export default class VerifySetting extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { route: { params: { name, idNumber } } } = props
    this.state = {
      name,
      idNumber,
      editName: '',
      editIdNumber: '',
      verifySucceedVisible: false,
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
        title="实名认证"
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
      />
    )
  }



  renderCell(title: string, onpress: () => void) {
    return (
      <NextPressable
        style={styles.cellView}
        onPress={() => {
          if (onpress) {
            onpress()
          }
        }}
      >
        <Text style={styles.cellName}>{title}</Text>
        <Image
          style={styles.nextIcon}
          source={require('../../../assets/requestJobs/next-gray.png')}
        />
      </NextPressable>
    )
  }

  renderLogo() {
    return (
      <View style={styles.topView}>
        <Image
          style={styles.successIcon}
          source={require('../../../assets/requestJobs/verify-success.png')}
        />
        <Text style={styles.currentCode}>完成身份认证</Text>
      </View>
    )
  }

  renderContent() {
    const { name, idNumber } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.content}>
        <View style={styles.cellView}>
          <Text style={styles.cellName}>真实姓名</Text>
          <Text style={styles.cellValue}>{name}</Text>
        </View>
        <View style={styles.cellView}>
          <Text style={styles.cellName}>身份证号</Text>
          <Text style={styles.cellValue}>{idNumber}</Text>
        </View>
        <NextPressable
          style={styles.appealBtn}
          onPress={() => {
            navigation.push('SubmitVerifyResult')
          }}
        >
          <Text style={styles.appealText}>
            以上不是我的实名？
            <Text style={{ color: '#57DE9E' }}>去申诉</Text>
          </Text>
        </NextPressable>
      </View>
    )
  }

  renderBtn() {
    const { navigation } = this.props
    return (
      <NextPressable
        style={styles.verifyExplainBtn}
        onPress={() => {

        }}
      >
        <Text style={styles.verifyExplainText}>
          《实名认证规则说明》
        </Text>
      </NextPressable>
    )
  }

  renderFinishButton() {
    const { editName, editIdNumber } = this.state
    const disabled = !editName || !editIdNumber
    return (
      <NextPressable
        style={[styles.finishBtn, disabled && { opacity: 0.6 }]}
        disabled={disabled}
        onPress={() => {
          this.setState({ verifySucceedVisible: true })
        }}
      >
        <Text style={styles.finishText}>
          完成
        </Text>
      </NextPressable>
    )
  }

  renderEditInfo() {
    const { editName, editIdNumber } = this.state
    return (
      <View style={{ marginTop: 15 }}>
        <View style={styles.inputContainer}>
          <Text style={styles.editTitle}>真实姓名</Text>
          <TextInput
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="ascii-capable"
            style={styles.accountLoginInput}
            placeholder="请输入您的姓名"
            value={editName}
            onChangeText={(value) => {
              this.setState({ editName: value })
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.editTitle}>身份证号</Text>
          <TextInput
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="number-pad"
            style={styles.accountLoginInput}
            placeholder="请输入您的身份证号"
            value={editIdNumber}
            onChangeText={(value) => {
              this.setState({ editIdNumber: value })
            }}
          />
        </View>
      </View>
    )
  }

  render() {
    const { name, verifySucceedVisible, editName, editIdNumber } = this.state
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          animated
          barStyle={'dark-content'}
        />
        {this.renderNavBar()}
        <ScrollView>
          {name ? (
            <View>
              {this.renderLogo()}
              {this.renderContent()}
            </View>
          ) : (
            <View>
              {this.renderEditInfo()}
              {this.renderFinishButton()}
            </View>
          )}
        </ScrollView>
        {this.renderBtn()}
        <AlertContentModal
          visible={verifySucceedVisible}
          title="恭喜您，认证成功"
          imageSource={require('../../../assets/requestJobs/verify-succeed.png')}
          imageStyle={{ width: 80, height: 80 }}
          detail="现在就去跟随大牛一起赚钱吧"
          leftBtn={{
            title: '取消',
            act: () => this.setState({
              verifySucceedVisible: false,
            }),
          }}
          rightBtn={{
            title: '确定',
            act: () => {
              this.setState({
                verifySucceedVisible: false,
                name: editName,
                idNumber: editIdNumber
              })
            },
          }}
        />
      </View>
    )
  }
}