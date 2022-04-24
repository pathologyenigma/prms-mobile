import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar, Platform } from 'react-native'
import styles from './styles/EditPersonalSkills.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { TextInput } from 'react-native-gesture-handler'
// import ImagePicker from 'react-native-image-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import WhiteContentModal from '../../components/WhiteContentModal'

type IProps = GenProps<'EditPersonalSkills'> & {

}

interface IState {
  selectedSkills: any,
  optionalTags: any,
  addModalVisible: boolean,
  addText: string
}

export default class EditPersonalSkills extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { route: { params: { personalSkills } } } = props
    this.state = {
      selectedSkills: personalSkills || [],
      optionalTags: [],
      addModalVisible: false,
      addText: ''
    }
  }

  renderNavBar() {
    const { navigation } = this.props
    const { selectedSkills } = this.state
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
          value: '保存',
          act: () => {
            this.savePersonalSkills()
          },
        }}
      />
    )
  }

  savePersonalSkills() {
    const { selectedSkills } = this.state
    const { navigation, route: { params: { personalSkillsCallback } } } = this.props
    HTAPI.CandidateEditSkills({ skills: selectedSkills }).then(response => {
    	ActionToast.show('保存成功')
        if (personalSkillsCallback) {
          personalSkillsCallback()
        }
        setTimeout(() => {
          navigation.goBack()
        }, 1000)
    })
  }

  renderTitle() {
    return (
      <View style={styles.titleView}>
        <Text style={styles.title}>拥有技能</Text>
        <Text style={styles.description}>最多选择5个, 被选中的标签将展示在简历详情</Text>
      </View>
    )
  }

  renderSelected() {
    const { selectedSkills } = this.state
    return (
      <View style={styles.selectedView}>
        <Text style={styles.selectedTitle}>已选</Text>
        <ScrollView horizontal={true}
          style={styles.selectedScrollview}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.selectedScrollviewContainer}
        >
          {selectedSkills.map((e: any, i: number) => {
            return (
              <View
                style={styles.selectedTagBtn}
                key={i.toString()}
              >
                <Text style={styles.selectedTagText}>
                  {e}
                </Text>
                <NextTouchableOpacity
                  style={styles.closeTagBtn}
                  onPress={() => {
                    // 删除标签
                    const nextSelectedSkills = []
                    // tslint:disable-next-line:prefer-for-of
                    for (let j = 0; j < selectedSkills.length; j++) {
                      if (selectedSkills[j] !== e) {
                        nextSelectedSkills.push(selectedSkills[j])
                      }
                    }
                    this.setState({ selectedSkills: nextSelectedSkills })
                  }}
                >
                  <Text style={styles.closeTagText}>x</Text>
                </NextTouchableOpacity>
              </View>
            )
          })
          }
        </ScrollView>
      </View>
    )
  }

  renderOptionalTags() {
    const { optionalTags, selectedSkills } = this.state
    return (
      <ScrollView style={styles.tagsScrollview}>
        {/* <Text style={styles.optionalViewTitle}>可选标签</Text>
        <View style={styles.optionalView}>
          {optionalTags.map((e: any, i: number) => {
            return (
              <NextTouchableOpacity
                style={styles.optionalViewBtn}
                key={i.toString()}
                onPress={() => {
                  this.setState({
                    selectedSkills: selectedSkills.concat(e)
                  })
                }}
              >
                <Text style={styles.optionalViewText}>{e}</Text>
              </NextTouchableOpacity>
            )
          })}
        </View> */}
        <NextTouchableOpacity
          style={styles.customBtn}
          onPress={() => {
            this.setState({
              addModalVisible: true
            })
          }}
        >
          <Text style={styles.customText}>+ 自定义</Text>
        </NextTouchableOpacity>
      </ScrollView>
    )
  }

  renderModalContent() {
    const { addText, selectedSkills } = this.state
    return (
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>输入标签, 不超过 6 个字</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.modalInput}
          placeholder="请输入"
          placeholderTextColor="rgba(32,33,38,0.3)"
          value={addText}
          maxLength={6}
          onChangeText={(value) => this.setState({ addText: value })}
        />
        <View style={styles.modalFooterView}>
          <NextTouchableOpacity
            onPress={() => {
              this.setState({ addModalVisible: false })
            }}
            style={styles.modalCancelBtn}>
            <Text style={styles.modalCancelText}>取消</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            onPress={() => {
              if (selectedSkills.includes(addText)) {
                this.setState({
                  addModalVisible: false,
                }, () => {
                  Toast.show('请勿添加重复的标签')
                })
              } else {
                selectedSkills.push(addText)
                this.setState({
                  addText: '',
                  addModalVisible: false,
                  selectedSkills
                })
              }
            }}
            style={styles.modalConfirmBtn}>
            <Text style={styles.modalConfirmText}>确认</Text>
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const { addModalVisible } = this.state
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          animated
          barStyle={'dark-content'}
        />
        {this.renderNavBar()}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {this.renderTitle()}
          {this.renderSelected()}
          {this.renderOptionalTags()}
        </ScrollView>
        <WhiteContentModal
          visible={addModalVisible}
          contextChildrenStyle={{ paddingBottom: 0 }}
          closeOnPress={() => this.setState({ addModalVisible: false })}
        >
          {this.renderModalContent()}
        </WhiteContentModal>
      </View>
    )
  }
}