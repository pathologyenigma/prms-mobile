import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import SearchBar from '../../components/SearchBar'
import IconLabelButton from '../../components/IconLabelButton'
import TextButton from '../../components/TextButton'
import IconButton from '../../components/IconButton'
import OnlineJobItem from './OnlineJobItem'
import NavBar from '../../components/NavBar'
import TalentPager from '../TalentList/TalentPager'
import { StackScreenProps } from '@react-navigation/stack'
import { TalentParamList } from '../typings'

const histories = ['产品经理', '德科科技有限公司']

export default function CandidateSearch({
  navigation,
}: StackScreenProps<TalentParamList, 'CandidateSearch'>) {
  const [searchValue, setSearchValue] = useState('')
  const handleSearchTextChange = useCallback((text: string) => {
    setSearchValue(text)
  }, [])
  const showSearchResult = !!searchValue

  return (
    <View style={styles.container}>
      <NavBar>
        <IconLabelButton
          style={styles.city}
          icon={require('./location.png')}
          label="深圳"
          onPress={() => navigation.navigate('CandidateSearchCity')}
        />
        <SearchBar
          placeholder="搜索职位/公司/学校"
          onChangeText={handleSearchTextChange}
        />
        <TextButton
          style={styles.cancel}
          title="取消"
          onPress={() => navigation.goBack()}
        />
      </NavBar>
      {!showSearchResult && (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>历史搜索</Text>
              <IconButton
                style={styles.clearHistoryButton}
                icon={require('./clear.png')}
              />
            </View>
            <View style={styles.sectionBody}>
              {histories.map(text => (
                <TextButton
                  style={styles.historyItem}
                  key={text}
                  title={text}
                />
              ))}
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>在线职位</Text>
            </View>
            <View style={styles.sectionBody}>
              <OnlineJobItem />
            </View>
          </View>
          {/* <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>热搜榜</Text>
          </View>
        </View> */}
        </ScrollView>
      )}
      {showSearchResult && (
        <View style={styles.container}>
          <TalentPager navigation={navigation} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  city: {
    marginLeft: 11,
    marginRight: 19,
  },
  cancel: {
    paddingHorizontal: 11,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  section: {
    marginHorizontal: 21,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  clearHistoryButton: {},
  sectionBody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  historyItem: {
    marginRight: 11,
    marginBottom: 11,
    height: 34,
    lineHeight: 34,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    color: '#666666',
    fontSize: 13,
    paddingHorizontal: 14,
  },
  filterbar: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
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
  filterButton: {
    marginRight: 11,
  },
})
