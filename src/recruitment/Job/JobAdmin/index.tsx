import React, { useMemo, useRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Animated,
  useWindowDimensions,
} from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import RadioLabel from '../../components/RadioLabel'
import PagerView, {
  PagerViewOnPageScrollEventData,
  PagerViewOnPageSelectedEventData,
} from 'react-native-pager-view'
import Page from './Page'

export const JobAdminOptions: StackNavigationOptions = {
  title: '职位管理',
}

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

const tabs = ['在线中', '审核中', '已下线']

export default function JobAdmin() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const ref = useRef<PagerView>(null)

  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current

  const { width } = useWindowDimensions()

  const inputRange = [0, tabs.length]
  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
  ).interpolate({
    inputRange,
    outputRange: [0, width],
  })

  const onPageScroll = useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: true,
        },
      ),
    [],
  )

  const onPageSelected = useMemo(
    () =>
      Animated.event<PagerViewOnPageSelectedEventData>(
        [{ nativeEvent: { position: positionAnimatedValue } }],
        {
          listener: ({ nativeEvent: { position } }) => {
            setSelectedIndex(position)
          },
          useNativeDriver: true,
        },
      ),
    [],
  )

  return (
    <View style={styles.container}>
      <View style={styles.tabbar}>
        {tabs.map((tab: string, index: number) => (
          <RadioLabel
            key={tab}
            style={styles.tab}
            inactiveStyle={styles.inactiveTab}
            text={tab}
            checked={selectedIndex === index}
            onPress={() => ref.current?.setPageWithoutAnimation(index)}
          />
        ))}
        <Animated.View
          style={[
            styles.indicatorContainer,
            { transform: [{ translateX: scrollX }] },
          ]}>
          <View style={styles.indicator}></View>
        </Animated.View>
      </View>
      <AnimatedPagerView
        ref={ref}
        style={styles.pages}
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
    color: '#7FDDA1',
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
  },
  inactiveTab: {
    color: '#333333',
    fontSize: 15,
    flex: 1,
  },
  indicatorContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '33.33%',
    height: 4,
    alignItems: 'center',
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
