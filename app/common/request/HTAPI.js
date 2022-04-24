import HTRequest from './HTRequest'

const ITEM_LIST = [

// 发送短信验证码
`
query StaticSendSms($phoneNumber: String!) {
	StaticSendSms(phoneNumber: $phoneNumber)
}
`,

// 发送邮箱验证码
` 
query StaticSendEmail($email: String!) {
	StaticSendEmail(emailAddress: $email)
}
`,

//  检查用户手机号是否可以顺利注册
`
query UserNumberCheck($num: String!) {
	UserNumberCheck(num: $num)
}
`,

// 登录
`
query UserLogIn($info: LogIn!) {
	UserLogIn(info: $info) {
		username
		token
		createdAt
		id
	}
}
`,

// 刷新 token
` 
mutation UserRefreshToken {
	UserRefreshToken
}
`,

// 注册
`
mutation UserRegister($info: Register!) {
	UserRegister(info: $info)
}
`,

// 重置密码
`
mutation UserResetPassword($info: ResetPassword!) {
	UserResetPassword(info: $info)
}
`,

// 验证码是否正确
`
mutation UserVerifyCodeConsume($info: VerifyInfo!) {
	UserVerifyCodeConsume(info: $info)
}
`,

// 监听消息
`
subscription newMessage {
	newMessage {
		from
		messageType
		messageContent
		to
		uuid
	}
}
`,

// 获取和某人的消息列表
`
query UserGetMessages(
	$targetId: Int!, 
	$page: Int!, 
	$pageSize: Int!
) {
	UserGetMessages(targetId: $targetId, page: $page, pageSize: $pageSize) {
		messages {
			from
			messageType
			messageContent
			to
			uuid
		}
		count
		page
		pageSize
	}
}
`,

// 切换身份
`
mutation UserChooseOrSwitchIdentity(
	$targetIdentity: Identity!
	$role: EnterpriseRole!
) {
	UserChooseOrSwitchIdentity(targetIdentity: $targetIdentity, role: $role)
}
`,

// 获取所有的地址区域
` 
query StaticGetAllRegion {
	StaticGetAllRegion {
		data {
			Cities {
				name
				city_id
				Counties {
					county_id
					name
					Towns {
						town_id
						name
					}
				}
			}
			province_id
			name
		}
	}
}
`,

// 获取所有的地址镇
`
query StaticGetTowns($countyId: String!) {
	StaticGetTowns(countyId: $countyId) {
		... on Town {
			town_id
			name
		}
	}
}
`,

// 招聘方编辑自己的公司信息
` 
mutation ENTEditEnterpriseBasicInfo($info: EditEnterpriseBasicInfo!) {
	ENTEditEnterpriseBasicInfo(info: $info)
}
`,

// 求职者获取所有的求职期望
` 
query CandidateGetAllJobExpectations {
	CandidateGetAllJobExpectations {
		job_category
		aimed_city
		min_salary_expectation
		max_salary_expectation
		industry_involved
		full_time_job
	}
}
`,

// 已经废弃，调用 CandidateEditJobExpectations
` 
mutation UserAddJobExpectation($info: UserExpectation!) {
	UserAddJobExpectation(info: $info)
}
`,

// 求职者增加或者编辑求职期望
` 
mutation CandidateEditJobExpectations($info: EditJobExpectation!) {
	CandidateEditJobExpectations(info: $info)
}
`,

// 求职者首页推荐工作列表
` 
query CandidateGetJobList($filter: JobFilter!) {
	CandidateGetJobList(filter: $filter) {
		page
		pageSize
		count
		data {
			tags
			hr_pos
			comp_size
			id
			logo
			title
			ontop
			job_id
			comp_financing
			min_experience
			full_time_job
			min_education
			# expired_at
			max_salary
			min_salary
			comp_size
			comp_name
			address_coordinate
			hr_name
			category
			emergency
		}
	}
}
`,

// 求职者搜索工作列表
` 
	query CandidateSearchJob($keyword: String, $filter: JobFilter!) {
		CandidateSearchJob(keyword: $keyword, filter: $filter) {
			page
			pageSize
			count
			data {
				tags
				hr_pos
				comp_size
				id
				logo
				title
				ontop
				job_id
				comp_financing
				min_experience
				full_time_job
				min_education
				# expired_at
				max_salary
				min_salary
				comp_size
				comp_name
				address_coordinate
				hr_name
				category
				emergency
			}
		}
	}
`,
// 公司详情页获取公司基本信息
` 
query UserGetEnterpriseDetail_EntInfo($entId: Int) {
	UserGetEnterpriseDetail_EntInfo(entId: $entId) {
		enterprise_name
		business_nature
		industry_involved
		enterprise_profile
		enterprise_financing
		enterprise_size
		enterprise_welfare
		enterprise_logo
		tags
		enterprise_coordinates
		enterprise_loc_detail
		extra_attribute
		rest_rule
		overtime_work_degree
		homepage
		established_time
		tel
		work_time
		createdAt
	}
}
`,

// 公司详情页获取热门招聘官列表
` 
query UserGetEnterpriseDetail_WorkerList($entId: Int!) {
	UserGetEnterpriseDetail_WorkerList(entId: $entId, role: HR) {
		id
		name
		logo
		pos
	}
}
`,

// 公司详情页获取公司面试评价列表
` 
query CandidateGetEnterpriseDetail_InterviewRecomment($entId: Int!) {
	CandidateGetEnterpriseDetail_InterviewRecomment(entId: $entId) {
		total
		description
		comp_env
		HR
		count
		recommends {
			id
			user_name
			score
			job_name
			tags
			content
			thumbs
			createdAt
			logo
		}
	}
}
`,

// 公司详情页获取公司问答列表
` 
query UserGetEnterpriseQuestions(
	$entId: Int!,
	$needAnswerPreview: Int!
	$page: Int!
	$pageSize: Int!
) {
	UserGetEnterpriseQuestions(
		entId: $entId,
		needAnswerPreview: $needAnswerPreview,
		page: $page,
		pageSize: $pageSize
	) {
		questionCount
		answerCount
		question
		answer
	}
}
`,

// 职位详情页获取职位详情
` 
query UserGetJob($jobid: Int!) {
	UserGetJob(jobid: $jobid) {
		... on JobDetailPageReply {
			job {
				id
				title
				category
				detail
				address_coordinate
				address_description
				salaryExpected
				experience
				education
				required_num
				full_time_job
				tags
			}
			hr {
				id
				name
				pos
				last_log_out_time
				# logo
			}
			company {
				id
				name
				address_coordinates
				address_description
				industry_involved
				enterprise_size
				business_nature
				#       enterprise_logo
			}
		}
	}
}
`,

// hr 详情页获取 hr 信息
`
query CandidateGetHRDetail_HRInfo($hrId: Int!) {
	CandidateGetHRDetail_HRInfo(hrId: $hrId) {
		name
		pos
		last_log_out_time
		company_belonged
		logo
	}
}
`,

// hr 详情页获取 hr 推荐工作列表
`
query CandidateGetHRDetail_RecommendationsList($hrId: Int!) {
	CandidateGetHRDetail_RecommendationsList(hrId: $hrId) {
		data {
			id
			title
			loc
			experience
			education
			salary
			createdAt
		}
		count
	}
}
`,

// hr 详情页获取 hr 所有工作列表
` 
query CandidateGetHRDetail_JobListPageView(
	$hrId: Int!
	$pageSize: Int!
	$page: Int!
) {
	CandidateGetHRDetail_JobListPageView(
		hrId: $hrId
		pageSize: $pageSize
		page: $page
	) {
		data {
			... on JobDataForHRDetailPageOrEntJobList {
				id
				title
				loc
				experience
				education
				salary
				createdAt
			}
		}
		count
	}
}
`,

// 发送简历
` 
mutation CandidateSendResume($resumeId: Int!, $targetUser: Int!) {
	CandidateSendResume
}
`,

// 发送消息
`
mutation UserSendMessage($info: SendMessage!) {
	UserSendMessage(info: $info)
}
`,

// 获取正在聊天的对话联系列表
` 
query UserGetContractList {
	UserGetContractList {
		... on Contract {
			id name logo pos ent last_msg last_msg_time job
		}
		... on Talent {
			id logo job name gender age exp job_category_expectation city_expectation salary_expectations job_status last_log_out_time last_msg last_msg_time skills personal_advantage
		}
		# id
		# name
		# pos
		# ent
		# last_msg
		# last_msg_time
		# logo
	}
}
`,

// 获取基本信息
` 
query UserGetBasicInfo {
    UserGetBasicInfo {
		username
		image_url
		gender
		birth_date
		current_city
		first_time_working
		education
		phone_number
		email
    }
}
`,

// 编辑基本信息
` 
mutation UserEditBasicInfo($info: BasicData!) {
	UserEditBasicInfo(info: $info)
}
`,

// 求职者搜索公司列表
` 
query UserSearchEnterprise(
	$keyword:String!, 
	$page: Int, 
	$pageSize: Int
) {
	UserSearchEnterprise(
		keyword: $keyword, 
		page: $page, 
		pageSize: $pageSize
	) {
		count
		data {
			enterprise_name 
			business_nature 
			industry_involved 
			enterprise_profile 
			enterprise_financing 
			enterprise_size 
			enterprise_welfare 
			enterprise_logo 
			tags 
			#enterprise_coordinates
			enterprise_loc_detail
			extra_attribute
			rest_rule
			overtime_work_degree
			homepage
			established_time
			tel
			work_time
			createdAt
			job_counter
			abbreviation
		}
	}
}
`,

// 求职者搜索招聘会
` 
query UserGetRecruitmentList($keyword:String!, $appointment: Boolean!, $page: Int!, $pageSize: Int!) {
	UserGetRecruitmentList(keyword: $keyword, appointment: $appointment, page: $page, pageSize: $pageSize)
}
`,

// 在线简历-新增工作经验(id 传入表示编辑,不传入表示新增)
` 
mutation CandidateEditWorkExprience($info: WorkExperience!) {
	CandidateEditWorkExprience(info: $info)
}
`,

// 在线简历-获取工作经验列表
` 
query CandidateGetWorkExps {
	CandidateGetWorkExps {
		data {
			id
			comp_name
			pos_name
			department
			start_at
			end_at
			working_detail
		}
	}
}
`,

// 在线简历-删除工作经历
` 
mutation CandidateRemoveWorkExp($id: Int!) {
	CandidateRemoveWorkExp(id: $id)
}
`,

// 在线简历-编辑个人优势
` 
mutation CandidateEditPersonalAdvantage($advantage: String!) {
	CandidateEditPersonalAdvantage(advantage: $advantage)
}
`,

// 在线简历-获取技能和个人优势
` 
query CandidateGetOnlineResumeBasicInfo {
	CandidateGetOnlineResumeBasicInfo {
		skills
		personal_advantage
	}
}
`,

// 在线简历-编辑技能
` 
mutation CandidateEditSkills($skills: [String]!) {
	CandidateEditSkills(skills: $skills)
}
`,

// 在线简历-获取项目经历
` 
query CandidateGetProjectExps {
	CandidateGetProjectExps {
		data {
			id
			project_name
			role
			start_at
			end_at
			project_description
			project_performance
		}
	}
}
`,

// 在线简历-编辑项目经历
` 
mutation CandidateEditProExp($info: ProExp!) {
	CandidateEditProExp(info:$info)
}
`,

// 在线简历-删除项目经历
` 
mutation CandidateRemoveProExp($id: Int!) {
	CandidateRemoveProExp(id: $id)
}
`,

// 在线简历-编辑教育经历
` 
mutation CandidateEditEduExp($info: EduExp!) {
	CandidateEditEduExp(info:$info)
}
`,

// 在线简历-获取教育经历
` 
query CandidateGetEduExps {
	CandidateGetEduExps {
		data {
			id
			school_name
			education
			is_all_time
			major
			time
			exp_at_school
		}
	}
}
`,

// 在线简历-删除教育经历
` 
mutation CandidateRemoveEduExp($id: Int!) {
	CandidateRemoveEduExp(id: $id)
}
`,

// 在线简历-获取设置进度
` 
query CandidateGetOnlineResumeGrade {
	CandidateGetOnlineResumeGrade
}
`,
// 在线简历-编辑设置进度
` 
mutation CandidateEditOnlineResumeGrade($grade: Int!) {
	CandidateEditOnlineResumeGrade(grade: $grade)
}
`,













// 招聘方获取已经发布的职位列表
` 
query UserGetJobListByEntId($status: JobStatus, $pageSize: Int) {
	UserGetJobListByEntId(status: $status, pageSize: $pageSize) {
		count
		data {
			... on JobDataBriefly {
				id
				job_id
				title
				category
				address_description
				min_salary
				max_salary
				min_experience
				min_education
				full_time_job
				emergency
				createdAt
				status
			}
		}
	}
}
`,


// 招聘方获取人才列表
` 
query ENTSearchCandidates($filter: TalentListFilter, $pageSize: Int, $page: Int) {
	ENTSearchCandidates(filter: $filter, pageSize: $pageSize, page: $page) {
		count
		data {
			id
			age
			name
			gender
			education
			experience
			job_expectation
			current_city
			last_log_out_time
			interview_status
			resume_data
		}
	}
}
`,

// 获取当前招聘者在公司的职位
` 
query ENTGetAccountInfo {
	ENTGetAccountInfo {
		pos
	}
}
`,

// 招聘方发布职位

` 
mutation HRPostJob($info: JobPost!) {
	HRPostJob(info: $info)
}
`,

// 招聘方编辑职位
` 
mutation HREditJob($info: JobEdit!) {
	HREditJob(info: $info)
}
`,


// 招聘方隐藏职位

` 
mutation HRHideJob($jobId: Int!) {
	HRHideJob(jobId: $jobId)
}
`,

// 编辑招聘方在公司的职位
` 
mutation ENTEditAccountInfo($pos: String) {
	ENTEditAccountInfo(pos: $pos)
}
`,

// 编辑用户手机号
` 
mutation UserChangePhoneNumber($newNum: String!) {
	UserChangePhoneNumber(newNum: $newNum)
}
`,

// 编辑用户邮箱
` 
mutation UserEditEmail($email: String!, $code: String!) {
	UserEditEmail(newEmail: $email, code: $code)
}
`,

]

let RELOAD_ITEM_LIST = {}
ITEM_LIST.map(item => {
	let matchList = item.match(/(\S)* (\S)*(?=(\(|( \{)))/)[0].split(' ')
	let operationName = matchList[1]
	RELOAD_ITEM_LIST[operationName] = (paramList = {}, optionList = {}) => HTRequest.gqlRequest(item, operationName, matchList, paramList, optionList)
})

// 上传文件
RELOAD_ITEM_LIST.CommonSingleUpload = HTRequest.gqlUpload

// 普通 http 请求
RELOAD_ITEM_LIST.request = HTRequest.request

export default RELOAD_ITEM_LIST
