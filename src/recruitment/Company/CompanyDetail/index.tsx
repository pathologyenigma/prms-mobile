import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageSourcePropType,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import NavBar from '../../components/NavBar'
import Rating from '../../components/Rating'
import Grading from './Grading'
import InterviewAssessment from './InterviewAssessment'
import TextButton from '../../components/TextButton'
import CompanyQA from './CompanyQA'
import styles from './styles'
import IconButton from '../../components/IconButton'
import MaskedView from '@react-native-community/masked-view'
import LinearGradient from 'react-native-linear-gradient'
import Pending from './Pending'
import { useNavigation } from '@react-navigation/native'

interface Time {
  icon: ImageSourcePropType
  label: string
}

const times: Time[] = [
  { icon: require('./assets/worktime.png'), label: '8:30-17：30' },
  { icon: require('./assets/tow_day.png'), label: '双休' },
  { icon: require('./assets/elastic.png'), label: '弹性工作' },
]

interface Boon {
  icon: ImageSourcePropType
  label: string
}

const boons: Boon[] = [
  { icon: require('./assets/insurance.png'), label: '五险一金' },
  { icon: require('./assets/bonus.png'), label: '年终奖' },
  { icon: require('./assets/food.png'), label: '餐补' },
  { icon: require('./assets/traffic.png'), label: '交通补助' },
]

interface Media {
  type: 'photo' | 'video'
  uri: string
  thumbnail: string
}

const medias: Media[] = [
  {
    type: 'video',
    uri: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    thumbnail:
      'https://search-operate.cdn.bcebos.com/166bf3b072119c9ce60cc33c551369bc.jpg',
  },
  {
    type: 'photo',
    uri: 'https://alifei03.cfp.cn/creative/vcg/veer/800/new/VCG41N113145561.jpg',
    thumbnail:
      'https://alifei03.cfp.cn/creative/vcg/veer/800/new/VCG41N113145561.jpg',
  },
  {
    type: 'photo',
    uri: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
    thumbnail:
      'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
  },
  {
    type: 'photo',
    uri: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cubui.com%2Fwp-content%2Fuploads%2F2018%2F01%2Freact-native-lesson.png&refer=http%3A%2F%2Fwww.cubui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638094787&t=3043e6ae76d0b9fc72c97f4a96d02ef5',
    thumbnail:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cubui.com%2Fwp-content%2Fuploads%2F2018%2F01%2Freact-native-lesson.png&refer=http%3A%2F%2Fwww.cubui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638094787&t=3043e6ae76d0b9fc72c97f4a96d02ef5',
  },
]

interface Recruiter {
  avatar: string
  name: string
  title: string
}

const recruiters: Recruiter[] = [
  {
    avatar: require('../../assets/avatar_default.png'),
    name: '江良华',
    title: '技术总监',
  },
  {
    avatar: require('../../assets/avatar_default.png'),
    name: '徐海燕',
    title: '运营总监兼人事总监',
  },
  {
    avatar: require('../../assets/avatar_default.png'),
    name: '黄小军',
    title: '招聘专员',
  },
]

export default function CompanyDetail() {
  const isPending = false
  const navigation = useNavigation<StackNavigationProp<any>>()

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <NavBar
          style={styles.navbar}
          barStyle="light-content"
          headerRight={() => (
            <TextButton
              title="切换公司"
              textStyle={{ color: '#FFFFFF', fontSize: 15 }}
              onPress={() => navigation.navigate('ChangeCompany')}
            />
          )}
        />

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}>
          <View style={styles.companyBasic}>
            <View>
              <View style={styles.companyName}>
                <Text style={styles.companyNameText}>深圳智慧网络有限公司</Text>
                <Image
                  style={styles.companyNameAccessary}
                  source={require('./assets/vip.png')}
                />
              </View>
              <Text style={styles.companyMeta}>
                不需要融资·0-20人·计算机软件
              </Text>
            </View>
            <Image
              style={styles.companyLogo}
              source={require('./assets/company_default.png')}
            />
          </View>
          <View style={styles.companyWorkTime}>
            {times.map(({ icon, label }) => (
              <View style={styles.companyWorkTimeItem} key={label}>
                <Image style={styles.companyWorkTimeItemIcon} source={icon} />
                <Text style={styles.companyWorkTimeItemLabel}>{label}</Text>
              </View>
            ))}
            <IconButton
              hitSlop={{ left: 20, top: 8, right: 20, bottom: 8 }}
              style={styles.companyWorkTimeIndicator}
              icon={require('./assets/indicator_white.png')}
            />
          </View>
          <ScrollView
            style={styles.companyWelfareScrollBar}
            contentContainerStyle={styles.companyWelfareScrollBarContent}
            showsHorizontalScrollIndicator={false}
            horizontal>
            {boons.map(({ icon, label }, index) => (
              <View
                style={[
                  styles.companyWelfareItem,
                  { marginLeft: index !== 0 ? 10 : 0 },
                ]}
                key={label}>
                <Image source={icon} />
                <Text style={styles.companyWelfareLabel}>{label}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>公司介绍</Text>
            <Text style={styles.companyIntro}>
              深圳智慧网络有限公司是一家新兴崛起的高科技企业，专为通信、互联网、电子商务、移动平台等领域的客户提供计算机软件技术的开发、测试、维护和咨询服务。总部位于环境优美、交通便捷的深圳科技园区内，在上海设有分公司
              {'...'}
              <Text suppressHighlighting style={styles.companyIntroMore}>
                查看展开
              </Text>
            </Text>
          </View>
          <View style={styles.companyAddressSection}>
            <Text style={styles.companyAddressSectionTitle}>公司地址</Text>
            <View style={styles.companyAddressSectionBody}>
              <Image source={require('./assets/dingwei.png')} />
              <Text style={styles.companyAddress}>深圳南山区智园D1栋18楼</Text>
              <Image
                style={styles.companyAddressIndicator}
                source={require('./assets/indicator.png')}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>公司相册</Text>
            <ScrollView
              style={styles.companyMedias}
              contentContainerStyle={styles.companyMediasContent}
              showsHorizontalScrollIndicator={false}
              horizontal>
              {medias.map(({ thumbnail, type }, index) => (
                <View
                  style={[
                    styles.companyMediaItem,
                    { marginLeft: index !== 0 ? 13 : 0 },
                  ]}
                  key={thumbnail}>
                  <Image
                    style={styles.companyMediaItemThumbnail}
                    source={{ uri: thumbnail }}
                  />
                  {type === 'video' && (
                    <Image
                      style={styles.companyMediaItemButton}
                      source={require('./assets/play.png')}
                    />
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>热门招聘官</Text>
            <ScrollView
              style={styles.recruiters}
              contentContainerStyle={styles.recruitersContent}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {recruiters.map(({ name, title }, index) => (
                <View
                  key={name}
                  style={[
                    styles.recruiter,
                    { marginLeft: index !== 0 ? 20 : 0 },
                  ]}>
                  <Image
                    style={styles.recruiterAvatar}
                    source={require('../../assets/avatar_default.png')}
                  />
                  <Text style={styles.recruiterName}>{name}</Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.recruiterTitle}>
                    {title}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>面试评价</Text>
            <View style={styles.interviewOverview}>
              <View style={styles.interviewRatingContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center',
                  }}>
                  <MaskedView
                    style={[
                      {
                        flex: 1,
                        width: 40,
                      },
                    ]}
                    maskElement={
                      <Text style={styles.interviewScore}>4.4</Text>
                    }>
                    <LinearGradient
                      style={{ flex: 1, height: '100%' }}
                      colors={['#FF6F6F', '#FC384B']}
                      locations={[0, 1.0]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    />
                  </MaskedView>
                  <Text style={styles.interviewScoreUnit}>分</Text>
                </View>
                <Rating style={styles.interviewRating} score={4} />
              </View>
              <View style={styles.interviewDivider}></View>
              <View style={styles.interviewGradings}>
                <Grading key="title" label="职位描述：" score={9} />
                <Grading key="company" label="公司情况：" score={9} />
                <Grading key="interviewer" label="面试官：" score={8} />
              </View>
            </View>
            <InterviewAssessment key="1" />
            <InterviewAssessment key="2" />
            <TextButton
              style={styles.interviewAssessmentButton}
              textStyle={styles.interviewAssessmentButtonText}
              title="全部33条面试评价"
              onPress={() => navigation.navigate('InterviewGrading')}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>公司问答</Text>
            <CompanyQA />
          </View>

          <View style={styles.hintContainer}>
            <Image source={require('./assets/alert.png')} />
            <Text style={styles.hint}>
              提示：如公司信息有误，请联系客服修改
            </Text>
          </View>
        </ScrollView>
        {isPending && <Pending />}
      </View>
    </View>
  )
}
