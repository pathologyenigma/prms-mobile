import React, {
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
  useMemo,
} from 'react'
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
  scrollOffsetAnimatedValue: Animated.Value
  positionAnimatedValue: Animated.Value
  onTabPress?: (index: number) => void
  onTabsLayout?: (layouts: Array<Layout>) => void
  style?: StyleProp<ViewStyle>
  tabStyle?: StyleProp<ViewStyle>
  selectedTabStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  selectedLabelStyle?: StyleProp<TextStyle>
  indicatorStyle?: StyleProp<ViewStyle>
  tabSpacing?: number
}

export default function TabBar({
  scrollOffsetAnimatedValue,
  positionAnimatedValue,
  selectedIndex,
  onTabPress,
  onTabsLayout,
  tabs,
  children,
  style,
  tabSpacing = 18,
  tabStyle,
  selectedTabStyle,
  labelStyle,
  selectedLabelStyle,
  indicatorStyle,
}: PropsWithChildren<TabBarProps>) {
  const layouts = useRef<Array<Layout>>([]).current

  const indicatorWidth = getIndicatorWidth(indicatorStyle)
  const inputRange = useMemo(
    () => [...tabs.map((_, index) => index), tabs.length],
    [tabs],
  )
  const [outputRange, setOutputRange] = useState(
    inputRange.map(() => indicatorWidth / 2),
  )

  console.log('---------------TabBar-------------------')

  const onTabLayout = useCallback(
    (index: number, layout: Layout) => {
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
        console.log('---------------onTabLayout-------------------')
        setOutputRange(range)
        onTabsLayout?.(layouts)
      }
    },
    [onTabsLayout],
  )

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
        <Tab
          key={tab}
          title={tab}
          index={index}
          style={[tabStyle, { marginLeft: index === 0 ? 0 : tabSpacing }]}
          selectedStyle={selectedTabStyle}
          labelStyle={labelStyle}
          selectedLabelStyle={selectedLabelStyle}
          onTabLayout={onTabLayout}
          checked={selectedIndex === index}
          onPress={() => onTabPress?.(index)}
        />
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
  selectedStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  selectedLabelStyle?: StyleProp<TextStyle>
}

function Tab({
  title,
  checked,
  onPress,
  onTabLayout,
  index,
  style,
  selectedStyle,
  labelStyle,
  selectedLabelStyle,
}: TabProps) {
  const onLayout = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout
    onTabLayout?.(index, layout)
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[styles.tab, style, checked ? selectedStyle : undefined]}
        onLayout={onLayout}>
        <Text
          style={[
            [styles.label, labelStyle],
            checked ? [styles.selectedLabel, selectedLabelStyle] : undefined,
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
  selectedLabel: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
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
