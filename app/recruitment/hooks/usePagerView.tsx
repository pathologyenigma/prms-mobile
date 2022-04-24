import { useMemo, useRef, useState } from 'react'
import { Animated } from 'react-native'
import {
  PagerViewOnPageScrollEventData,
  PagerViewOnPageSelectedEventData,
} from 'react-native-pager-view'

export default function usePagerView(initialPage = 0) {
  const [selectedIndex, setSelectedIndex] = useState(initialPage)
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current
  const positionAnimatedValue = useRef(new Animated.Value(0)).current

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

  return {
    selectedIndex,
    onPageScroll,
    onPageSelected,
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
  }
}
