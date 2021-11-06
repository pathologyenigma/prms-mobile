import React from 'react'
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native'
import FilterButton from '../../components/FilterButton'
import RadioLabelGroup from '../../components/RadioLabelGroup'
import { headerHeight, navigationBarHeight } from '../../theme'
import NavBar from './NavBar'

export default function TalentList() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <NavBar />
      <View style={styles.filterbar}>
        <RadioLabelGroup
          style={styles.labelGroup}
          labelStyle={styles.labelStyle}
          labelInactiveStyle={styles.labelInactiveStyle}
          labelSpace={20}
          labels={['推荐', '最新']}
          checkedIndex={0}
        />
        <FilterButton text={'筛选'} style={styles.filterButton} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  filterButton: {
    marginRight: 11,
  },
  filterbar: {
    height: 40,
    flexDirection: 'row',
  },
  labelGroup: {
    flex: 1,
    paddingHorizontal: 10.5,
  },
  labelStyle: {
    color: '#7DDBA3',
    fontSize: 13,
    fontWeight: '500',
    // ios 垂直居中
    lineHeight: 40,
  },
  labelInactiveStyle: {
    color: '#666666',
    fontSize: 13,
    fontWeight: 'normal',
    lineHeight: 40,
  },
})
