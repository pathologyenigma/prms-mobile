import React, { Component } from 'react'
import {
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
  ScrollView,
  View,
  Text,
  ImageSourcePropType,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import styles from './styles/Mine.style'
import HTShadowView from '~/common/view/HTShadowView'
import { CommonActions } from '@react-navigation/native'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { connect } from 'react-redux'
import { reformDistanceYears, reformEducation } from '../../../utils/utils'

type IProps = GenProps<'Mine'> & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

type IState = {
  resumeProgress: any
}

export default class Mine extends Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      userInfo: {},
      resumeProgress: '--',
    }
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      HTAPI.UserGetBasicInfo().then(response => {
      	this.setState({ userInfo: response })
      })
      HTAPI.CandidateGetOnlineResumeGrade().then(response => {
      	this.setState({ resumeProgress: response })
      }, { showError: false })
      StatusBar.setBarStyle('light-content', true)
    })
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', () => { })
  }

  renderIconView() {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    const { userInfo } = this.state
    const { resumeProgress } = this.state
    return (
      <View style={styles.iconView}>
        <NextTouchableOpacity
          style={styles.avatarContainer}
          onPress={() => {
            const { navigation } = this.props
            navigation.push('UserInfo')
          }}>
          <CacheImage style={styles.avatar} source={userInfo.image_url ? { uri: userInfo.image_url } : require('~/assets/requestJobs/mine_avatar.png')} />
          <View style={styles.gender}>
	          <Image
	            source={require('~/assets/requestJobs/mine_header_gender.png')}
	          />
          </View>
        </NextTouchableOpacity>
        <View style={styles.nameView}>
          <Text style={styles.nameTitle}>{userInfo.username}</Text>
          <Text style={styles.detailInfo}>
            {
              `${userInfo.first_time_working ? `工作${reformDistanceYears(userInfo.first_time_working)}年` : ''}${userInfo.birth_date ? `/${reformDistanceYears(userInfo.birth_date)}岁` : ''}${userInfo.education ? `/${reformEducation(userInfo.birth_date)}` : ''}`
            }
          </Text>
          {/* <Text style={styles.detailInfo}>工作4年/27岁/本科</Text> */}
        </View>
        <LinearGradient
          start={start}
          end={end}
          colors={['#2A2420', '#443A35', '#2F2925']}
          style={styles.onlineJianliView}>
          <NextTouchableOpacity
            onPress={() => {
              const { navigation } = this.props
              navigation.push('EditOnlineResume', {
                isPreview: false
              })
            }}>
            <View style={styles.onlineJianliTop}>
              <Text style={styles.onlineJianli}>在线简历</Text>
              <Image
                style={styles.yellowRight}
                source={require('../../../assets/requestJobs/chakan.png')}
              />
            </View>
            <Text style={styles.onlineText}>{`完善度${resumeProgress}%`}</Text>
          </NextTouchableOpacity>
        </LinearGradient>
      </View>
    )
  }

  renderDetailInfo() {
    const { navigation } = this.props
    let itemList = [
    	{ title: '5', detail: '面试', pageName: 'Interview' },
    	{ title: '105', detail: '投递', pageName: 'Delivery', pageOptionList: { pageType: 1 } },
    	{ title: '1333', detail: '浏览', pageName: 'Delivery', pageOptionList: { pageType: 2 } },
    	{ title: '4', detail: '收藏', pageName: 'MyCollection'},
    	{ title: '1', detail: '关注', pageName: 'MyFocus'},
    ]
    return (
      <View style={styles.detailInfoView}>
      	{
      		itemList.map((item, index) => {
      			return (
      				<NextTouchableOpacity
      				  key={index}
			          onPress={() => {
			            navigation.push(item.pageName, item.pageOptionList)
			          }}
			          style={styles.detailInfoItem}>
			          <Text style={styles.detailInfoValue}>{item.title}</Text>
			          <Text style={styles.detailInfoTag}>{item.detail}</Text>
			        </NextTouchableOpacity>
      			)
      		})
      	}
      </View>
    )
  }

  renderNavBar() {
  	const BACKGROUND_IMAGE = require('~/assets/requestJobs/me-beijing.png')
	const BACKGROUND_SIZE = Image.resolveAssetSource(BACKGROUND_IMAGE)
	const BACKGROUND_SCALE = (SCREEN_WIDTH) / BACKGROUND_SIZE.width
    return (
      <ImageBackground
        style={[styles.topImage, { width: SCREEN_WIDTH, height: BACKGROUND_SIZE.height * BACKGROUND_SCALE }]}
        resizeMode="cover"
        source={BACKGROUND_IMAGE}>
        {/* <NextTouchableOpacity
          style={styles.scanBtn}
        >
          <Image
            style={styles.scanImage}
            source={require('../../../assets/requestJobs/saoyisao.png')}
          />
        </NextTouchableOpacity> */}
        {this.renderIconView()}
        <View style={CONTAINER}></View>
        {this.renderDetailInfo()}
      </ImageBackground>
    )
  }

  renderJianliView() {
  	let itemList = [
  		{ title: '简历刷新', image: require('~/assets/requestJobs/jianlishuaxin.png') },
  		{ title: '简历置顶', image: require('~/assets/requestJobs/jianlizhiding.png') },
  		{ title: '简历优化', image: require('~/assets/requestJobs/jianliyouhua.png') },
  		{ title: '简历模板', image: require('~/assets/requestJobs/jianlimoban.png') },
  		{ title: '简历投递', image: require('~/assets/requestJobs/jianlitoudi.png') },
  		{ title: '职位咨询', image: require('~/assets/requestJobs/zhiweizhixun.png') },
  	]
    return (
      <HTShadowView style={styles.jianliViewContainer}>
      {
      	itemList.map((item, index) => {
      		return (
      			<NextTouchableOpacity
      			    key={index}
		            style={styles.jianliItem}
		            onPress={() => {
		              Toast.show('暂未开放')
		            }}
		          >
		            <Image
		              style={styles.jianliIcon}
		              source={item.image}
		            />
		            <Text style={styles.jianliTag}>{item.title}</Text>
		          </NextTouchableOpacity>
      		)
      	})
      }
      </HTShadowView>
    )
  }

  renderAdImage() {
  	let image = { uri: 'https://img.freepik.com/free-vector/summer-beach-background-sandy-seashore-sea-coast-with-palm-tree-vocation-seaside-travel-cartoon-backdrop-illustration_102902-1407.jpg?w=1800' }
    return (
    	<CacheImage style={styles.adImage} source={image} />
    )
  }

  renderMyStudy() {
  	let itemList = [
  		{ image: 'https://img.freepik.com/free-vector/countryside-landscape-illustration-concept_23-2148655700.jpg?t=st=1648112788~exp=1648113388~hmac=e14bb13e7722ebbc487280fb15fc0683b686a681dfae0c0261246bbef49fb107&w=1480' },
  		{ image: 'https://img.freepik.com/free-vector/flat-design-spring-landscape_23-2148851204.jpg?t=st=1648112788~exp=1648113388~hmac=301de119a4ba18b874f1a73236cc322cd1eed9f30e1bb75d929ace4d995d012d&w=1480' },
  		{ image: 'https://img.freepik.com/free-vector/gradient-winter-landscape_52683-77081.jpg?t=st=1648112788~exp=1648113388~hmac=b37119cb241cf147709525e516273e18778fb6d3a24f6e116e0835a0a0c0b317&w=1480' },
  	].sort(() => Math.random() - 0.5)
    return (
      <View style={styles.myStudyContainer}>
        <View style={styles.myStudyView}>
          <Text style={styles.myStudy}>我的学习</Text>
          <View style={styles.moreTextView}>
            <Text style={styles.moreText}>更多</Text>
            <Image
              source={require('../../../assets/requestJobs/item_more.png')}
            />
          </View>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.studyView}>
          {
          	itemList.map((item, index) => {
          		return (
          			<NextTouchableOpacity key={index}>
          				<CacheImage style={styles.studyItem} source={{ uri: item.image }} />
          			</NextTouchableOpacity>
          		)
          	})
          }
        </ScrollView>
      </View>
    )
  }

  renderOtherCell(
    icon: ImageSourcePropType,
    title: string,
    onPress: () => void,
  ) {
    return (
      <NextTouchableOpacity
        style={styles.cellItem}
        key={title.toString()}
        onPress={() => {
          if (onPress) {
            onPress()
          }
        }}>
        <Image resizeMode="contain" style={styles.leftArrow} source={icon} />
        <Text style={styles.otherTitle}>{title}</Text>
        <Image
          source={require('~/assets/requestJobs/item_more.png')}
        />
      </NextTouchableOpacity>
    )
  }

  renderOther() {
    let itemList = [
    	{ title: '附件简历', image: require('~/assets/requestJobs/jianli.png') },
    	{ title: '隐私设置', image: require('~/assets/requestJobs/privacy.png') },
    	{ title: '我的钱包', image: require('~/assets/requestJobs/wallet.png') },
    	{ title: '我的关注', image: require('~/assets/requestJobs/wodeguanzhu.png') },
    	{ title: '切换身份', image: require('~/assets/requestJobs/change-role.png') },
    	{ title: '反馈与帮助', image: require('~/assets/requestJobs/feedback.png') },
    	{ title: '关于', image: require('~/assets/requestJobs/about.png') },
    	{ title: '设置', image: require('~/assets/requestJobs/setting.png') },
    ]
    const { navigation } = this.props
    return (
      <View>
      	<Text style={styles.sectionOtherTitle}>其他</Text>
        {itemList.map((item, index) => {
          {
            return this.renderOtherCell(
              itemList[index].image,
              itemList[index].title,
              () => {
                switch (item.title) {
                  case '附件简历':
                    // navigation.push('AttachedResume')
                    Toast.show('暂未开放')
                    break
                  case '隐私设置':
                    navigation.push('PrivacySetting')
                    break
                  case '我的钱包':
                    Toast.show('暂未开放')
                    // navigation.push('MyWallet')
                    break
                  case '切换身份':
                    navigation.push('ChooseRole')
                    break
                  case '反馈与帮助':
                    navigation.push('FeedbackAndHelp')
                    break
                  case '关于':
                    navigation.push('About')
                    break
                  case '设置':
                    navigation.push('Setting')
                    break
                  default:
                    Toast.show('敬请期待')
                    break
                }
              },
            )
          }
        })}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} barStyle={'light-content'} animated />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
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

