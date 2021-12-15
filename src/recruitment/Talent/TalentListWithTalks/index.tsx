import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import Item from './Item'
import { ListRenderItem } from 'react-native'
import NavBar from '../../components/NavBar'

const items = ['male', 'female']

function ItemSeparator() {
  return <View style={styles.separator} />
}

export default function TalentListwithTalks() {
  const renderItem: ListRenderItem<string> = ({ item }) => {
    return <Item gender={item as any} />
  }

  return (
    <View style={styles.container}>
      <NavBar title="沟通过的人才" />
      <FlatList
        data={items}
        keyExtractor={item => item}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        style={styles.container}
        contentContainerStyle={styles.content}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
  },
  separator: {
    width: '100%',
    height: 5,
    backgroundColor: '#F4F4F4',
  },
})
