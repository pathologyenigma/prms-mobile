import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, View, StyleSheet } from 'react-native'
import PagerView from 'react-native-pager-view'
import FilterButton from '../../components/FilterButton'
import RadioGroup from '../../components/RadioGroup'
import RadioLabel from '../../components/RadioLabel'
import usePagerView from '../../hooks/usePagerView'
import { TalentParamList } from '../typings'
import TalentPage from './TalentPage'

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

interface SortItem {
  label: string
  value: boolean
}

const sorts: SortItem[] = [
  {
    label: '推荐',
    value: false,
  },
  {
    label: '最新',
    value: true,
  },
]

interface TalentPagerProps {
  navigation: StackNavigationProp<TalentParamList>
  jobName?: string
}

export default function TalentPager({ navigation, jobName }: TalentPagerProps) {
  const [sortByUpdatedTime, setSortByUpdatedTime] = useState(false)
  const ref = useRef<PagerView>(null)
  const { selectedIndex, onPageSelected, onPageScroll } = usePagerView()

  useEffect(() => {
    ref.current?.setPageWithoutAnimation(sortByUpdatedTime ? 1 : 0)
  }, [sortByUpdatedTime])

  return (
    <>
      <View style={styles.filterbar}>
        <RadioGroup
          value={sortByUpdatedTime}
          onValueChecked={value => setSortByUpdatedTime(value)}>
          <View style={styles.labelGroup}>
            {sorts.map(({ label, value }) => (
              <RadioLabel
                key={label}
                label={label}
                value={value}
                style={styles.labelStyle}
                checkedStyle={styles.checkedLabelStyle}
              />
            ))}
          </View>
        </RadioGroup>
        <FilterButton
          text={'筛选'}
          style={styles.filterButton}
          onPress={() => navigation.navigate('CandidateFilter', {})}
        />
      </View>
      <AnimatedPagerView
        ref={ref}
        style={styles.container}
        scrollEnabled={false}
        initialPage={selectedIndex}
        onPageScroll={onPageScroll}
        onPageSelected={onPageSelected}>
        {sorts.map((status: SortItem, index: number) => (
          <TalentPage
            key={status.label}
            jobName={jobName}
            sortByUpdatedTime={status.value}
          />
        ))}
      </AnimatedPagerView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterButton: {
    marginRight: 11,
  },
  filterbar: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
  },
  labelGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  checkedLabelStyle: {
    color: '#7DDBA3',
    fontSize: 13,
    fontWeight: 'bold',
    // ios 垂直居中
    lineHeight: 40,
  },
  labelStyle: {
    color: '#666666',
    fontSize: 13,
    fontWeight: 'normal',
    lineHeight: 40,
    paddingHorizontal: 11,
  },
})
