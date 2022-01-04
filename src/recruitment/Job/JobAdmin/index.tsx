import React, { useRef } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import PagerView from 'react-native-pager-view'
import JobPage from './JobPage'
import usePagerView from '../../hooks/usePagerView'
import TabBar from '../../components/TabBar'
import NavBar from '../../components/NavBar'
import GradientButton from '../../components/GradientButton'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { JobStatus } from '../typing'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

const tabs = ['在线中', '审核中', '已下线']
const states: JobStatus[] = ['InRecruitment', 'NotPublishedYet', 'OffLine']

export default function JobAdmin() {
  const ref = useRef<PagerView>(null)
  const {
    selectedIndex,
    positionAnimatedValue,
    scrollOffsetAnimatedValue,
    onPageSelected,
    onPageScroll,
  } = usePagerView()

  const navigation = useNavigation<StackNavigationProp<any>>()

  return (
    <View style={styles.container}>
      <NavBar title="职位管理" />
      <TabBar
        tabs={tabs}
        selectedIndex={selectedIndex}
        positionAnimatedValue={positionAnimatedValue}
        scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
        onTabPress={index => ref.current?.setPage(index)}
        style={styles.tabbar}
        tabStyle={styles.tab}
        labelStyle={styles.tabText}
        tabSpacing={0}
        selectedLabelStyle={styles.selectedTabText}
        indicatorStyle={styles.indicator}
      />
      <AnimatedPagerView
        ref={ref}
        style={styles.pages}
        scrollEnabled={false}
        initialPage={selectedIndex}
        onPageScroll={onPageScroll}
        onPageSelected={onPageSelected}>
        {states.map((status: JobStatus, index: number) => (
          <JobPage
            key={status}
            status={status}
            isActive={index === selectedIndex}
          />
        ))}
      </AnimatedPagerView>
      <GradientButton
        style={styles.button}
        title="发布职位"
        onPress={() => navigation.navigate('PostJob')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabbar: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  tab: {
    flex: 1,
  },
  tabText: {
    color: '#333333',
    fontSize: 15,
  },
  selectedTabText: {
    color: '#7FDDA1',
    fontSize: 15,
    fontWeight: 'bold',
  },
  indicator: {
    backgroundColor: '#7FDDA1',
    borderRadius: 2,
    height: 4,
    width: 16,
  },
  pages: {
    flex: 1,
  },
  button: {
    marginBottom: isIphoneX() ? 37 : 8,
    marginHorizontal: 22,
    marginTop: 8,
  },
})
