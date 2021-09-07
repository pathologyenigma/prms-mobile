import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar, Platform } from 'react-native'
import styles from './styles/ReportComplaintsDetail.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { TextInput } from 'react-native-gesture-handler'
// import ImagePicker from 'react-native-image-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import GradientButton from '../../components/GradientButton'

type IProps = GenProps<'ReportComplaintsDetail'> & {

}

interface IState {
  type: string,
  detail: string,
  selectImage: any
}

export default class JobDetail extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { route: { params } } = props
    this.state = {
      type: params.type,
      detail: '',
      selectImage: []
    }
  }

  selectPhotoTapped = (removeItem?: number) => {
    const options = {
      title: null,
      quality: 1.0,
      storageOptions: {
        path: 'images',
        waitUntilSaved: true,
        cameraRoll: true,
      },
      cameraType: 'front',
      mediaType: 'photo',
      allowEditing: true,
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo',
      chooseFromLibraryButtonTitle: 'Photo Library',
    }
    // @ts-ignore
    launchImageLibrary(options, (response) => {
      console.log('response: ', response)
      console.log('Platform.OS: ', Platform.OS, (Platform.OS === 'android'))
      if (response.didCancel) {
        // 取消选择
        console.log('cancel select')
      } else if (response.error) {
        // 选择失败
        console.log('ImagePi8cker Error: ', response.error)
      } else if (response.customButton) {
        // 选择了取消
        console.log('User tapped custom button: ', response.customButton)
      } else {
        console.log('response: ', response)
        const { selectImage } = this.state
        const nextImageArray = [...selectImage]
        if (response && response.assets && response.assets.length > 0) {
          const selectImage = response.assets[0]
          if (removeItem !== undefined) {
            nextImageArray.splice(removeItem, 1, selectImage)
          } else {
            nextImageArray.push(selectImage)
          }
        }
        console.log('nextImage: ', nextImageArray)
        this.setState({
          selectImage: nextImageArray
        })
      }
    })
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
        title="补充举报证据"
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/black_back.png'),
          act: () => {
            navigation.pop()
          },
        }}
        right={{
          type: EButtonType.IMAGE,
          style: styles.closeIcon,
          value: require('../../../assets/requestJobs/close-gray.png'),
          act: () => {
            navigation.pop()
          },
        }}
      />
    )
  }

  renderReason() {
    const { type } = this.state
    return (
      <View style={styles.cell}>
        <Text style={styles.title}>*举报原因</Text>
        <Text style={styles.description}>{type}</Text>
      </View>
    )
  }

  renderDetail() {
    const { detail } = this.state
    return (
      <View style={styles.detailView}>
        <View style={styles.detailTitle}>
          <Text style={styles.detailStar}>*</Text>
          <Text style={styles.detailText}>具体情况说明</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            multiline={true}
            style={styles.detailInput}
            placeholder="补充更详细的说明，可帮助工作人员更快定位问题，快速处理"
            placeholderTextColor="#AAAAAA"
            value={detail}
            maxLength={500}
            onChangeText={(value) => {
              this.setState({ detail: value })
            }}
          />
          <Text style={styles.detailAmount}>
            {`${detail.length}/500`}
          </Text>
        </View>
      </View>
    )
  }

  renderPicture() {
    const { selectImage } = this.state
    return (
      <View style={styles.detailView}>
        <View style={styles.detailTitle}>
          <Text style={styles.detailText}>图片证明（最多3张）</Text>
        </View>
        <View style={styles.imageView}>
          {selectImage.map((e: any, index: number) => {
            return (
              e.uri ? (
                <NextTouchableOpacity
                  onPress={() => {
                    this.selectPhotoTapped(index)
                  }}
                >
                  <Image
                    style={styles.selectPhoto}
                    source={{ uri: e.uri }}
                  />
                </NextTouchableOpacity>
              ) : null
            )
          })}
          {selectImage.length < 3 && (
            <NextTouchableOpacity
              onPress={() => {
                this.selectPhotoTapped()
              }}
            >
              <Image
                style={styles.selectPhoto}
                source={require('../../../assets/requestJobs/select-photo.png')}
              />
            </NextTouchableOpacity>
          )}
        </View>
      </View>
    )
  }

  renderSubmit() {
    return (
      <GradientButton
        text="提交"
        containerStyle={styles.submitStyle}
      />
    )
  }

  renderTips() {
    return (
      <View style={styles.tipsView}>
        <View style={styles.userPrivacy}>
          <Text style={styles.tipsText}>
            点击“提交”即表示您愿意遵守
          </Text>
          <NextTouchableOpacity>
            <Text style={styles.tipsPrivacy}>《用户协议》</Text>
          </NextTouchableOpacity>
          <Text style={styles.tipsText}>
            和
          </Text>
          <NextTouchableOpacity>
            <Text style={styles.tipsPrivacy}>《个人信息保护政策》</Text>
          </NextTouchableOpacity>
          <Text style={styles.tipsText}>
            并同意
          </Text>
        </View>
        <Text style={[styles.tipsText, { lineHeight: 21, }]}>
          1、您同意并授权平台对您提交的举报材料及相关信息记录进行核实。
        </Text>
        <Text style={[styles.tipsText, { lineHeight: 21, }]}>
          2、您知悉并理解投诉行为的严肃性，如涉嫌虚假投诉/举报应承担相应的法律后果。
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          animated
          barStyle={'dark-content'}
        />
        {this.renderNavBar()}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {this.renderReason()}
          {this.renderDetail()}
          {this.renderPicture()}
          {this.renderSubmit()}
          {this.renderTips()}
        </ScrollView>
      </View>
    )
  }
}