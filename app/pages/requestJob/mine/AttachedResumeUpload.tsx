import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import styles from './styles/AttachedResumeUpload.style'
import { GenProps } from '../../../utils/StackProps'
import NavBar, { EButtonType } from '../../components/NavBar'

type IProps = GenProps<'AttachedResumeUpload'> & {

}

interface IState {
  uploadProgress: number
}

export default class AttachedResumeUpload extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      uploadProgress: 0
    }
  }

  componentDidMount() {
    this.loadData()
  }

  componentWillUnmount() {

  }

  loadData() {
    const { uploadProgress } = this.state
    if (uploadProgress < 1) {
      setTimeout(() => {
        // 模拟上传进度
        this.setState({ uploadProgress: uploadProgress + 0.1 }, () => {
          this.loadData()
        })
      }, 500);
    } else {
      ActionToast.show('上传成功')
      const { navigation } = this.props
      navigation.goBack()
    }
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
        title="上传附件"
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
    return (
      <View style={styles.content}>
        <Image
          source={require('../../../assets/requestJobs/resume-upload.png')}
          style={styles.uploadIcon}
        />
        {this.renderProgress()}
        <Text style={styles.title}>
          正在上传附件简历
        </Text>
      </View>
    )
  }

  renderProgress() {
    const { uploadProgress } = this.state
    return (
      <View style={styles.progressContain}>
        <View
          style={[styles.progressView, { width: uploadProgress * 200 }]}
        />
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