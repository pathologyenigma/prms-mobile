import React, { useRef } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import PagerView from 'react-native-pager-view'
import Page from './Page'
import usePagerView from '../../hooks/usePagerView'
import TabBar from '../../components/TabBar'

export const JobAdminOptions: StackNavigationOptions = {
  title: '职位管理',
}

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

const tabs = ['在线中', '审核中', '已下线']

export default function JobAdmin() {
  const ref = useRef<PagerView>(null)
  const {
    selectedIndex,
    positionAnimatedValue,
    scrollOffsetAnimatedValue,
    onPageSelected,
    onPageScroll,
  } = usePagerView()

  return (
    <View style={styles.container}>
      <TabBar
        tabs={tabs}
        selectedIndex={selectedIndex}
        positionAnimatedValue={positionAnimatedValue}
        scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
        onTabPress={index => ref.current?.setPageWithoutAnimation(index)}
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
        initialPage={selectedIndex}
        onPageScroll={onPageScroll}
        onPageSelected={onPageSelected}>
        {tabs.map((tab: string, index: number) => (
          <Page key={tab} tab={tab} />
        ))}
      </AnimatedPagerView>
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
})
