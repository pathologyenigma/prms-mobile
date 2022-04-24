import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import ListItem from './ContractListItem'
import { ListRenderItem } from 'react-native'
import NavBar from '../../components/NavBar'
import LoadingAndError from '../../components/LoadingAndError'
import Empty from '../../components/Empty'
import { format, isThisYear, isToday } from 'date-fns'
import { stirngForSalary, stringForJobStatus } from '../../utils/JobHelper'

function ItemSeparator() {
  return <View style={styles.separator} />
}

function formatTime(time: string) {
  const date = new Date(time)
  if (isToday(date)) {
    return `今天 ${format(date, 'HH:mm')}`
  }

  if (isThisYear(date)) {
    return format(date, 'M月d日 HH:mm')
  }

  return format(date, 'yyyy年M月d日 HH:mm')
}

export default function TalentListwithTalks() {
  const [ items, setItemList ] = useState()
  useEffect(() => {
  	HTAPI.UserGetContractList().then(response => {
  		let itemList = response.map(data => {
  			const {
		        id,
		        job,
		        last_msg_time,
		        name,
		        age,
		        exp,
		        job_status,
		        logo,
		        gender,
		        job_category_expectation,
		        city_expectation,
		        salary_expectations,
		      } = data

		      return {
		        id,
		        job: job.title,
		        time: formatTime(last_msg_time),
		        name: name,
		        age: `${age} 岁`,
		        experience: `工作 ${exp} 年`,
		        education: '本科',
		        status: stringForJobStatus(job_status),
		        avatar: logo,
		        gender: gender ? 'male' : 'female',
		        expectation: {
		          jobCategory:
		            job_category_expectation[job_category_expectation.length - 1],
		          city: city_expectation,
		          salary: stirngForSalary(salary_expectations),
		        },
		      }
  		})
  		setItemList(itemList)
  	})
  }, [])

  const renderItem: ListRenderItem = ({ item }) => {
    return <ListItem item={item} />
  }

  return (
    <View style={styles.container}>
      <NavBar title="沟通过的人才" />
      <LoadingAndError loading={false} error={null} refetch={null}>
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
