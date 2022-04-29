# coding=utf-8

import requests
import json
import time
import socket
import threading
from binascii import b2a_hex, a2b_hex

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


def testUserSendMessage(session):
	data = {
		"operationName": "UserSendMessage",
		"variables": {
			"info": {
				"messageType": "Normal",
				"messageContent": "1",
				"to": 49,
				"jobId": 693
			}
		},
		"query": '''
			mutation UserSendMessage($info: SendMessage!) {
				UserSendMessage(info: $info)
			}
		'''
	}
	data = session.post(URL, json = data).json()

def testUserSendMessage_UserGetContractList():
	session = createSession(True, True)
	testUserSendMessage(session)
	data = {
		"operationName": "UserGetContractList",
		"variables": {
		},
		"query": '''
			query UserGetContractList {
				UserGetContractList {
					... on Contract {
						id name logo pos ent last_msg last_msg_time job
					}
					... on Talent {
						id logo job name gender age exp job_category_expectation city_expectation salary_expectations job_status last_log_out_time last_msg last_msg_time skills personal_advantage
					}
				}
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)



def testSendMessage_WebSocketServerClose():
	session = createSession(True, True)
	gqlWebSocket = GQLWebSocket(
		connectparam = { "Authorization": session.headers['Authorization'] },
		initparam = { "query": '''
			subscription newMessage {
				newMessage {
					from messageType messageContent to uuid createdAt
				}
			}
		'''},
		onmessage = lambda data: print('收到消息: ', data)
	)
	time.sleep(2)
	testUserSendMessage(session)

def testHRHideJob():
	session = createSession(True, False)
	data = {
		"operationName": "HRHideJob",
		"variables": {
			'jobId': 700
		},
		"query": '''
			mutation HRHideJob($jobId: Int!) {
				HRHideJob(jobId: $jobId)
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)

def testHREditJob():
	session = createSession(True, False)
	data = {
		"operationName": "HREditJob",
		"variables": {
			'info': {
				"id": 692,
				"jobTitle": "C++",
				"workingAddress": ["510000000000", "510100000000", "510104000000", "四川省", "成都市", "锦江区", "成都市锦江区绿地锦天府", "666号"],
				"experience": 10,
				"salary": [30000, 32000],
				"education": "RegularCollege",
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
			mutation HREditJob($info: JobEdit!) {
				HREditJob(info: $info)
			}
		'''
	}
	data = session.post(URL, json = data).json()
	print(data)
	


if __name__ == '__main__':

	# 1. UserSearchEnterprise 没有返回公司 id, 导致没有办法跳转公司详情页
	# UserSearchEnterprise 还需要返回 <= 3 个正在招聘的 job
	# 设计图在这里 https://lanhuapp.com/web/#/item/project/detailDetach?pid=01c4947a-dbd1-448a-bdab-74e42e530e7b&teamId=a5459796-9cb4-4dc8-9cd5-1c13ea628f32&project_id=01c4947a-dbd1-448a-bdab-74e42e530e7b&image_id=dbed64dc-7847-4094-a862-89dd9d11b2f6&fromEditor=true

	# 2. CandidateGetAllJobExpectations 和 CandidateEditJobExpectations 两个接口都没有 id ，没有办法修改求职期望

	# 3. 没有接口获取人才详情

	# 5. UserGetJob 接口返回内容 hr 里面 需要 user_id, 现在返回来的 id 是 work_id
	# 需要新增字段 user_id 才能发起聊天, work_id 不行

	# 6. newMessage 和 UserGetMessages 需要返回用户信息，需要头像昵称

	# 7. UserGetContractList 会返回重复联系人，因为是两个 jobId, 所以 insert contract 的时候需要修改

	# 8. 调用 UserSendMessage 后立即调用 UserGetMessages 会直接被服务器关闭连接 
	# 运行下面的可以重现
	# testUserSendMessage_UserGetContractList()
	
	# 9. websocket 当收到服务器一条消息后，会被服务器关闭连接
	# 运行下面的可以重现
	# testSendMessage_WebSocketServerClose()

	# 10. hr 停止招聘 报错
	# 报错信息 JobCache id must be unique Key (id)=(23) already exists
#	testHRHideJob()

	# 11. hr 编辑职位/开放职位 用的是同一个接口，也是相同的参数，接口报错
	# 报错信息 JobCache id must be unique Key (id)=(25) already exists
#   testHREditJob()
	
	
	
	




