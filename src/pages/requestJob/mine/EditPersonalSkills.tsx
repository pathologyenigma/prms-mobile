import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar, Platform } from 'react-native'
import styles from './styles/EditPersonalSkills.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { TextInput } from 'react-native-gesture-handler'
// import ImagePicker from 'react-native-image-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { editPersonalAdvantage } from '../../../action/mineAction'
import RootLoading from '../../../utils/rootLoading'

type IProps = GenProps<'EditPersonalSkills'> & {

}

interface IState {
  detail: any,
  optionalTags: any,
}

export default class EditPersonalSkills extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { route: { params: { personalSkills } } } = props
    this.state = {
      detail: personalSkills || [],
      optionalTags: ['物流产品', '策略产品', '网页唱片', '阿诗丹顿', '正擦是多长', '签到却无多', '阿萨德', '阿萨德', '阿下次', 'cascade', '啊实打实']
    }
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
          value: '保存',
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
    const { navigation, route: { params: { personalSkillsCallback } } } = this.props
    RootLoading.loading()
    editPersonalAdvantage(detail, (error) => {
      if (!error) {
        RootLoading.success('保存成功')
        if (personalSkillsCallback) {
          personalSkillsCallback()
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
        <Text style={styles.title}>拥有技能</Text>
        <Text style={styles.description}>最多选择5个, 被选中的标签将展示在简历详情</Text>
      </View>
    )
  }

  renderSelected() {
    const { detail } = this.state
    console.log('detail: ', detail)
    const aaa = ['aaa']
    aaa.unshift('bbb')
    console.log('aaa: ', aaa)
    return (
      <View style={styles.selectedView}>
        <Text style={styles.selectedTitle}>已选</Text>
        <ScrollView horizontal={true}
          style={styles.selectedScrollview}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.selectedScrollviewContainer}
        >
          {detail.map((e: any, i: number) => {
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
                    RootLoading.info('删除标签')
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
    const { optionalTags, detail } = this.state
    return (
      <ScrollView style={styles.tagsScrollview}>
        <Text style={styles.optionalViewTitle}>可选标签</Text>
        <View style={styles.optionalView}>
          {optionalTags.map((e: any, i: number) => {
            return (
              <NextTouchableOpacity
                style={styles.optionalViewBtn}
                key={i.toString()}
                onPress={() => {
                  this.setState({
                    detail: detail.concat(e)
                  })
                }}
              >
                <Text style={styles.optionalViewText}>{e}</Text>
              </NextTouchableOpacity>
            )
          })}
        </View>
        <NextTouchableOpacity style={styles.customBtn}>
          <Text style={styles.customText}>+ 自定义</Text>
        </NextTouchableOpacity>
      </ScrollView>
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
          {this.renderSelected()}
          {this.renderOptionalTags()}
        </ScrollView>
      </View>
    )
  }
}