import React, { useMemo, useRef, useState } from 'react'
import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import PagerView from 'react-native-pager-view'
import JobFairListPage from './Page'
import IconButton from '../../components/IconButton'
import TabBar from '../../components/TabBar'
import usePagerView from '../../hooks/usePagerView'

export const JobFairListOptions: StackNavigationOptions = {
  title: '线下招聘会',
}

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

const tabs = ['全部', '已报名']

export default function JobFairList() {
  const pagerRef = useRef<PagerView>(null)
  const {
    selectedIndex,
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
    onPageScroll,
    onPageSelected,
  } = usePagerView()

  return (
    <View style={styles.container}>
      <TabBar
        tabs={tabs}
        scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
        positionAnimatedValue={positionAnimatedValue}
        selectedIndex={selectedIndex}
        onTabPress={(index: number) =>
          pagerRef.current?.setPageWithoutAnimation(index)
        }>
        <IconButton
          style={styles.search}
          icon={require('./assets/search.png')}
        />
      </TabBar>
      <AnimatedPagerView
        ref={pagerRef}
        style={styles.pages}
        initialPage={selectedIndex}
        onPageScroll={onPageScroll}
        onPageSelected={onPageSelected}>
        {tabs.map((tab: string, index: number) => (
          <JobFairListPage key={tab} tab={tab} />
        ))}
      </AnimatedPagerView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  search: {
    position: 'absolute',
    right: 11,
  },
  pages: {
    flex: 1,
  },
})
