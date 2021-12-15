import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import SearchBar from '../../components/SearchBar'
import TextButton from '../../components/TextButton'
import AddressItem from './Addresstem'
import AddressHeader from './AddressHeader'
import { useNavigation } from '@react-navigation/core'
import NavBar from '../../components/NavBar'

const data = [
  {
    title: '米陀饭团',
    detail: '粤海街道科技园中区科苑路15号科兴科学园臻食美食广场 100铺',
  },
  {
    title: '谷典煎饼果',
    detail: '粤海街道科技园中区科苑路15号科兴科学园臻食美食广场 100铺',
  },
  {
    title: '皇牌自助餐科兴',
    detail: '粤海街道科技园中区科苑路15号科兴科学园臻食美食广场 100铺',
  },
  {
    title: '科兴科学园',
    detail: '科苑路15号',
  },
  {
    title: '科兴科学园D1栋',
    detail: '高新中二道',
  },
  {
    title: '科兴科学园（北门）',
    detail: '高新中一道9号后侧',
  },
]

export default function SearchJobAddress() {
  const [text, setText] = useState<string>('')
  const [showsSearchResult, setShowsSearchResult] = useState(false)

  useEffect(() => {
    setShowsSearchResult(text !== '')
  }, [text])

  const navigation = useNavigation<StackNavigationProp<any>>()

  return (
    <View style={styles.container}>
      <NavBar>
        <SearchBar
          onChangeText={setText}
          style={styles.search}
          placeholder="请输入上班地址"
        />
        <TextButton
          style={styles.cancel}
          title="取消"
          onPress={() => navigation.goBack()}
        />
      </NavBar>
      <View style={{ flex: 1 }}>
        <View style={styles.map}></View>
        <FlatList
          data={data}
          keyExtractor={item => item.title}
          renderItem={({ item }) => <AddressItem {...item} />}
          ListHeaderComponent={
            <AddressHeader
              title="卤潮鲜"
              detail="粤海街道科技园中区科苑路15号科兴科学园臻食美食广场 100铺"
            />
          }
        />
        {showsSearchResult && (
          <FlatList
            style={styles.searchList}
            data={data}
            keyExtractor={item => item.title}
            renderItem={({ item }) => <AddressItem {...item} />}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  searchList: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  mapList: {},
  map: {
    width: '100%',
    aspectRatio: 375 / 350,
    backgroundColor: '#FF0000',
  },
})
