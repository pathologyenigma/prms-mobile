import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack'
import { headerHeight, navigationBarHeight, statusBarHeight } from '../../theme'
import SearchBar from '../../components/SearchBar'
import TextButton from '../../components/TextButton'
import { useNavigation } from '@react-navigation/native'
import NavBar from '../../components/NavBar'
import IconButton from '../../components/IconButton'
import { ListRenderItem } from 'react-native'
import JobFairListItem from '../JobFairListItem'

export const JobFairSearchOptions: StackNavigationOptions = {
  title: '',
  headerShown: false,
}

const histories = ['500强招聘', '暨南山智园人才招聘会']
const hots = ['2021年青年人才招聘会', '欢聚人才招聘会', '小鹅通专场招聘会']
const results = ['a', 'b']

export default function JobFairSearch() {
  const [text, setText] = useState<string>('')
  const [showsSearchResult, setShowsSearchResult] = useState(false)

  useEffect(() => {
    setShowsSearchResult(text !== '')
  }, [text])

  const navigation = useNavigation<StackNavigationProp<any>>()

  const renderTags = () => {
    if (showsSearchResult) {
      return null
    }

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        <View style={styles.historySection}>
          <View style={styles.historyTitleRow}>
            <Text style={styles.title}>搜索历史</Text>
            <IconButton
              style={styles.historyClearButton}
              icon={require('./assets/clear.png')}
            />
          </View>
          <View style={styles.tags}>
            {histories.map(v => (
              <TextButton
                onPress={() => navigation.navigate('JobFairDetail')}
                style={styles.tag}
                textStyle={styles.tagText}
                title={v}
                key={v}
              />
            ))}
          </View>
        </View>
        <View style={styles.hotSection}>
          <View style={styles.hotTitleRow}>
            <Text style={styles.title}>人气最旺招聘会</Text>
            <Image
              style={styles.hotTitleAccessory}
              source={require('./assets/hot.png')}
            />
          </View>
          <View style={styles.tags}>
            {hots.map((v, index) => (
              <TouchableOpacity key={v} style={styles.tag} activeOpacity={0.5}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.rank}>{index + 1}</Text>
                  <Text style={styles.tagText}>{v}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    )
  }

  const renderSearchResult = () => {
    if (!showsSearchResult) {
      return null
    }

    const renderItem: ListRenderItem<string> = ({ item, index }) => {
      return <JobFairListItem />
    }

    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        keyExtractor={item => item}
        data={results}
        renderItem={renderItem}
      />
    )
  }

  return (
    <View style={styles.container}>
      <NavBar>
        <SearchBar
          onChangeText={setText}
          style={styles.search}
          placeholder="找招聘会"
        />
        <TextButton
          style={styles.cancel}
          title="取消"
          onPress={() => navigation.goBack()}
        />
      </NavBar>
      {renderTags()}
      {renderSearchResult()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: headerHeight(),
    backgroundColor: '#FFFFFF',
  },
  nav: {
    marginTop: statusBarHeight(),
    height: navigationBarHeight(),
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    flex: 1,
    marginLeft: 11,
  },
  cancel: {
    marginLeft: 24,
    marginRight: 11,
    color: '#666666',
  },
  historySection: {
    marginHorizontal: 11,
    marginTop: 8,
  },
  historyTitleRow: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  historyClearButton: {},
  hotSection: {
    marginHorizontal: 11,
  },
  hotTitleRow: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  hotTitleAccessory: {
    marginLeft: 6,
  },
  tags: {
    marginTop: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    borderRadius: 4,
    height: 34,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
    marginBottom: 13,
  },
  tagText: {
    color: '#666666',
    fontSize: 13,
    fontWeight: 'normal',
  },
  rank: {
    color: '#ED682C',
    fontSize: 14,
    marginRight: 9,
  },
})
