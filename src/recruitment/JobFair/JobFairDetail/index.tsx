import React, { useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Animated,
} from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import NavBar from '../../components/NavBar'
import IconButton from '../../components/IconButton'
import TabBar from '../../components/TabBar'
import usePagerView from '../../hooks/usePagerView'
import PagerView from 'react-native-pager-view'
import Company from './Company'
import QandA from './QandA'
import DetailWebView from './DetailWebView'

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

export const JobFairDetailOptions: StackNavigationOptions = {
  title: '页面模版',
  headerShown: false,
}

export default function JobFairDetail() {
  const tabs = ['招聘会详情', '参与企业', '招聘会问答']
  const pagerRef = useRef<PagerView>()

  const {
    selectedIndex,
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
    onPageScroll,
    onPageSelected,
  } = usePagerView(0)

  return (
    <View style={styles.container}>
      <NavBar
        title="线下招聘会"
        headerRight={() => (
          <IconButton icon={require('../../assets/share.png')} />
        )}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        <Image style={styles.banner} source={require('./assets/banner.png')} />
        <Text style={styles.title}>2021年宝安区“就业365”秋季线上招聘会</Text>
        <View style={styles.timeRow}>
          <Image source={require('./assets/shijian.png')} />
          <Text style={styles.time}>2021.09.20 8:00-2021.09.31 18:30</Text>
        </View>
        <Text style={styles.sponsor}>主办方：宝安区就业促进中心</Text>
        <Text style={styles.organizer}>协办方：宝安区人才市场联合协会</Text>
        <Text style={styles.organizer}>
          承办方：深圳市南方工厂创业文化有限公司
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.meta}>
            <Image source={require('./assets/qiye.png')} />
            <Text style={styles.metaText}>招聘岗位：1000个</Text>
          </View>
          <View style={styles.meta}>
            <Image source={require('./assets/renyuan.png')} />
            <Text style={styles.metaText}>求职者：1000人</Text>
          </View>
        </View>
        <View style={styles.addressRow}>
          <Image
            style={styles.addressIcon}
            source={require('./assets/dizhi.png')}
          />
          <Text style={styles.addressTitle}>招聘会地址</Text>
        </View>
        <Text style={styles.address}>
          深圳市南山区创智云城（建设中）创智云城A2栋8楼
        </Text>
        <View style={styles.map}></View>
        <View style={styles.tabs}>
          <TabBar
            style={styles.tabbar}
            tabStyle={styles.tab}
            tabSpace={0}
            tabs={tabs}
            selectedIndex={selectedIndex}
            scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
            positionAnimatedValue={positionAnimatedValue}
            onTabPress={index =>
              pagerRef.current?.setPageWithoutAnimation(index)
            }
          />
          <AnimatedPagerView
            ref={pagerRef}
            style={styles.pages}
            onPageScroll={onPageScroll}
            onPageSelected={onPageSelected}>
            <DetailWebView key="招聘会详情" />
            <Company key="参与企业" />
            <QandA key="招聘会问答" />
          </AnimatedPagerView>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  banner: {
    width: '100%',
    height: 180,
  },
  title: {
    color: '#333333',
    fontSize: 19,
    fontWeight: 'bold',
    lineHeight: 23,
    marginLeft: 11,
    marginRight: 28,
    marginTop: 11,
  },
  timeRow: {
    flexDirection: 'row',
    marginHorizontal: 11,
    marginTop: 24,
    alignItems: 'center',
  },
  time: {
    color: '#666666',
    fontSize: 12,
    marginLeft: 4,
  },
  sponsor: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    marginHorizontal: 11,
  },
  organizer: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginHorizontal: 11,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 11,
    justifyContent: 'space-between',
  },
  meta: {
    flexDirection: 'row',
  },
  metaText: {
    marginLeft: 12,
    color: '#666666',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addressRow: {
    flexDirection: 'row',
    marginHorizontal: 11,
    marginTop: 24,
    alignItems: 'center',
  },
  addressIcon: {},
  addressTitle: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  address: {
    marginTop: 10,
    color: '#666666',
    fontSize: 12,
    marginHorizontal: 11,
  },
  map: {
    borderRadius: 4,
    height: 80,
    marginTop: 13,
    marginHorizontal: 11,
    backgroundColor: '#FF0000',
  },
  tabs: {
    flex: 1,
  },
  tabbar: {
    paddingHorizontal: 11,
    justifyContent: 'space-between',
    marginVertical: 11,
  },
  tab: {
    paddingHorizontal: 0,
  },
  pages: {
    flex: 1,
  },
})
