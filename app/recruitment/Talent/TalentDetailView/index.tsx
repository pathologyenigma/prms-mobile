import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import GradientButton from '../../components/GradientButton'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import Section from './Section'
import Profile from './Profile'
import LabelWithIcon from './LabelWithIcon'
import IntelligentGreetingModal from './IntelligentGreetingModal'
import SetGreetingModal from './SetGreetingModal'
import { stringForJobStatus, stringForEducation } from '~/recruitment/utils/JobHelper'
import { reformSalary } from '~/utils/utils'
import { parse, format } from 'date-fns'

interface TalentDetailViewPros {
  id?: Any,
  jobItem?: Any,
  navigation: Any,
  renderBottomBar?: () => JSX.Element
}

export default function TalentDetailView({
  id,
  jobItem,
  renderBottomBar,
  navigation
}: TalentDetailViewPros) {

  const [data, setData] = useState()

  const _renderBottomBar = () => {
    if (renderBottomBar) {
      return renderBottomBar()
    }
    return <GradientButton style={styles.button} title="立即沟通" onPress={() => {
		HTAPI.UserSendMessage({
			info: {
				messageType: 'Normal',
				messageContent: '你好',
				to: id,
			}
		}).then(response => {
			navigation.push('MessagePage', {
				targetItem: {
					id: id,
					name: data?.real_name ?? data?.username,
				}
			})
		})
    }} />
  }
  
  useEffect(() => {
	HTAPI.HRGetCandidateResume({ candidate_id: id }).then(response => {
		setData(response)
	})
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
        <Profile data={data} />
        <Section
          style={{ marginTop: 6 }}
          title={stringForJobStatus(data?.job_status)}
          renderSubtitle={() => (
            <View style={styles.info}>
              <LabelWithIcon
                icon={require('./images/working.png')}
                title={data ? `${new Date().getFullYear() - parse(data?.first_time_working, 'yyyy-MM-dd', new Date()).getFullYear()}年经验` : ''}
              />
              <LabelWithIcon icon={require('./images/edu.png')} title={stringForEducation(data?.education)} />
              <LabelWithIcon icon={require('./images/age.png')} title={data ? `${new Date().getFullYear() - parse(data?.birth_date, 'yyyy-MM-dd', new Date()).getFullYear()}岁` : ''} />
            </View>
          )}
          detail={data?.Resumes[0]?.personal_advantage}
        />
        <Text style={styles.title}>求职期望</Text>
        {
        	data?.JobExpectations?.map((item, index) => {
        		return (
        			<Section
        			  key={index}
			          title={`${item.job_category[item.job_category.length - 1]}，${item.aimed_city}`}
			          subtitle={item.industry_involved[item.industry_involved.length - 1]}
			          renderPeriod={() => <Text style={styles.desired}>{reformSalary([item.min_salary_expectation, item.max_salary_expectation])}</Text>}
			        />
        		)
        	})
        }
        <Text style={styles.title}>工作经验</Text>
        {
        	data?.Resumes[0].ResumeWorkExps?.map((item, index) => {
        		return (
        			<Section
        			  key={index}
			          title={item?.comp_name}
			          subtitle={`${item?.pos_name} ${item?.department}`}
			          period={`${format(parse(item?.start_at, 'yyyy-MM-dd', new Date()), 'yyyy.MM')}～${format(parse(item?.end_at, 'yyyy-MM-dd', new Date()), 'yyyy.MM')}`}
			          detail={`${item?.working_detail}`}
			        />
        		)
        	})
        }
        <Text style={styles.title}>项目经验</Text>
        {
        	data?.Resumes[0].ResumeProjectExps?.map((item, index) => {
        		return (
        			<Section
        			  key={index}
			          title={item?.project_name}
			          subtitle={item?.role}
			          period={`${format(parse(item?.start_at, 'yyyy-MM-dd', new Date()), 'yyyy.MM')}～${format(parse(item?.end_at, 'yyyy-MM-dd', new Date()), 'yyyy.MM')}`}
			          detail={`${item?.project_description}`}
			        />
        		)
        	})
        }
        <Text style={styles.title}>教育经历</Text>
        {
        	data?.Resumes[0].ResumeEduExps?.map((item, index) => {
        		return (
        			<Section
        			  key={index}
			          title={item?.school_name}
			          subtitle={`${stringForEducation(item.education)}·${item?.major}`}
			          period={item.time}
			          detail={item.exp_at_school}
			        />
        		)
        	})
        }
      </ScrollView>
      {_renderBottomBar()}
      <IntelligentGreetingModal visible={false} />
      <SetGreetingModal visible={false} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  button: {
    marginBottom: isIphoneX() ? getBottomSpace() + 5 : 5,
    marginHorizontal: 22,
    marginVertical: 4,
  },
  info: {
    flexDirection: 'row',
    marginLeft: 11,
    marginTop: 14,
    marginBottom: 8,
  },
  desired: {
    color: '#57DE9E',
    fontSize: 15,
    fontWeight: 'bold',
  },
  title: {
    marginLeft: 11,
    marginTop: 16,
    marginBottom: 8,
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
})
