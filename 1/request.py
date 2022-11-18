# coding=utf-8

import requests
import json
import time
import socket
import threading
from binascii import b2a_hex, a2b_hex
from enum import Enum

URL = 'http://be.chenzaozhao.com:4000/graphql'
SOCKET_URL = ('be.chenzaozhao.com', 4000)

class GQLWebSocket():

	def __init__(self, connectparam, initparam, onmessage):
		self.socket = socket.socket()
		self.socket.connect(SOCKET_URL)
		threading.Thread(target = self.loopReceive, args = (initparam, onmessage, )).start()
		self.send('''
GET /ws HTTP/1.1
origin: http://be.chenzaozhao.com:4000
Sec-WebSocket-Protocol: graphql-ws,graphql-transport-ws
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: ldvL9Fv+NkC5q9i9BpAinQ==
Sec-WebSocket-Version: 13
Host: be.chenzaozhao.com:4000
Accept-Encoding: gzip
User-Agent: okhttp/3.12.12\r\n\r\n'''.encode())
		self.sendGql('connection_init', connectparam)
		self.sendGql('start', initparam)
		

	def loopReceive(self, initparam, onmessage):
		while True:
			data = self.socket.recv(1024)
			if len(data) <= 0:
				print('远端断开')
				return
			onmessage(data)
			

	def sendGql(self, type, payload):
		data = { 'id': '1', 'type': type, 'payload': payload}
		data = json.dumps(data)
		payloadLength = len(data)
		payloadLength = int(payloadLength).to_bytes(2, 'big')
		byteList = bytearray(a2b_hex('81fe'))
		byteList += payloadLength
		byteList += a2b_hex('00000000')
		byteList += data.encode()
		self.send(byteList)

	def send(self, data):
		print('发送消息', data)
		self.socket.send(data)
		




class Role(Enum):
	FINDJOB = 1
	PUBLISHJOB = 2
	ADMIN = 3


# 登录，然后切换身份，然后把带有 token 的 session 返回去
def createSession(isLogin = True, role = Role.FINDJOB):
	session = requests.session()
	valueList = {
		Role.FINDJOB: { 'account': '18800001016', 'password': 'word_16', 'targetIdentity': 'PersonalUser', 'role': 'PersonalUser' },
		Role.PUBLISHJOB: { 'account': '18800000013', 'password': 'pass_13', 'targetIdentity': 'EnterpriseUser', 'role': 'HR'},

		# Role.FINDJOB: { 'account': '18800000013', 'password': 'pass_13', 'targetIdentity': 'PersonalUser', 'role': 'PersonalUser'},
		# Role.PUBLISHJOB: { 'account': '18800001017', 'password': 'word_17', 'targetIdentity': 'EnterpriseUser', 'role': 'Admin' },
		

		Role.ADMIN: { 'account': 'admin', 'password': 'admin', 'targetIdentity': 'Administrator', 'role': 'Admin'},
	}[role]
	if isLogin == False:
		return session

	# 登录
	data = {
		'operationName': 'UserLogIn',
		'variables': {
			'info': {
				'account': valueList['account'],
				'password': valueList['password'],
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
	} if role != Role.ADMIN else {
		'operationName': 'AdminLogIn',
		'variables': {
			'account': valueList['account'],
			'password': valueList['password'],
		},
		'query': '''
			query AdminLogIn($account: String!, $password: String!) {
				AdminLogIn(account: $account, password: $password) {
					token 
					rights 
				}
			}
		'''
	}
	
	response = session.post(URL, json = data).json()
	response = response['data']['UserLogIn' if role != Role.ADMIN else 'AdminLogIn']['token']
	session.headers.update({ 'Authorization': response })

	if role != Role.ADMIN:
		# 切换为 求职者 / 招聘者
		data = {
			'operationName': 'UserChooseOrSwitchIdentity',
			'variables': {
				'targetIdentity': valueList['targetIdentity'],
				'role': valueList['role']
			},
			'query': '''
				mutation UserChooseOrSwitchIdentity($targetIdentity: Identity!, $role: EnterpriseRole!) {
					UserChooseOrSwitchIdentity(targetIdentity: $targetIdentity, role: $role)
				}
			'''
		}
		response = session.post(URL, json = data).json()
		if 'errors' in response:
			raise Exception(response)
		response = response['data']['UserChooseOrSwitchIdentity']
		session.headers.update({ 'Authorization': response })
	return session

def CommonGetResume():
	session = createSession(True, Role.PUBLISHJOB)
	data = {
		"operationName": "CommonGetResume",
		"variables": {
			'resumeId': 15,
		},
		"query": '''
			query CommonGetResume($resumeId: Int, $cacheId: String) {
				CommonGetResume(resumeId: $resumeId, cacheId: $cacheId) {
					personalData {
						logo 
						realName 
						age 
						gender 
						phoneNumber 
						education 
						workExperienceTime 
					}
					jobStatus 
					employmentNature 
					jobExpectation {
						id 
						job_category 
						aimed_city 
						industry_involved 
						min_salary_expectation 
						max_salary_expectation 
						full_time_job 
					}
					workExperience {
						id 
						enterpriseName 
						positionName 
						departmentName 
						time 
						detail 
					}
					projectExperience {
						id 
						projectName 
						role 
						detail 
						project_performance 
					}
					educationExperience {
						id 
						schoolName 
						major 
						education 
						detail 
						time 
					}
					personalAdvantage 
				}
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)

def CandidateSendResume():
	session = createSession(True, Role.FINDJOB)
	data = {
		"operationName": "CandidateSendResume",
		"variables": {
			'jobId': 697,
			'hrId': 36,
			'compId': 12
		},
		"query": '''
			mutation CandidateSendResume($resumeId: Int, $jobId: Int!, $hrId: Int!, $compId: Int!) {
				CandidateSendResume(resumeId: $resumeId, jobId: $jobId, hrId: $hrId, compId: $compId) 
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)

def HRInviteInterview():
	session = createSession(True, Role.PUBLISHJOB)
	data = {
		"operationName": "HRInviteInterview",
		"variables": {
			'userId': 51,
			'jobId': 697,
			'time': ['2022-06-23T16:52:24.001Z', '2022-08-23T16:52:24.001Z']
		},
		"query": '''
			mutation HRInviteInterview($userId: Int!, $jobId: Int!, $time: [String]!) {
				HRInviteInterview(userId: $userId, jobId: $jobId, time: $time) 
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)


def CommonGetIterviewSchedule():
	session = createSession(True, Role.PUBLISHJOB)
	data = {
		"operationName": "CommonGetIterviewSchedule",
		"variables": {
			
		},
		"query": '''
			query CommonGetIterviewSchedule {
				CommonGetIterviewSchedule {
					schedul {
						... on PersonalUserSideInterviewData {
							enterpriseName 
							jobName 
							salary 
							hrName 
							hrPosition 
						}
						... on EnterpriseUserSideInterviewData {
							targetName 
							jobName 
							jobExpectation 
							salary 
						}
					}
				}
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)

def CommonGetIterviewDetail():
	session = createSession(True, Role.FINDJOB)
	data = {
		"operationName": "CommonGetIterviewDetail",
		"variables": {
			'interviewId': 156
		},
		"query": '''
			query CommonGetIterviewDetail($interviewId: Int!) {
				CommonGetIterviewDetail(interviewId: $interviewId) {
					enterpriseName 
					hrName 
					hrPosition 
					time 
					jobName 
					jobSalary 
					jobContractor 
					jobContractedNumer 
					isOutline 
					address 
					attachments 
					process 
				}
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)
	

def UserEnterpriseIdentify():
	session = createSession(True, Role.FINDJOB)
	data = {
		"operationName": "UserEnterpriseIdentify",
		"variables": {
			'info': {
				'enterpriseName': '做大做强',
				'charter': ' ',
				'phoneNumber': '15555555555',
			}
		},
		"query": '''
			mutation UserEnterpriseIdentify($info: EnterpriseCharterSencorRequest!) {
				UserEnterpriseIdentify(info: $info) 
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)

def ENTInsertEnterpriseBasicInfo():
	session = createSession(True, Role.FINDJOB)
	data = {
		"operationName": "ENTInsertEnterpriseBasicInfo",
		"variables": {
			'info': {
				'enterpriseName': '才华无限1',
				'abbreviation': '才华无限2',
				'enterpriseLocation': ['四川', '成都'],
				'enterprisecCoordinate': [100.0, 30.0],
				'enterpriseNature': 'ForeignVentures',
				'enterpriseIndustry': ['生活服务', '餐饮'],
				'enterpriseFinancing': 'NoNeed',
				'enterpriseSize': 'LessThanFifteen',
				'enterpriseProfile': '3',
				'logo': None,
				'establishedDate': None,
				'homepage': None,
				'tel': None
			}
		},
		"query": '''
			mutation ENTInsertEnterpriseBasicInfo($info: EnterpriseBasicInfo!) {
				ENTInsertEnterpriseBasicInfo(info: $info) 
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)

def ENTEditEnterpriseBasicInfo():
	session = createSession(True, Role.PUBLISHJOB)
	data = {
		"operationName": "ENTEditEnterpriseBasicInfo",
		"variables": {
			'info': {
				'enterpriseName': '才华有限3',
				'abbreviation': '才华有限3',
				'enterpriseLocation': '1',
				'enterprisecCoordinate': [30.0, 100.0],
				'enterpriseNature': 'ForeignFundedEnterprises',
				'enterpriseIndustry': [],
				'enterpriseFinancing': 'D',
				'enterpriseSize':  'OneHundredFiftyToFiveHundreds',
				'enterpriseProfile': '1',
				'logo': '1',
				'establishedDate': '',
				'homepage': 'https://www.baidu.com',
				'tel': '1',
			}
		},
		"query": '''
			mutation ENTEditEnterpriseBasicInfo($info: EditEnterpriseBasicInfo!) {
				ENTEditEnterpriseBasicInfo(info: $info) 
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)

def AdminGetEntList():
	session = createSession(True, Role.ADMIN)
	data = {
		"operationName": "AdminGetEntList",
		"variables": {
			'info': {

			},
			'pageSize': 100,
		},
		"query": '''
			query AdminGetEntList($info: EntFilterForAdmin, $page: Int, $pageSize: Int) {
				AdminGetEntList(info: $info, page: $page, pageSize: $pageSize) 
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)

def AdminGetCensorList():
	session = createSession(True, Role.ADMIN)
	data = {
		"operationName": "AdminGetCensorList",
		"variables": {
			
		},
		"query": '''
			query AdminGetCensorList($pageSize: Int, $lastIndex: String) {
				AdminGetCensorList(pageSize: $pageSize, lastIndex: $lastIndex) {
					_id 
					enterpriseName 
					charter 
				}
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)

def AdminSetCensoredForAnItem():
	session = createSession(True, Role.ADMIN)
	data = {
		"operationName": "AdminSetCensoredForAnItem",
		"variables": {
			'_id': '62c2b8d252c75e27080ff7f0',
			'isPassed': True,
			'description': '营业执照模糊'
		},
		"query": '''
			mutation AdminSetCensoredForAnItem($_id: String!, $isPassed: Boolean, $description: String) {
				AdminSetCensoredForAnItem(_id: $_id, isPassed: $isPassed, description: $description) 
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)

def AdminGetHomePageDataCollection():
	session = createSession(True, Role.ADMIN)
	data = {
		"operationName": "AdminGetHomePageDataCollection",
		"variables": {
			
		},
		"query": '''
			query AdminGetHomePageDataCollection {
				AdminGetHomePageDataCollection {
					userCounter {
						sum 
						enterpriseUserCount 
					}
					jobCounter {
						sum 
					}
					newUserCounter {
						monthly 
						weekly 
						graphData {
							monthly 
							weekly 
						}
					}
					censors 
				}
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)


def ENTEnterpriseWorkerRegister():
	session = createSession(True, Role.PUBLISHJOB)
	data = {
		"operationName": "ENTEnterpriseWorkerRegister",
		"variables": {
			'info': {
				'role': 'HR',
				'pos': '人事经理'
			}
		},
		"query": '''
			mutation ENTEnterpriseWorkerRegister($info: EnterpriseWorkerInfo!) {
				ENTEnterpriseWorkerRegister(info: $info) 
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)




if __name__ == '__main__':

	CandidateSendResume()
	# HRInviteInterview()

	# 4. CommonGetResume 
	# 4.1 这个接口报错 response 不能为 null
	# 4.2 这个接口的 cacheId 我可以传什么
	# CommonGetResume()
	# AdminGetEntList()
	# CommonGetIterviewDetail()
	# UserEnterpriseIdentify()
	# AdminSetCensoredForAnItem()
	# AdminGetCensorList()

	# ENTInsertEnterpriseBasicInfo()
	# ENTEditEnterpriseBasicInfo()
	# ENTEnterpriseWorkerRegister()
	
	# AdminGetHomePageDataCollection()




	# 1. hr 收到简历后，CommonGetResume 报错拿不到简历
	# CandidateSendResume()
	# CommonGetResume()

	


	
	
	




