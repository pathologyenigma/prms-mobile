import React, { PropsWithChildren, useCallback, useRef, useState } from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  LayoutChangeEvent,
  TouchableWithoutFeedback,
} from 'react-native'

interface Layout {
  x: number
  y: number
  width: number
  height: number
}

interface TabBarProps {
  tabs: string[]
  selectedIndex: number
  onTabPress?: (index: number) => void
  scrollOffsetAnimatedValue: Animated.Value
  positionAnimatedValue: Animated.Value
  style?: StyleProp<ViewStyle>
  tabStyle?: StyleProp<ViewStyle>
  tabLabelStyle?: StyleProp<TextStyle>
  selelctedTabLabelStyle?: StyleProp<TextStyle>
  indicatorStyle?: StyleProp<ViewStyle>
  tabSpace?: number
}

export default function TabBar({
  scrollOffsetAnimatedValue,
  positionAnimatedValue,
  selectedIndex,
  onTabPress,
  tabs,
  children,
  style,
  tabStyle,
  tabLabelStyle,
  selelctedTabLabelStyle,
  indicatorStyle,
  tabSpace = 18,
}: PropsWithChildren<TabBarProps>) {
  const layouts = useRef<Array<Layout>>([]).current

  const indicatorWidth = getIndicatorWidth(indicatorStyle)
  const inputRange = [...tabs.map((_, index) => index), tabs.length]
  const [outputRange, setOutputRange] = useState(
    inputRange.map(() => indicatorWidth / 2),
  )

  const onTabLayout = useCallback((index: number, layout: Layout) => {
    layouts[index] = layout
    const frames = layouts.filter(layout => layout.width > 0)

    if (frames.length === tabs.length) {
      const range: Array<number> = []
      for (let index = 0; index < frames.length; index++) {
        const { x, width } = frames[index]
        range.push(x + width / 2 - indicatorWidth / 2)
        if (index === frames.length - 1) {
          range.push(x + width)
        }
      }
      setOutputRange(range)
    }
  }, [])

  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
  ).interpolate({
    inputRange,
    outputRange,
  })

  return (
    <View style={[styles.tabbar, style]}>
      {tabs.map((tab: string, index: number) => (
        <>
          <Tab
            key={tab}
            title={tab}
            index={index}
            style={tabStyle}
            textStyle={tabLabelStyle}
            selectedTextStyle={selelctedTabLabelStyle}
            onTabLayout={onTabLayout}
            checked={selectedIndex === index}
            onPress={() => onTabPress?.(index)}
          />
          <View
            key={tab + '-spacer'}
            style={{
              width: index < tabs.length - 1 ? tabSpace : 0,
              height: '100%',
            }}
          />
        </>
      ))}
      <Animated.View
        key={'indicator'}
        style={[
          styles.indicator,
          indicatorStyle,
          { transform: [{ translateX: scrollX }] },
        ]}></Animated.View>
      {children}
    </View>
  )
}

function getIndicatorWidth(indicatorStyle: StyleProp<ViewStyle>) {
  const { width } = StyleSheet.flatten([styles.indicator, indicatorStyle])
  if (typeof width === 'number') {
    return width
  }
  return 24
}

interface TabProps {
  title: string
  index: number
  checked?: boolean
  onPress?: () => void
  onTabLayout?: (index: number, layout: Layout) => void
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  selectedTextStyle?: StyleProp<TextStyle>
}

function Tab({
  title,
  checked,
  onPress,
  onTabLayout,
  index,
  style,
  textStyle,
  selectedTextStyle,
}: TabProps) {
  const onLayout = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout
    onTabLayout?.(index, layout)
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.tab, style]} onLayout={onLayout}>
        <Text
          style={[
            [styles.tabText, textStyle],
            checked ? [styles.selectedTabText, selectedTextStyle] : undefined,
          ]}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  tab: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 11,
  },
  selectedTabText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabText: {
    color: '#666666',
    fontSize: 16,
  },
  indicator: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 24,
    height: 6,
    backgroundColor: '#7FDDA1',
    borderRadius: 3,
  },
})
