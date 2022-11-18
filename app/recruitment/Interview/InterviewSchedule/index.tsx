import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native'
import Empty from './Empty'
import TextButton from '../../components/TextButton'
import Item, { ItemProps } from './Item'
import NavBar from '../../components/NavBar'
import { StackNavigationProp } from '@react-navigation/stack'

const data: ItemProps[] = [
	{
		date: '10月1日',
		time: '17:30',
		name: '谭先生',
		method: '线下面试',
		position: '视觉设计师',
		salary: '10K-15K',
		status: '已面试',
		isFirst: true,
	},
	{
		date: '10月2日',
		time: '10:30',
		name: '谭先生',
		method: '线下面试',
		position: '视觉设计师',
		salary: '10K-15K',
		status: '即将开始',
	},
	{
		date: '10月3日',
		time: '14:00',
		name: '谭先生',
		method: '线下面试',
		position: '视觉设计师',
		salary: '10K-15K',
		status: '待面试',
		isLast: true,
	},
]

export default function InterviewSchedule({ navigation }) {
	const [itemList, setItemList] = useState([])

	useEffect(() => {
		HTAPI.ENTSearchCandidates({
			page: 0,
			pageSize: 10,
			filter: {
				interview_status: 'Waiting',
				// interview_status: "Passed"
			},
		}).then(response => {
			setItemList(response.data)
		})
	}, [])

	const renderItem: ListRenderItem<ItemProps> = ({ item }) => {
		return <Item {...item} />
	}

	return (
		<View style={styles.container}>
			<NavBar
				title="面试日程"
				// headerRight={() => (
				//   <TextButton
				//     title="全部"
				//     onPress={() => navigation.navigate('AllInterview')}
				//   />
				// )}
			/>
			<FlatList
				contentContainerStyle={styles.content}
				data={itemList}
				renderItem={renderItem}
				ListEmptyComponent={Empty}
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
})
