import { useCallback, useEffect, useRef, useState } from 'react'
import { LayoutChangeEvent, ScrollView } from 'react-native'

interface Layout {
  x: number
  y: number
  width: number
  height: number
}

export default function useScrollBar(
  selectedIndex: number,
  scrollRef: React.RefObject<ScrollView>,
) {
  const [tabLayouts, setTabLayouts] = useState<Array<Layout>>([])

  const onTabsLayout = useCallback((layouts: Array<Layout>) => {
    setTabLayouts(layouts)
  }, [])

  const contentWidth = useRef(0)
  const tabbarWidth = useRef(0)

  const onContentSizeChange = useCallback((w: number) => {
    contentWidth.current = w
  }, [])

  const onLayout = useCallback(
    ({
      nativeEvent: {
        layout: { width },
      },
    }: LayoutChangeEvent) => {
      tabbarWidth.current = width
    },
    [],
  )

  useEffect(() => {
    if (tabLayouts.length - 1 < selectedIndex) {
      return
    }
    // 计算 tab 中心到 tabbar 中心的距离
    const tabLayout = tabLayouts[selectedIndex]
    const dx = tabLayout.x + tabLayout.width / 2 - tabbarWidth.current / 2
    // 计算最大可滚动距离
    const dw = contentWidth.current - tabbarWidth.current
    const x = Math.min(Math.max(0, dx), Math.max(0, dw))
    scrollRef.current?.scrollTo({ x: x })
  }, [selectedIndex, tabLayouts])

  return {
    onTabsLayout,
    onContentSizeChange,
    onLayout,
  }
}
