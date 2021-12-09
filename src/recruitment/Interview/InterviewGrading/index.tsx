import React, { useRef } from 'react'
import { StyleSheet, View, ScrollView, Animated } from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import NavBar from '../../components/NavBar'
import Dashboard from './Dashboard'
import TabBar from '../../components/TabBar'
import usePagerView from '../../hooks/usePagerView'
import PagerView from 'react-native-pager-view'
import GradingPage from './GradingPage'
import useScrollBar from '../../hooks/useScrollBar'

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

export const InterviewGradingOptions: StackNavigationOptions = {
  title: '页面模版',
  headerShown: false,
}

const tabs = [
  '技术',
  '产品',
  '设计',
  '运营',
  '市场',
  '职能',
  '招商',
  '总经办',
  '其它',
]

export default function InterviewGrading() {
  const pagerRef = useRef<PagerView>()
  const {
    selectedIndex,
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
    onPageScroll,
    onPageSelected,
  } = usePagerView(0)

  const scrollRef = useRef<ScrollView>(null)

  const { onContentSizeChange, onLayout, onTabsLayout } = useScrollBar(
    selectedIndex,
    scrollRef,
  )

  return (
    <View style={styles.container}>
      <NavBar title="面试评价" />
      <Dashboard />
      <View style={styles.divider}></View>
      <View>
        <ScrollView
          ref={scrollRef}
          style={styles.scrollbar}
          horizontal
          onContentSizeChange={onContentSizeChange}
          onLayout={onLayout}
          bounces={false}
          showsHorizontalScrollIndicator={false}>
          <TabBar
            style={styles.tabbar}
            tabs={tabs}
            tabSpacing={11}
            tabStyle={styles.tabStyle}
            selectedTabStyle={styles.selectedTabStyle}
            labelStyle={styles.labelStyle}
            selectedLabelStyle={styles.selectedLabelStyle}
            indicatorStyle={styles.indicatorStyle}
            selectedIndex={selectedIndex}
            scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
            positionAnimatedValue={positionAnimatedValue}
            onTabPress={index => pagerRef.current?.setPage(index)}
            onTabsLayout={onTabsLayout}
          />
        </ScrollView>
      </View>
      <AnimatedPagerView
        ref={pagerRef}
        style={styles.pages}
        onPageScroll={onPageScroll}
        onPageSelected={onPageSelected}>
        {tabs.map((tab: string, index: number) => (
          <GradingPage key={tab} tab={tab} />
        ))}
      </AnimatedPagerView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    height: 5,
    width: '100%',
    backgroundColor: '#F8F8F8',
  },
  tabbar: {
    paddingHorizontal: 11,
  },
  tabStyle: {
    backgroundColor: '#F4F4F4',
    borderRadius: 4,
    height: 32,
    paddingHorizontal: 16,
  },
  selectedTabStyle: {
    backgroundColor: '#54D693',
  },
  labelStyle: {
    color: '#666666',
    fontSize: 13,
    fontWeight: 'normal',
  },
  selectedLabelStyle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'normal',
  },
  indicatorStyle: {
    backgroundColor: 'transparent',
  },
  scrollbar: {
    height: 44,
  },
  pages: {
    flex: 1,
  },
})
