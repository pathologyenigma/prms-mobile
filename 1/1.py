# coding=utf-8

import requests
import json
import time
import socket

URL = 'http://be.chenzaozhao.com:4000/graphql'

# 登录，然后切换身份，然后把带有 token 的 session 返回去
def createSession(isLogin = True, isFindJobRole = True):
	session = requests.session()
	if isLogin == False:
		return session

	# 登录
	# 18800001012 有 招聘方和求职方 两个身份，18800001013 只有 求职方 一个身份
	data = {
		'operationName': 'UserLogIn',
		'variables': {
			'info': {
				'account': '18800001013' if isFindJobRole else '18800001012',
				'password': 'word_13' if isFindJobRole else 'word_12',
				'deviceId': 'deviceId'
			}
		},
		'query': '''
			query UserLogIn($info: LogIn!) {
				UserLogIn(info: $info) {
					username
					token
					createdAt
					id
				}
			}
		'''
	}
	
	response = session.post(URL, json = data).json()
	response = response['data']['UserLogIn']['token']
	session.headers.update({ 'Authorization': response })

	
	# 切换为 求职者 / 招聘者
	data = {
		'operationName': 'UserChooseOrSwitchIdentity',
		'variables': {
			'targetIdentity': 'PersonalUser' if isFindJobRole else 'EnterpriseUser',
			'role': 'PersonalUser' if isFindJobRole else 'HR'
		},
		'query': '''
			mutation UserChooseOrSwitchIdentity($targetIdentity: Identity!, $role: EnterpriseRole!) {
				UserChooseOrSwitchIdentity(targetIdentity: $targetIdentity, role: $role)
			}
		'''
	}
	response = session.post(URL, json = data).json()
	response = response['data']['UserChooseOrSwitchIdentity']
	session.headers.update({ 'Authorization': response })
	return session

# 测试发布一个新的工作
def testHRPostJob():
	session = createSession(True, False)
	data = {
		"operationName": "HRPostJob",
		"variables": {
			"info": {
				"jobTitle": "C++",
				"workingAddress": ["510000000000", "510100000000", "510104000000", "四川省", "成都市", "锦江区", "成都市锦江区绿地锦天府", "666号"],
				"experience": 10,
				"salary": [30000, 32000, 12],
				"education": "Postgraduate",
				"description": "能干活",
				"requiredNum": 5,
				"isFullTime": "Full",
				"tags": ["五险一金", "年底双薪"],
				"coordinates": [104.10408, 30.629988],
				"publishNow": True,
				"category": ["互联网/通信及硬件", "软件研发", "C++"]
			}
		},
		"query": '''
			mutation HRPostJob($info: JobPost!) {
				HRPostJob(info: $info)
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)

def testSearchJobList():
	session = createSession(True, True)
	data = {
		"operationName": "CandidateSearchJob",
		"variables": {
			'keyword': '语音',
			'filter': { }
		},
		"query": '''
			query CandidateSearchJob($keyword: String, $filter: JobFilter) {
				CandidateSearchJob(keyword: $keyword, filter: $filter) {
					page
					pageSize
					count
					data {
						id job_id hr_name hr_pos title category
					}
				}
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)

def testSearchExpectation():
	session = createSession(True, True)
	data = {
		"operationName": "CandidateGetAllJobExpectations",
		"variables": {
			
		},
		"query": '''
			query CandidateGetAllJobExpectations {
				CandidateGetAllJobExpectations {
					job_category
				}
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)


if __name__ == '__main__':
	# 1. hr 发布一个新的工作时接口报错
	# 报错信息 Key (worker_id)=(49) is not present in table \"worker\"
	# 我看了一下数据库，49 是 user_id 不是 worker_id
	testHRPostJob()

	# 2. websocket 服务器报错
	# 报错信息 400 Bad Request
	# testWebSocket()

	# testSearchJobList()

	# testSearchExpectation()

	# 3. UserGetJob 接口返回内容 hr 里面 需要 user_id, 现在返回来的 id 是 work_id
	# 需要新增字段 user_id 才能发起聊天, work_id 不行

	# 4. CandidateGetJobList 接口的 filter 字段需要新增字段 keyword
	# 因为首页搜索工作需要传关键词

	# 5. 下面这些 logo, 有 user 表 的 image_url, 也有 company 表 的 logo
	# 需要把感叹号去掉, 或者 insert 的时候就赋值空字符串 ''
	# JobDataBriefly.logo: String!
	# CompInfoForJobDetailPage.enterprise_logo: String!
	# ResumePersonalData.logo: String!
	# WorkerInfoForWorkerList.logo: String!
	# InterviewRecommentInfoForEntDetail.logo: String!
	# HRInfoForHRDetailPage.logo: String!
	# Contract.logo: String!
	# Talent.logo: String!

	# 6. job 审核状态的字段是什么呢, 我找不到这个字段呢



