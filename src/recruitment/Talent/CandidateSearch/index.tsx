import React, { useState, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  ListRenderItem,
} from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import SearchBar from '../../components/SearchBar'
import { headerHeight, navigationBarHeight, statusBarHeight } from '../../theme'
import IconLabelButton from '../../components/IconLabelButton'
import TextButton from '../../components/TextButton'
import IconButton from '../../components/IconButton'
import OnlineJobItem from './OnlineJobItem'
import TalentListItem from '../TalentList/TalentListItem'

export const CandidateSearchOptions: StackNavigationOptions = {
  header: () => null,
}

const histories = ['产品经理', '德科科技有限公司']

export default function CandidateSearch() {
  const [searchValue, setSearchValue] = useState('')
  const handleSearchTextChange = useCallback((text: string) => {
    setSearchValue(text)
  }, [])

  const showSearchResult = !!searchValue

  const data = ['a', 'b']

  const renderSearchResultItem: ListRenderItem<string> = ({ index, item }) => {
    return <TalentListItem key={index} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.navbar}>
          <IconLabelButton
            style={styles.city}
            icon={require('./location.png')}
            label="深圳"
          />
          <SearchBar
            placeholder="搜索职位/公司/学校"
            onChangeText={handleSearchTextChange}
          />
          <TextButton style={styles.cancel} title="取消" />
        </View>
      </View>
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
        <FlatList
          contentContainerStyle={styles.content}
          data={data}
          keyExtractor={item => item}
          renderItem={renderSearchResultItem}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: headerHeight(),
    backgroundColor: '#FFFFFF',
  },
  navbar: {
    marginTop: statusBarHeight(),
    height: navigationBarHeight(),
    alignItems: 'center',
    flexDirection: 'row',
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
})
