import React, { useEffect, useState } from 'react'
import { FlatList, ListRenderItem, StyleSheet, Pressable } from 'react-native'
import LoadingAndError from '../../components/LoadingAndError'
import NoMoreFooter from './NoMoreFooter'
import TalentListItem from './TalentListItem'
import UpgradeFeature from './UpgradeFeature'

interface TalentPageProps {
  jobName?: string
  jobCategory?: [string]
  sortByUpdatedTime: boolean,
  navigation?: any
}

function educationDesc(education: Education | null) {
  switch (education) {
    case 'Junior':
      return '初中'
    case 'High':
      return '高中'
    case 'JuniorCollege':
      return '大专'
    case 'RegularCollege':
      return '本科'
    case 'Postgraduate':
      return '研究生'
    case 'Doctor':
      return '博士'
    default:
      return '小学及以下'
  }
}

export default function TalentPage({
  jobName,
  jobCategory,
  keyword,
  sortByUpdatedTime,
  navigation
}: TalentPageProps) {

  const [itemList, setItemList] = useState()

  useEffect(() => {
	HTAPI.ENTSearchCandidates({
		filter: {
			keyword: keyword,
			category: jobCategory,
		},
		pageSize: 10,
		page: 0
	}).then(response => {
		let itemList = response.data.map(item => {
		const {
			id,
			name,
			salary,
			personal_advantage,
			education,
			experience,
			job_expectation,
			skills,
			gender,
			resume_data
		} = item
		const firstExpectation = job_expectation[0]
		return {
			id,
			name,
			online: true,
			onlineDesc: '1 小时前在线',
			advantage: resume_data?.personal_advantage || '暂无描述',
			experience: `工作 ${experience || 0} 年`,
			education: educationDesc(education),
			salary: `${firstExpectation.min_salary_expectation / 1000}-${firstExpectation.max_salary_expectation / 1000}K`,
			job: `期望：${firstExpectation.industry_involved.join('/')}`,
			skills: `${resume_data.skills.join('·')}`,
			gender: gender ? 'male' : 'female',
			avatar: '',
		}
		})
		setItemList(itemList)
	})
  }, [sortByUpdatedTime, jobName, jobCategory, keyword])

  const renderItem: ListRenderItem<CandidateItem> = ({ item }) => {
    return (
    	<Pressable onPress={() => {
    		navigation.push('TalentDetail')
    	}}>
    		<TalentListItem {...item} />
    	</Pressable>
    )
  }

  return (
    <LoadingAndError
      loading={false}
      style={StyleSheet.absoluteFillObject}
      collapsable={false}>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        data={itemList}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={UpgradeFeature}
        ListFooterComponent={NoMoreFooter}
      />
    </LoadingAndError>
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
  filterButton: {
    marginRight: 11,
  },
  filterbar: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
  },
  labelGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  checkedLabelStyle: {
    color: '#7DDBA3',
    fontSize: 13,
    fontWeight: 'bold',
    // ios 垂直居中
    lineHeight: 40,
  },
  labelStyle: {
    color: '#666666',
    fontSize: 13,
    fontWeight: 'normal',
    lineHeight: 40,
    paddingHorizontal: 11,
  },
})
