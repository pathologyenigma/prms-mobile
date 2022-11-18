/* 

get resume data, if cache id exists then will return the cache data, cache expired every 30 minutes

{
	resumeId: Int, 
	cacheId: String
}

*/ 
`
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
`,

/* 

gets InterviewSchedule

*/ 
`
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
`,

/* 

detail page for interview

{
	interviewId: Int!
}

*/ 
`
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
`,

/* 

get applicant by conditions, null for no limitation, null when no matched data

{
	filter: {
		token String!
		education String
		experience Int
		activeTime String
		age Int
		gender Boolean
		jobStatus enum ResumeJobStatus {    不想找工作的无业游民    NoJobButNoJob,    离职状态的求职者    NoJobButWantJob,    有工作，但无求职意向    OnTheJob,     准备跳槽下家的在职者    OnTheJobButLookingForAJob,    应届生    GraduatingStudent  }
		city String
		category String
		min_salary Int
		max_salary Int
	}
}

*/ 
`
query HRGetApplicants($filter: ApplicantFilter) {
	HRGetApplicants(filter: $filter) {
		data {
			applicantName 
			age 
			experience 
			education 
			salaryExpected 
			lastJobName 
			lastEnterpriseName 
			lastJobTime 
			personalAdvantage 
		}
	}
}
`,

/* 

CandidateCheckResumeCompletion

*/ 
`
query CandidateCheckResumeCompletion {
	CandidateCheckResumeCompletion() 
}
`,

/* 

ENTCheckEnterpriseIdentification

*/ 
`
query ENTCheckEnterpriseIdentification {
	ENTCheckEnterpriseIdentification {
		status 
		enterpriseName 
		charter 
		phoneNumber 
	}
}
`,

/* 

AdminGetCensorList

{
	pageSize: Int, 
	lastIndex: String
}

*/ 
`
query AdminGetCensorList($pageSize: Int, $lastIndex: String) {
	AdminGetCensorList(pageSize: $pageSize, lastIndex: $lastIndex) {
		_id 
		enterpriseName 
		charter 
	}
}
`,

/* 

ENTPrecheckForInviteWorkMate

{
	phoneNumber: String
}

*/ 
`
query ENTPrecheckForInviteWorkMate($phoneNumber: String) {
	ENTPrecheckForInviteWorkMate(phoneNumber: $phoneNumber) 
}
`,



/* 

AdminLogIn

{
	account: String!, 
	password: String!
}

*/ 
`
query AdminLogIn($account: String!, $password: String!) {
	AdminLogIn(account: $account, password: $password) {
		token 
		rights 
	}
}
`,

/* 

AdminGetUserList

{
	info: {
		id Int
		keyword String
		phoneNumber String
		currentCity String
		registerTime [String]
		isAvaliable Boolean
	}, 
	pageSize: Int, 
	page: Int
}

*/ 
`
query AdminGetUserList($info: UserListFilter, $pageSize: Int, $page: Int) {
	AdminGetUserList(info: $info, pageSize: $pageSize, page: $page) {
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

/* 

CandidateGetAllJobCategoriesByEntId

{
	entId: Int
}

*/ 
`
query CandidateGetAllJobCategoriesByEntId($entId: Int) {
	CandidateGetAllJobCategoriesByEntId(entId: $entId) 
}
`,



/* 

StaticGetHotJobs

{
	category: String!
}

*/ 
`
query StaticGetHotJobs($category: String!) {
	StaticGetHotJobs(category: $category) 
}
`,


/* 

UserGetRecruitmentList

{
	keyword: String, 
	appointment: Boolean, 
	page: Int, 
	pageSize: Int
}

*/ 
`
query UserGetRecruitmentList($keyword: String, $appointment: Boolean, $page: Int, $pageSize: Int) {
	UserGetRecruitmentList(keyword: $keyword, appointment: $appointment, page: $page, pageSize: $pageSize) 
}
`,



/* 

UserGetEnterpriseQuestions

{
	entId: Int, 
	needAnswerPreview: Int, 
	page: Int, 
	pageSize: Int
}

*/ 
`
query UserGetEnterpriseQuestions($entId: Int, $needAnswerPreview: Int, $page: Int, $pageSize: Int) {
	UserGetEnterpriseQuestions(entId: $entId, needAnswerPreview: $needAnswerPreview, page: $page, pageSize: $pageSize) {
		count 
		data {
			id 
			user_id 
			question_description 
			addtional_description 
			answerCount 
			answers {
				id 
				content 
				worker_id 
				thumbs 
				logo 
			}
			logo 
		}
	}
}
`,

/* 

HRGetInterviewcomments

{
	needReplys: Int, 
	onlyMine: Boolean
}

*/ 
`
query HRGetInterviewcomments($needReplys: Int, $onlyMine: Boolean) {
	HRGetInterviewcomments(needReplys: $needReplys, onlyMine: $onlyMine) 
}
`,

/* 

AdminGetHomePageDataCollection

*/ 
`
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
`,

/* 

AdminGetEntList

{
	info: {
		id Int
		full_name String
		phoneNumber String
		identifyTime [String]
		isAvaliable Boolean
	}, 
	page: Int, 
	pageSize: Int
}

*/ 
`
query AdminGetEntList($info: EntFilterForAdmin, $page: Int, $pageSize: Int) {
	AdminGetEntList(info: $info, page: $page, pageSize: $pageSize) 
}
`,

/* 

AdminGetJobList

{
	id: Int, 
	title: String, 
	isAvaliable: Boolean, 
	page: Int, 
	pageSize: Int
}

*/ 
`
query AdminGetJobList($id: Int, $title: String, $isAvaliable: Boolean, $page: Int, $pageSize: Int) {
	AdminGetJobList(id: $id, title: $title, isAvaliable: $isAvaliable, page: $page, pageSize: $pageSize) 
}
`,

/* 

AdminShowJobInfo

{
	job_id: Int!
}

*/ 
`
query AdminShowJobInfo($job_id: Int!) {
	AdminShowJobInfo(job_id: $job_id) {
		id 
		full_name 
		phoneNumber 
		identifyTime 
		title 
		category 
		city 
		detail 
		address_coordinate 
		address_description 
		min_salary 
		max_salary 
		min_experience 
		min_education 
		required_num 
		isAvaliable 
	}
}
`,

/* 

this api need you to pass the provider's phone number as the authorization header

{
	info: {
		name String!
		number String!
		idCardNum String!
		education enum Education {    LessThanPrime,    Primary,    Junior,    High,    JuniorCollege,    RegularCollege,    Postgraduate,    Doctor  }
		city String!
		skills [String]!
	}
}

*/ 
`
mutation QNInsertPersonalData($info: PersonalData!) {
	QNInsertPersonalData(info: $info) 
}
`,

/* 

if wanted to send the online one, then don't need to pass resumeId

{
	resumeId: Int, 
	targetUser: Int
}

*/ 
`
mutation CandidateSendResume($resumeId: Int, $targetUser: Int) {
	CandidateSendResume(resumeId: $resumeId, targetUser: $targetUser) 
}
`,

/* 

will create a interview data and set it to waiting, may return the interview id for dev version

{
	userId: Int!, 
	jobId: Int!, 
	time: [String]!
}

*/ 
`
mutation HRInviteInterview($userId: Int!, $jobId: Int!, $time: [String]!) {
	HRInviteInterview(userId: $userId, jobId: $jobId, time: $time) 
}
`,

/* 

cancel a interview, both side will have this authority, may failed when time is close to the appointed time

{
	interviewId: Int!
}

*/ 
`
mutation CommoncancelInterview($interviewId: Int!) {
	CommoncancelInterview(interviewId: $interviewId) 
}
`,

/* 

end a iterview with the description, need to tell the interview is passed or not, most of time the description is about some special situation

{
	interviewId: Int!, 
	ispassed: Boolean!, 
	description: String
}

*/ 
`
mutation HREndInterview($interviewId: Int!, $ispassed: Boolean!, $description: String) {
	HREndInterview(interviewId: $interviewId, ispassed: $ispassed, description: $description) 
}
`,

/* 

accept or reject an interview by id

{
	interviewId: Int!, 
	accept: Boolean!
}

*/ 
`
mutation CandidateAcceptOrRejectInterview($interviewId: Int!, $accept: Boolean!) {
	CandidateAcceptOrRejectInterview(interviewId: $interviewId, accept: $accept) 
}
`,

/* 

use phone number to reset password

{
	info: {
		phoneNumber String
		password String!
		confirmPassword String!
	}
}

*/ 
`
mutation UserResetPassword($info: ResetPassword!) {
	UserResetPassword(info: $info) 
}
`,

/* 

enterprise certification need censor

{
	info: {
		enterpriseName String!
		charter String!
		phoneNumber String
	}
}

*/ 
`
mutation UserEnterpriseIdentify($info: EnterpriseCharterSencorRequest!) {
	UserEnterpriseIdentify(info: $info) 
}
`,

/* 

enterprise certificate required, if not will return error

{
	info: {
		enterpriseName String
		abbreviation String
		enterpriseLocation [String]
		enterprisecCoordinate [Float]
		enterpriseNature enum EnterpriseNature {    ForeignVentures,    ForeignFundedEnterprises,     PrivateEnterprise,     StateOwnedEnterprises,     Extra  }
		enterpriseIndustry [String]
		enterpriseFinancing enum EnterpriseFinancing {    NotYet,    AngelFinancing,    A,    B,    C,    D,    Listed,    NoNeed  }
		enterpriseSize enum EnterpriseSize {    LessThanFifteen,     FifteenToFifty,     FiftyToOneHundredFifty,     OneHundredFiftyToFiveHundreds,     FiveHundredsToTwoThousands,     MoreThanTwoThousands  }
		enterpriseProfile String
		logo String
		establishedDate String
		homepage String
		tel String
	}
}

*/ 
`
mutation ENTEditEnterpriseBasicInfo($info: EditEnterpriseBasicInfo!) {
	ENTEditEnterpriseBasicInfo(info: $info) 
}
`,

/* 

ENTEditEnterpriseWorkTimeAndWelfare

{
	info: {
		workRule String
		restRule enum EnterpriseRestRule {    OneDayOffPerWeekend,     TwoDayOffPerWeekend,     StaggerWeekends,    ShiftWork  }
		welfare [String]
		overtimeWorkDegree enum EnterpriseOvertime {    None,    Paid,    SomeTime
		customTags [String]
	}
}

*/ 
`
mutation ENTEditEnterpriseWorkTimeAndWelfare($info: EnterpriseWorkTimeAndWelfare!) {
	ENTEditEnterpriseWorkTimeAndWelfare(info: $info) 
}
`,

/* 

ENTEditEnterpriseExtraData

{
	info: String!
}

*/ 
`
mutation ENTEditEnterpriseExtraData($info: String!) {
	ENTEditEnterpriseExtraData(info: $info) 
}
`,

/* 

CandidateRecruitmentApply

{
	recruitmentId: Int!
}

*/ 
`
mutation CandidateRecruitmentApply($recruitmentId: Int!) {
	CandidateRecruitmentApply(recruitmentId: $recruitmentId) 
}
`,

/* 

HRRecruitmentApply

{
	recruitmentId: Int!
}

*/ 
`
mutation HRRecruitmentApply($recruitmentId: Int!) {
	HRRecruitmentApply(recruitmentId: $recruitmentId) 
}
`,

/* 

AdminSetCensoredForAnItem

{
	_id: String!, 
	isPassed: Boolean, 
	description: String
}

*/ 
`
mutation AdminSetCensoredForAnItem($_id: String!, $isPassed: Boolean, $description: String) {
	AdminSetCensoredForAnItem(_id: $_id, isPassed: $isPassed, description: $description) 
}
`,

/* 

ENTInviteWorkMate

{
	phoneNumber: String!, 
	role: String, 
	pos: String
}

*/ 
`
mutation ENTInviteWorkMate($phoneNumber: String!, $role: String, $pos: String) {
	ENTInviteWorkMate(phoneNumber: $phoneNumber, role: $role, pos: $pos) 
}
`,

/* 

ENTInsertEnterpriseBasicInfo

{
	info: {
		enterpriseName String!
		abbreviation String!
		enterpriseLocation [String]!
		enterprisecCoordinate [Float]!
		enterpriseNature enum EnterpriseNature {    ForeignVentures,    ForeignFundedEnterprises,     PrivateEnterprise,     StateOwnedEnterprises,     Extra  }
		enterpriseIndustry [String]!
		enterpriseFinancing enum EnterpriseFinancing {    NotYet,    AngelFinancing,    A,    B,    C,    D,    Listed,    NoNeed  }
		enterpriseSize enum EnterpriseSize {    LessThanFifteen,     FifteenToFifty,     FiftyToOneHundredFifty,     OneHundredFiftyToFiveHundreds,     FiveHundredsToTwoThousands,     MoreThanTwoThousands  }
		enterpriseProfile String!
		logo String
		establishedDate String
		homepage String
		tel String
	}
}

*/ 
`
mutation ENTInsertEnterpriseBasicInfo($info: EnterpriseBasicInfo!) {
	ENTInsertEnterpriseBasicInfo(info: $info) 
}
`,

/* 

ENTEnterpriseWorkerRegister

{
	info: {
		role enum Role {    HR,    Teacher,    Admin,    None  }
		pos String!
	}
}

*/ 
`
mutation ENTEnterpriseWorkerRegister($info: EnterpriseWorkerInfo!) {
	ENTEnterpriseWorkerRegister(info: $info) 
}
`,

/* 

HRRemoveJob

{
	jobId: Int!
}

*/ 
`
mutation HRRemoveJob($jobId: Int!) {
	HRRemoveJob(jobId: $jobId) 
}
`,

/* 

ENTRecruitmentApply

{
	recruitmentId: Int!, 
	size: String
}

*/ 
`
mutation ENTRecruitmentApply($recruitmentId: Int!, $size: String) {
	ENTRecruitmentApply(recruitmentId: $recruitmentId, size: $size) 
}
`,

/* 

ENTRemoveWorker

{
	workerId: Int!, 
	role: enum Role {    HR,    Teacher,    Admin,    None  }
}

*/ 
`
mutation ENTRemoveWorker($workerId: Int!, $role: EnterpriseRole!) {
	ENTRemoveWorker(workerId: $workerId, role: $role) 
}
`,

/* 

ENTSetDisabled

{
	workerId: Int!
}

*/ 
`
mutation ENTSetDisabled($workerId: Int!) {
	ENTSetDisabled(workerId: $workerId) 
}
`,

/* 

the file uploaded in this api goes to preludeDatas folder

{
	file: Upload!
}

*/ 
`
mutation AdminUploadPreludeData($file: Upload!) {
	AdminUploadPreludeData(file: $file) 
}
`,

/* 

ENTSetEnabled

{
	id: Int!
}

*/ 
`
mutation ENTSetEnabled($id: Int!) {
	ENTSetEnabled(id: $id) 
}
`,

/* 

only supported enterprise user now

{
	job_id: Int!, 
	to: Int!, 
	prologue: Int!
}

*/ 
`
mutation UserSendPrologue($job_id: Int!, $to: Int!, $prologue: Int!) {
	UserSendPrologue(job_id: $job_id, to: $to, prologue: $prologue) 
}
`,

/* 

CandidateRemoveJobExpectation

{
	id: Int!
}

*/ 
`
mutation CandidateRemoveJobExpectation($id: Int!) {
	CandidateRemoveJobExpectation(id: $id) 
}
`,

/* 

AdminDisableUserAccount

{
	user_id: Int!
}

*/ 
`
mutation AdminDisableUserAccount($user_id: Int!) {
	AdminDisableUserAccount(user_id: $user_id) 
}
`,

/* 

AdminEnableUserAccount

{
	user_id: Int!
}

*/ 
`
mutation AdminEnableUserAccount($user_id: Int!) {
	AdminEnableUserAccount(user_id: $user_id) 
}
`,

/* 

AdminDisableEnterpriseUserAccount

{
	worker_id: Int!
}

*/ 
`
mutation AdminDisableEnterpriseUserAccount($worker_id: Int!) {
	AdminDisableEnterpriseUserAccount(worker_id: $worker_id) 
}
`,

/* 

AdminEnableEnterpriseUserAccount

{
	worker_id: Int!
}

*/ 
`
mutation AdminEnableEnterpriseUserAccount($worker_id: Int!) {
	AdminEnableEnterpriseUserAccount(worker_id: $worker_id) 
}
`,

/* 

AdminDisableEnterpriseMainAccount

{
	ent_id: Int!
}

*/ 
`
mutation AdminDisableEnterpriseMainAccount($ent_id: Int!) {
	AdminDisableEnterpriseMainAccount(ent_id: $ent_id) 
}
`,

/* 

AdminEnableEnterpriseMainAccount

{
	ent_id: Int!
}

*/ 
`
mutation AdminEnableEnterpriseMainAccount($ent_id: Int!) {
	AdminEnableEnterpriseMainAccount(ent_id: $ent_id) 
}
`,

/* 

AdminDisableJob

{
	job_id: Int!
}

*/ 
`
mutation AdminDisableJob($job_id: Int!) {
	AdminDisableJob(job_id: $job_id) 
}
`,

/* 

AdminEnableJob

{
	job_id: Int!
}

*/ 
`
mutation AdminEnableJob($job_id: Int!) {
	AdminEnableJob(job_id: $job_id) 
}
`,

/* 

AdminResetPassword

{
	oldOne: String, 
	newOne: String
}

*/ 
`
mutation AdminResetPassword($oldOne: String, $newOne: String) {
	AdminResetPassword(oldOne: $oldOne, newOne: $newOne) 
}
`,
