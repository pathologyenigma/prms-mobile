import React from 'react'
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native'
import FilterButton from '../../components/FilterButton'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import RadioLabelGroup from '../../components/RadioLabelGroup'
import NavBar from './NavBar'
import NoMoreFooter from './NoMoreFooter'
import TalentListItem from './TalentListItem'
import UpgradeFeature from './UpgradeFeature'

export default function TalentList() {
  const data = ['a', 'b']

  const renderItem: ListRenderItem<string> = ({ index, item }) => {
    return <TalentListItem key={index} />
  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle={'light-content'} />
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
      <FlatList
        data={data}
        keyExtractor={item => item}
        renderItem={renderItem}
        ListHeaderComponent={UpgradeFeature}
        ListFooterComponent={NoMoreFooter}
      />
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
