import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import ListItem from './ContractListItem'
import { ListRenderItem } from 'react-native'
import NavBar from '../../components/NavBar'
import useContractList, { ContractItem } from './useContractList'
import LoadingAndError from '../../components/LoadingAndError'
import Empty from '../../components/Empty'

function ItemSeparator() {
  return <View style={styles.separator} />
}

export default function TalentListwithTalks() {
  const { items, loading, error, refetch } = useContractList()

  const renderItem: ListRenderItem<ContractItem> = ({ item }) => {
    return <ListItem item={item} />
  }

  return (
    <View style={styles.container}>
      <NavBar title="沟通过的人才" />
      <LoadingAndError loading={loading} error={error} refetch={refetch}>
        <FlatList
          data={items}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparator}
          style={styles.container}
          contentContainerStyle={styles.content}
          ListEmptyComponent={Empty}
        />
      </LoadingAndError>
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
