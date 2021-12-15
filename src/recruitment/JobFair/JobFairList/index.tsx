import React, { useMemo, useRef, useState } from 'react'
import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import PagerView from 'react-native-pager-view'
import JobFairListPage from './Page'
import IconButton from '../../components/IconButton'
import TabBar from '../../components/TabBar'
import usePagerView from '../../hooks/usePagerView'
import NavBar from '../../components/NavBar'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

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

  const navigation = useNavigation<StackNavigationProp<any>>()

  return (
    <View style={styles.container}>
      <NavBar title="线下招聘会" />
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
          onPress={() => navigation.navigate('JobFairSearch')}
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
