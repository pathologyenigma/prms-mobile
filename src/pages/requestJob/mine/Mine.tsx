import React, { Component } from 'react'
import { SafeAreaView, StatusBar, ImageBackground, Image, ScrollView, View, Text, ImageSourcePropType } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import styles from './styles/Mine.style'
import RootLoading from '../../../utils/rootLoading'
import AsyncStorage from "@react-native-community/async-storage";
import { CommonActions } from '@react-navigation/native';
import { GenProps } from '../../../navigator/requestJob/stack'

type IProps = GenProps<'Mine'> & {

}

type IState = {

}

export default class Mine extends Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    console.log('props: ', props)
    this.state = {

    }
  }

  componentDidMount() {
    this.loadData()
    this.props.navigation.addListener('focus', () => {
      StatusBar.setBarStyle('light-content', true)
    })
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', () => { })
  }

  loadData() {

  }

  renderIconView() {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    return (
      <View style={styles.iconView}>
        <NextTouchableOpacity
          style={styles.avatar}
          onPress={() => {
            const { navigation } = this.props
            navigation.push('UserInfo')
          }}
        >
          <Image
            style={styles.gender}
            source={require('../../../assets/requestJobs/women-icon.png')}
          />
        </NextTouchableOpacity>
        <View style={styles.nameView}>
          <Text style={styles.nameTitle}>
            李小冉
          </Text>
          <Text style={styles.detailInfo}>
            工作4年/27岁/本科
          </Text>
        </View>
        <LinearGradient
          start={start}
          end={end}
          colors={['#2A2420', '#443A35', '#2F2925']}
          style={styles.onlineJianliView}
        >
          <NextTouchableOpacity
            onPress={() => {
              const { navigation } = this.props
              navigation.push('EditOnlineResume')
            }}
          >
            <View style={styles.onlineJianliTop}>
              <Text style={styles.onlineJianli}>在线简历</Text>
              <Image
                style={styles.yellowRight}
                source={require('../../../assets/requestJobs/chakan.png')}
              />
            </View>
            <Text style={styles.onlineText}>完善度90%</Text>
          </NextTouchableOpacity>
        </LinearGradient>
      </View>
    )
  }

  renderDetailInfo() {
    const { navigation } = this.props
    return (
      <View style={styles.detailInfoView}>
        <NextTouchableOpacity
          onPress={() => {
            navigation.push('Interview')
          }}
          style={styles.detailInfoItem}>
          <Text style={styles.detailInfoValue}>5</Text>
          <Text style={styles.detailInfoTag}>面试</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          onPress={() => {
            navigation.push('Delivery', { pageType: 1 })
          }}
          style={styles.detailInfoItem}>
          <Text style={styles.detailInfoValue}>105</Text>
          <Text style={styles.detailInfoTag}>投递</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          onPress={() => {
            navigation.push('Delivery', { pageType: 2 })
          }}
          style={styles.detailInfoItem}>
          <Text style={styles.detailInfoValue}>1333</Text>
          <Text style={styles.detailInfoTag}>浏览</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          onPress={() => {
            navigation.push('MyCollection')
          }}
          style={styles.detailInfoItem}>
          <Text style={styles.detailInfoValue}>4</Text>
          <Text style={styles.detailInfoTag}>收藏</Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          onPress={() => {
            navigation.push('MyFocus')
          }}
          style={styles.detailInfoItem}>
          <Text style={styles.detailInfoValue}>1</Text>
          <Text style={styles.detailInfoTag}>关注</Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  renderNavBar() {
    return (
      <ImageBackground
        style={styles.topImage}
        resizeMode="cover"
        source={require('../../../assets/requestJobs/me-beijing.png')}
      >
        {/* <NextTouchableOpacity
          style={styles.scanBtn}
        >
          <Image
            style={styles.scanImage}
            source={require('../../../assets/requestJobs/saoyisao.png')}
          />
        </NextTouchableOpacity> */}
        {this.renderIconView()}
        {this.renderDetailInfo()}
      </ImageBackground>
    )
  }

  renderJianliView() {
    return (
      <View style={styles.jianliViewContainer}>
        <View style={styles.jianliView}>
          <View style={styles.jianliItem}>
            <Image
              style={styles.jianliIcon}
              source={require('../../../assets/requestJobs/jianlishuaxin.png')}
            />
            <Text style={styles.jianliTag}>简历刷新</Text>
          </View>
          <View style={styles.jianliItem}>
            <Image
              style={styles.jianliIcon}
              source={require('../../../assets/requestJobs/jianlizhiding.png')}
            />
            <Text style={styles.jianliTag}>简历置顶</Text>
          </View>
          <View style={styles.jianliItem}>
            <Image
              style={styles.jianliIcon}
              source={require('../../../assets/requestJobs/jianliyouhua.png')}
            />
            <Text style={styles.jianliTag}>简历优化</Text>
          </View>
        </View>
        <View style={styles.jianliView}>
          <View style={styles.jianliItem}>
            <Image
              style={styles.jianliIcon}
              source={require('../../../assets/requestJobs/jianlimoban.png')}
            />
            <Text style={styles.jianliTag}>简历模板</Text>
          </View>
          <View style={styles.jianliItem}>
            <Image
              style={styles.jianliIcon}
              source={require('../../../assets/requestJobs/jianlitoudi.png')}
            />
            <Text style={styles.jianliTag}>简历投递</Text>
          </View>
          <View style={styles.jianliItem}>
            <Image
              style={styles.jianliIcon}
              source={require('../../../assets/requestJobs/zhiweizhixun.png')}
            />
            <Text style={styles.jianliTag}>职位咨询</Text>
          </View>
        </View>
      </View>
    )
  }

  renderAdImage() {
    return (
      <View style={styles.adImage} />
    )
  }

  renderMyStudy() {
    return (
      <View style={styles.myStudyContainer}>
        <View style={styles.myStudyView}>
          <Text style={styles.myStudy}>我的学习</Text>
          <View style={styles.moreTextView}>
            <Text style={styles.moreText}>更多</Text>
            <Image
              style={styles.rightArrow}
              source={require('../../../assets/requestJobs/next-gray.png')}
            />
          </View>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.studyView}>
          <NextTouchableOpacity style={styles.studyItem} />
          <NextTouchableOpacity style={styles.studyItem} />
          <NextTouchableOpacity style={styles.studyItem} />
        </ScrollView>
      </View>
    )
  }

  renderOtherCell(
    icon: ImageSourcePropType,
    title: string,
    onPress: () => void
  ) {
    return (
      <NextTouchableOpacity
        style={styles.cellItem}
        key={title.toString()}
        onPress={() => {
          if (onPress) {
            onPress()
          }
        }}
      >
        <View style={styles.titleView}>
          <Image
            resizeMode="contain"
            style={styles.leftArrow}
            source={icon}
          />
          <Text style={styles.otherTitle}>{title}</Text>
        </View>
        <Image
          style={styles.rightArrow}
          source={require('../../../assets/requestJobs/next-gray.png')}
        />
      </NextTouchableOpacity>
    )
  }

  renderOther() {
    const imageSource = [
      require('../../../assets/requestJobs/jianli.png'),
      require('../../../assets/requestJobs/privacy.png'),
      require('../../../assets/requestJobs/wallet.png'),
      require('../../../assets/requestJobs/wodeguanzhu.png'),
      require('../../../assets/requestJobs/change-role.png'),
      require('../../../assets/requestJobs/feedback.png'),
      require('../../../assets/requestJobs/about.png'),
      require('../../../assets/requestJobs/setting.png'),
    ]
    const titleArray = ['附件简历', '隐私设置', '我的钱包', '我的关注', '切换身份', '反馈与帮助', '关于', '设置']
    const { navigation } = this.props
    return (
      <View>
        {titleArray.map((item, index) => {
          {
            return (
              this.renderOtherCell(
                imageSource[index],
                titleArray[index],
                () => {
                  switch (item) {
                    case '附件简历':
                      navigation.push('AttachedResume')
                      break;
                    case '隐私设置':
                      navigation.push('PrivacySetting')
                      break;
                    case '我的钱包':
                      navigation.push('MyWallet')
                      break;
                    case '切换身份':
                      navigation.push('ChooseRole')
                      break;
                    case '反馈与帮助':
                      navigation.push('FeedbackAndHelp')
                      break;
                    case '关于':
                      navigation.push('About')
                      break;
                    case '设置':
                      navigation.push('Setting')
                      break;
                    default:
                      RootLoading.info('敬请期待')
                      break;
                  }
                }
              )
            )
          }
        })}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          barStyle={'light-content'}
          animated />
        <ScrollView>
          {this.renderNavBar()}
          {this.renderJianliView()}
          {this.renderAdImage()}
          {this.renderMyStudy()}
          {this.renderOther()}
        </ScrollView>
      </View>
    )
  }
}
