import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar, Platform } from 'react-native'
import styles from './styles/EditPersonalGoods.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { TextInput } from 'react-native-gesture-handler'
// import ImagePicker from 'react-native-image-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { editPersonalAdvantage } from '../../../action/mineAction'
import RootLoading from '../../../utils/rootLoading'

type IProps = GenProps<'EditPersonalGoods'> & {

}

interface IState {
  detail: string,
  selectImage: any
}

export default class EditPersonalGoods extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { route: { params: { personalGoods } } } = props
    this.state = {
      detail: personalGoods || '',
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
    const { detail } = this.state
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
        }}
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/black_back.png'),
          act: () => {
            navigation.pop()
          },
        }}
        right={{
          type: EButtonType.TEXT,
          style: styles.confirmBtn,
          value: '确定',
          disable: detail.length === 0,
          act: () => {
            this.savePersonalAdvantage()
          },
        }}
      />
    )
  }

  savePersonalAdvantage() {
    const { detail } = this.state
    const { navigation, route: { params: { personalGoodsCallback } } } = this.props
    editPersonalAdvantage(detail, (error) => {
      if (!error) {
        RootLoading.success('保存成功')
        if (personalGoodsCallback) {
          personalGoodsCallback()
        }
        setTimeout(() => {
          navigation.goBack()
        }, 1000)
      } else {
        RootLoading.fail(error.toString())
      }
    })
  }

  renderTitle() {
    return (
      <View style={styles.titleView}>
        <Text style={styles.title}>我的优势</Text>
        <Text style={styles.description}>一句话介绍自己，突出核心优势</Text>
      </View>
    )
  }

  renderDetail() {
    const { detail } = this.state
    return (
      <View style={styles.detailView}>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          style={styles.detailInput}
          placeholder="补充更详细的说明"
          placeholderTextColor="#AAAAAA"
          value={detail}
          maxLength={500}
          onChangeText={(value) => {
            this.setState({ detail: value })
          }}
        />
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
          {this.renderTitle()}
          {this.renderDetail()}
        </ScrollView>
      </View>
    )
  }
}