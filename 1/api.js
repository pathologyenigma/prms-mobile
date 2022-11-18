
/* 

api for login

{
	info: {
		account String!
		password String
		deviceId String
	}
}

*/ 
`
query UserLogIn($info: LogIn!) {
	UserLogIn(info: $info) {
		id 
		username 
		createdAt 
		token 
	}
}
`,

/* 

check if the input num is availiable or not

{
	num: String!
}

*/ 
`
query UserNumberCheck($num: String!) {
	UserNumberCheck(num: $num) 
}
`,

/* 

get Province data

*/ 
`
query StaticGetProvinces {
	StaticGetProvinces {
		province_id 
		name 
	}
}
`,

/* 

get all cities of the given province

{
	provinceId: String!
}

*/ 
`
query StaticGetCities($provinceId: String!) {
	StaticGetCities(provinceId: $provinceId) {
		city_id 
		name 
	}
}
`,

/* 

get all counties of the given city

{
	cityId: String!
}

*/ 
`
query StaticGetCounties($cityId: String!) {
	StaticGetCounties(cityId: $cityId) {
		county_id 
		name 
	}
}
`,

/* 

get all town of the given county

{
	countyId: String!
}

*/ 
`
query StaticGetTowns($countyId: String!) {
	StaticGetTowns(countyId: $countyId) {
		town_id 
		name 
	}
}
`,

/* 

send a verify code to the given number, if phoneNumber not provider and has token in header, will send to the user's phone number

{
	phoneNumber: String
}

*/ 
`
query StaticSendSms($phoneNumber: String) {
	StaticSendSms(phoneNumber: $phoneNumber) 
}
`,

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

QNPhoneNumberCheck

{
	phoneNumber: String, 
	verifyCode: String
}

*/ 
`
query QNPhoneNumberCheck($phoneNumber: String, $verifyCode: String) {
	QNPhoneNumberCheck(phoneNumber: $phoneNumber, verifyCode: $verifyCode) 
}
`,

/* 

true means already inserted

{
	idCardNum: String!
}

*/ 
`
query QNCheckIdCardNumber($idCardNum: String!) {
	QNCheckIdCardNumber(idCardNum: $idCardNum) 
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
	CandidateCheckResumeCompletion 
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
	page: Int
}

*/ 
`
query AdminGetCensorList($pageSize: Int, $page: Int) {
	AdminGetCensorList(pageSize: $pageSize, page: $page) {
		total 
		rows {
			_id 
			enterpriseName 
			charter 
		}
	}
}
`,

/* 

StaticGetAllRegion

*/ 
`
query StaticGetAllRegion {
	StaticGetAllRegion {
		data {
			province_id 
			name 
			Cities {
				city_id 
				name 
				Counties {
					county_id 
					name 
					Towns {
						town_id 
						name 
					}
				}
			}
		}
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

just tests

{
	pageSize: Int, 
	lastIndex: String
}

*/ 
`
query TestShowDatas($pageSize: Int, $lastIndex: String) {
	TestShowDatas(pageSize: $pageSize, lastIndex: $lastIndex) {
		_id 
		data {
			name 
			number 
			idCardNum 
			education 
			city 
			skills 
		}
	}
}
`,

/* 

if page not provided it will be 0,for pageSize it will be 10

{
	targetId: Int!, 
	page: Int, 
	pageSize: Int
}

*/ 
`
query UserGetMessages($targetId: Int!, $page: Int, $pageSize: Int) {
	UserGetMessages(targetId: $targetId, page: $page, pageSize: $pageSize) {
		messages {
			from 
			messageType 
			messageContent 
			to 
			uuid 
			createdAt 
		}
		count 
		page 
		pageSize 
	}
}
`,

/* 

CandidateGetAllJobExpectations

*/ 
`
query CandidateGetAllJobExpectations {
	CandidateGetAllJobExpectations {
		id 
		job_category 
		aimed_city 
		industry_involved 
		min_salary_expectation 
		max_salary_expectation 
		full_time_job 
	}
}
`,

/* 

CandidateGetJobList

{
	filter: {
		salaryExpected [Int]
		experience Int
		education enum Education {    LessThanPrime,    Primary,    Junior,    High,    JuniorCollege,    RegularCollege,    Postgraduate,    Doctor  }
		enterpriseSize enum EnterpriseSize {    LessThanFifteen,     FifteenToFifty,     FiftyToOneHundredFifty,     OneHundredFiftyToFiveHundreds,     FiveHundredsToTwoThousands,     MoreThanTwoThousands  }
		enterpriseFinancing enum EnterpriseFinancing {    NotYet,    AngelFinancing,    A,    B,    C,    D,    Listed,    NoNeed  }
		sortWithDistance [Float]
		category [String]
		full_time_job enum {Full,        Part,        InternShip}
		page Int
		pageSize Int
	}
}

*/ 
`
query CandidateGetJobList($filter: JobFilter) {
	CandidateGetJobList(filter: $filter) {
		page 
		pageSize 
		count 
		data {
			job_id 
			hr_name 
			hr_pos 
			title 
			category 
			address_coordinate 
			address_description 
			min_salary 
			max_salary 
			min_experience 
			min_education 
			ontop 
			full_time_job 
			tags 
			comp_name 
			comp_size 
			comp_financing 
			logo 
			emergency 
			createdAt 
			updatedAt 
			status 
			views 
			resumeCount 
		}
	}
}
`,

/* 

UserGetEnterpriseDetail_EntInfo

{
	entId: Int
}

*/ 
`
query UserGetEnterpriseDetail_EntInfo($entId: Int) {
	UserGetEnterpriseDetail_EntInfo(entId: $entId) {
		id 
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
		job_counter 
		abbreviation 
		jobs {
			job_id 
			hr_name 
			hr_pos 
			title 
			category 
			address_coordinate 
			address_description 
			min_salary 
			max_salary 
			min_experience 
			min_education 
			ontop 
			full_time_job 
			tags 
			comp_name 
			comp_size 
			comp_financing 
			logo 
			emergency 
			createdAt 
			updatedAt 
			status 
			views 
			resumeCount 
		}
	}
}
`,

/* 

UserGetEnterpriseDetail_WorkerList

{
	entId: Int, 
	role: enum Role {    HR,    Teacher,    Admin,    None  }
}

*/ 
`
query UserGetEnterpriseDetail_WorkerList($entId: Int, $role: EnterpriseRole) {
	UserGetEnterpriseDetail_WorkerList(entId: $entId, role: $role) {
		id 
		name 
		logo 
		pos 
		createdAt 
		role 
		disabled 
	}
}
`,

/* 

CandidateGetEnterpriseDetail_InterviewRecomment

{
	entId: Int
}

*/ 
`
query CandidateGetEnterpriseDetail_InterviewRecomment($entId: Int) {
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

/* 

CandidateGetHRDetail_HRInfo

{
	hrId: Int
}

*/ 
`
query CandidateGetHRDetail_HRInfo($hrId: Int) {
	CandidateGetHRDetail_HRInfo(hrId: $hrId) {
		name 
		pos 
		last_log_out_time 
		company_belonged 
		logo 
	}
}
`,

/* 

CandidateGetHRDetail_RecommendationsList

{
	hrId: Int!
}

*/ 
`
query CandidateGetHRDetail_RecommendationsList($hrId: Int!) {
	CandidateGetHRDetail_RecommendationsList(hrId: $hrId) {
		data {
			id 
			title 
			category 
			address 
			loc 
			experience 
			education 
			salary 
			createdAt 
			updatedAt 
			views 
			resumeCount 
			expired_at 
			status 
			logo 
			hr_name 
		}
		count 
	}
}
`,

/* 

CandidateGetHRDetail_JobListPageView

{
	hrId: Int!, 
	pageSize: Int, 
	page: Int
}

*/ 
`
query CandidateGetHRDetail_JobListPageView($hrId: Int!, $pageSize: Int, $page: Int) {
	CandidateGetHRDetail_JobListPageView(hrId: $hrId, pageSize: $pageSize, page: $page) {
		count 
		data {
			... on JobDataForHRDetailPageOrEntJobList {
				id 
				title 
				category 
				address 
				loc 
				experience 
				education 
				salary 
				createdAt 
				updatedAt 
				views 
				resumeCount 
				expired_at 
				status 
				logo 
				hr_name 
			}
			... on JobDataBriefly {
				job_id 
				hr_name 
				hr_pos 
				title 
				category 
				address_coordinate 
				address_description 
				min_salary 
				max_salary 
				min_experience 
				min_education 
				ontop 
				full_time_job 
				tags 
				comp_name 
				comp_size 
				comp_financing 
				logo 
				emergency 
				createdAt 
				updatedAt 
				status 
				views 
				resumeCount 
			}
		}
	}
}
`,

/* 

UserGetJobListByEntId

{
	entId: Int, 
	pageSize: Int, 
	page: Int, 
	category: [String], 
	title: String, 
	workerId: Int, 
	status: enum JobStatus {    NotPublishedYet,    InRecruitment,    OffLine  }
}

*/ 
`
query UserGetJobListByEntId($entId: Int, $pageSize: Int, $page: Int, $category: [String], $title: String, $workerId: Int, $status: JobStatus) {
	UserGetJobListByEntId(entId: $entId, pageSize: $pageSize, page: $page, category: $category, title: $title, workerId: $workerId, status: $status) {
		count 
		data {
			... on JobDataForHRDetailPageOrEntJobList {
				id 
				title 
				category 
				address 
				loc 
				experience 
				education 
				salary 
				createdAt 
				updatedAt 
				views 
				resumeCount 
				expired_at 
				status 
				logo 
				hr_name 
			}
			... on JobDataBriefly {
				job_id 
				hr_name 
				hr_pos 
				title 
				category 
				address_coordinate 
				address_description 
				min_salary 
				max_salary 
				min_experience 
				min_education 
				ontop 
				full_time_job 
				tags 
				comp_name 
				comp_size 
				comp_financing 
				logo 
				emergency 
				createdAt 
				updatedAt 
				status 
				views 
				resumeCount 
			}
		}
	}
}
`,

/* 

UserGetContractList

*/ 
`
query UserGetContractList {
	UserGetContractList {
		... on Contract {
			id 
			logo 
			name 
			pos 
			ent 
			last_msg 
			last_msg_time 
			job 
		}
		... on Talent {
			id 
			logo 
			job 
			name 
			gender 
			age 
			exp 
			job_category_expectation 
			city_expectation 
			salary_expectations 
			job_status 
			last_log_out_time 
			last_msg 
			last_msg_time 
			skills 
			personal_advantage 
		}
	}
}
`,

/* 

UserGetBasicInfo

*/ 
`
query UserGetBasicInfo {
	UserGetBasicInfo {
		id 
		username 
		image_url 
		gender 
		birth_date 
		current_city 
		first_time_working 
		education 
		phone_number 
		email 
		disabled 
	}
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
		total 
		rows {
			id 
			username 
			image_url 
			gender 
			birth_date 
			current_city 
			first_time_working 
			education 
			phone_number 
			email 
			disabled 
		}
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

StaticSendEmail

{
	emailAddress: String!
}

*/ 
`
query StaticSendEmail($emailAddress: String!) {
	StaticSendEmail(emailAddress: $emailAddress) 
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

UserSearchEnterprise

{
	keyword: String!, 
	pageSize: Int, 
	page: Int
}

*/ 
`
query UserSearchEnterprise($keyword: String!, $pageSize: Int, $page: Int) {
	UserSearchEnterprise(keyword: $keyword, pageSize: $pageSize, page: $page) {
		count 
		data {
			id 
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
			job_counter 
			abbreviation 
			jobs {
				job_id 
				hr_name 
				hr_pos 
				title 
				category 
				address_coordinate 
				address_description 
				min_salary 
				max_salary 
				min_experience 
				min_education 
				ontop 
				full_time_job 
				tags 
				comp_name 
				comp_size 
				comp_financing 
				logo 
				emergency 
				createdAt 
				updatedAt 
				status 
				views 
				resumeCount 
			}
		}
	}
}
`,

/* 

ENTSearchCandidates

{
	filter: {
		keyword String
		sortByUpdatedTime Boolean
		category [String]
		education EducationRequired
		industry_involved [String]
		city [String]
		gender Boolean
		experience [Int]
		salary [Int]
		interview_status InterviewStatus
		age [Int]
		job_status enum JobStatus {    NotPublishedYet,    InRecruitment,    OffLine  }
	}, 
	pageSize: Int, 
	page: Int
}

*/ 
`
query ENTSearchCandidates($filter: TalentListFilter, $pageSize: Int, $page: Int) {
	ENTSearchCandidates(filter: $filter, pageSize: $pageSize, page: $page) {
		count 
		data {
			id 
			logo 
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
			job_status 
		}
	}
}
`,

/* 

UserGetJob

{
	jobid: Int
}

*/ 
`
query UserGetJob($jobid: Int) {
	UserGetJob(jobid: $jobid) {
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
			updated_at 
			status 
		}
		hr {
			id 
			name 
			pos 
			last_log_out_time 
			logo 
		}
		company {
			id 
			name 
			address_coordinates 
			address_description 
			industry_involved 
			business_nature 
			enterprise_logo 
			enterprise_size 
		}
	}
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

CandidateGetWorkExps

*/ 
`
query CandidateGetWorkExps {
	CandidateGetWorkExps {
		count 
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

CandidateGetOnlineResumeBasicInfo

*/ 
`
query CandidateGetOnlineResumeBasicInfo {
	CandidateGetOnlineResumeBasicInfo {
		skills 
		personal_advantage 
	}
}
`,

/* 

ENTGetAccountInfo

*/ 
`
query ENTGetAccountInfo {
	ENTGetAccountInfo {
		pos 
	}
}
`,

/* 

CandidateGetEduExps

*/ 
`
query CandidateGetEduExps {
	CandidateGetEduExps {
		count 
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

/* 

CandidateGetProjectExps

*/ 
`
query CandidateGetProjectExps {
	CandidateGetProjectExps {
		count 
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

CandidateGetOnlineResumeGrade

*/ 
`
query CandidateGetOnlineResumeGrade {
	CandidateGetOnlineResumeGrade 
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
		enterprise_name String
		tel String
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

CandidateSearchJob

{
	keyword: String, 
	filter: {
		salaryExpected [Int]
		experience Int
		education enum Education {    LessThanPrime,    Primary,    Junior,    High,    JuniorCollege,    RegularCollege,    Postgraduate,    Doctor  }
		enterpriseSize enum EnterpriseSize {    LessThanFifteen,     FifteenToFifty,     FiftyToOneHundredFifty,     OneHundredFiftyToFiveHundreds,     FiveHundredsToTwoThousands,     MoreThanTwoThousands  }
		enterpriseFinancing enum EnterpriseFinancing {    NotYet,    AngelFinancing,    A,    B,    C,    D,    Listed,    NoNeed  }
		sortWithDistance [Float]
		category [String]
		full_time_job enum {Full,        Part,        InternShip}
		page Int
		pageSize Int
	}
}

*/ 
`
query CandidateSearchJob($keyword: String, $filter: JobFilter) {
	CandidateSearchJob(keyword: $keyword, filter: $filter) {
		page 
		pageSize 
		count 
		data {
			job_id 
			hr_name 
			hr_pos 
			title 
			category 
			address_coordinate 
			address_description 
			min_salary 
			max_salary 
			min_experience 
			min_education 
			ontop 
			full_time_job 
			tags 
			comp_name 
			comp_size 
			comp_financing 
			logo 
			emergency 
			createdAt 
			updatedAt 
			status 
			views 
			resumeCount 
		}
	}
}
`,

/* 

CandidateGetHRIdByWorkerId

{
	id: Int!
}

*/ 
`
query CandidateGetHRIdByWorkerId($id: Int!) {
	CandidateGetHRIdByWorkerId(id: $id) 
}
`,

/* 

UserGetUsernameAndLogoWithId

{
	user_id: Int!
}

*/ 
`
query UserGetUsernameAndLogoWithId($user_id: Int!) {
	UserGetUsernameAndLogoWithId(user_id: $user_id) {
		username 
		logo 
	}
}
`,

/* 

HRGetCandidateResume

{
	candidate_id: Int!
}

*/ 
`
query HRGetCandidateResume($candidate_id: Int!) {
	HRGetCandidateResume(candidate_id: $candidate_id) 
}
`,

/* 

HRGetResumeByResumeDeliveryRecordId

{
	id: Int!
}

*/ 
`
query HRGetResumeByResumeDeliveryRecordId($id: Int!) {
	HRGetResumeByResumeDeliveryRecordId(id: $id) 
}
`,

/* 

HRGetResumeDeliveryRecord

*/ 
`
query HRGetResumeDeliveryRecord {
	HRGetResumeDeliveryRecord 
}
`,

/* 

api for register

{
	info: {
		username String!
		email String
		password String!
		confirmPassword String!
		phoneNumber String!
	}
}

*/ 
`
mutation UserRegister($info: Register!) {
	UserRegister(info: $info) 
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

leave extraAttributes null for default upload options

{
	file: Upload!, 
	extraAttributes: {
		customUploadPath String
		customFileName String
		customFileType enum CustomFileType {    Charter,    Resume,    Photo,    Other  }
	}
}

*/ 
`
mutation CommonSingleUpload($file: Upload!, $extraAttributes: UploadExtraAttributes) {
	CommonSingleUpload(file: $file, extraAttributes: $extraAttributes) 
}
`,

/* 

HRPostJob

{
	info: {
		jobTitle String!
		workingAddress [String]!
		experience Int!
		salary [Int]!
		education EducationRequired!
		description String!
		requiredNum Int!
		isFullTime enum {Full,        Part,        InternShip}
		tags [String]!
		coordinates [Float]!
		onLineTimes [String]
		publishNow Boolean!
		category [String]!
	}
}

*/ 
`
mutation HRPostJob($info: JobPost!) {
	HRPostJob(info: $info) 
}
`,

/* 

HREditJob

{
	info: {
		id Int!
		jobTitle String!
		workingAddress [String]!
		experience Int!
		salary [Int]!
		education EducationRequired!
		description String!
		requiredNum Int!
		isFullTime enum {Full,        Part,        InternShip}
		tags [String]!
		coordinates [Float]!
		onLineTimes [String]
		publishNow Boolean!
		category [String]!
	}
}

*/ 
`
mutation HREditJob($info: JobEdit!) {
	HREditJob(info: $info) 
}
`,

/* 

insert or edit a personal data

{
	info: {
		logo String
		username String
		birthday String
		gender Boolean
		currentCity String
		education enum Education {    LessThanPrime,    Primary,    Junior,    High,    JuniorCollege,    RegularCollege,    Postgraduate,    Doctor  }
		firstTimeWorking String
	}
}

*/ 
`
mutation UserEditBasicInfo($info: BasicData!) {
	UserEditBasicInfo(info: $info) 
}
`,

/* 

insert or edit a personal advantage

{
	advantage: String!
}

*/ 
`
mutation CandidateEditPersonalAdvantage($advantage: String!) {
	CandidateEditPersonalAdvantage(advantage: $advantage) 
}
`,

/* 

insert or edit a work experience

{
	info: {
		id Int
		compName String
		posName String
		department String
		startAt String
		endAt String
		workDetail String
		hideFromThisCompany Boolean!
	}
}

*/ 
`
mutation CandidateEditWorkExprience($info: WorkExperience!) {
	CandidateEditWorkExprience(info: $info) 
}
`,

/* 

insert or edit a education experience

{
	info: {
		id Int
		schoolName String
		education enum Education {    LessThanPrime,    Primary,    Junior,    High,    JuniorCollege,    RegularCollege,    Postgraduate,    Doctor  }
		isFullTime Boolean
		major String
		time String
		exp_at_school String
	}
}

*/ 
`
mutation CandidateEditEduExp($info: EduExp) {
	CandidateEditEduExp(info: $info) 
}
`,

/* 

insert or edit a project experience

{
	info: {
		id Int
		projectName String
		role String
		startAt String
		endAt String
		description String
		performance String
	}
}

*/ 
`
mutation CandidateEditProExp($info: ProExp) {
	CandidateEditProExp(info: $info) 
}
`,

/* 

if wanted to send the online one, then don't need to pass resumeId

{
	resumeId: Int, 
	jobId: Int!, 
	hrId: Int!, 
	compId: Int!
}

*/ 
`
mutation CandidateSendResume($resumeId: Int, $jobId: Int!, $hrId: Int!, $compId: Int!) {
	CandidateSendResume(resumeId: $resumeId, jobId: $jobId, hrId: $hrId, compId: $compId) 
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

switch to another indentity if exists, should pass indetity and role, Identity and role types are enums, checkout their type definitions, return token

{
	targetIdentity: enum {    PersonalUser,    EnterpriseUser,    Administrator,    Counselor,  }, 
	role: enum Role {    HR,    Teacher,    Admin,    None  }
}

*/ 
`
mutation UserChooseOrSwitchIdentity($targetIdentity: Identity!, $role: EnterpriseRole) {
	UserChooseOrSwitchIdentity(targetIdentity: $targetIdentity, role: $role) 
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

only availiable when token is expired and not dead

*/ 
`
mutation UserRefreshToken {
	UserRefreshToken 
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

UserSendMessage

{
	info: {
		to Int!
		messageType enum {    Normal,    System,    Resume,    InterviewInvitation,    Other    }
		messageContent String!
		jobId Int
	}
}

*/ 
`
mutation UserSendMessage($info: SendMessage!) {
	UserSendMessage(info: $info) 
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

CandidateEditSkills

{
	skills: [String]!
}

*/ 
`
mutation CandidateEditSkills($skills: [String]!) {
	CandidateEditSkills(skills: $skills) 
}
`,

/* 

CandidateEditJobExpectations

{
	info: {
		id Int
		job_category [String]
		industry_involved [String]
		aimed_city String
		min_salary_expectation Int
		max_salary_expectation Int
		full_time_job enum {Full,        Part,        InternShip}
	}
}

*/ 
`
mutation CandidateEditJobExpectations($info: EditJobExpectation!) {
	CandidateEditJobExpectations(info: $info) 
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

HRHideJob

{
	jobId: Int!
}

*/ 
`
mutation HRHideJob($jobId: Int!) {
	HRHideJob(jobId: $jobId) 
}
`,

/* 

UserChangePhoneNumber

{
	newNum: String!
}

*/ 
`
mutation UserChangePhoneNumber($newNum: String!) {
	UserChangePhoneNumber(newNum: $newNum) 
}
`,

/* 

UserEditEmail

{
	newEmail: String!, 
	code: String!
}

*/ 
`
mutation UserEditEmail($newEmail: String!, $code: String!) {
	UserEditEmail(newEmail: $newEmail, code: $code) 
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

UserAddJobExpectation

{
	info: {
		id Int
		job_category [String]
		industry_involved [String]
		salary [Int]
		aimed_city String
		full_time_job enum {Full,        Part,        InternShip}
	}
}

*/ 
`
mutation UserAddJobExpectation($info: UserExpectation!) {
	UserAddJobExpectation(info: $info) 
}
`,

/* 

UserVerifyCodeConsume

{
	info: {
		phoneNumber String!
		verifyCode String!
		operation String!
	}
}

*/ 
`
mutation UserVerifyCodeConsume($info: VerifyInfo) {
	UserVerifyCodeConsume(info: $info) 
}
`,

/* 

first time adding job_expectation
will cause token regenerate
and will get the new token in reply

{
	info: {
		id Int
		job_category [String]
		industry_involved [String]
		salary [Int]
		aimed_city String
		full_time_job enum {Full,        Part,        InternShip}
	}
}

*/ 
`
mutation UserEditJobExpectation($info: UserExpectation!) {
	UserEditJobExpectation(info: $info) 
}
`,

/* 

ENTEditAccountInfo

{
	pos: String
}

*/ 
`
mutation ENTEditAccountInfo($pos: String) {
	ENTEditAccountInfo(pos: $pos) 
}
`,

/* 

CandidateRemoveEduExp

{
	id: Int!
}

*/ 
`
mutation CandidateRemoveEduExp($id: Int!) {
	CandidateRemoveEduExp(id: $id) 
}
`,

/* 

CandidateRemoveProExp

{
	id: Int!
}

*/ 
`
mutation CandidateRemoveProExp($id: Int!) {
	CandidateRemoveProExp(id: $id) 
}
`,

/* 

CandidateRemoveWorkExp

{
	id: Int!
}

*/ 
`
mutation CandidateRemoveWorkExp($id: Int!) {
	CandidateRemoveWorkExp(id: $id) 
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

if your grade is 90.3% like this,
send 90

{
	grade: Int!
}

*/ 
`
mutation CandidateEditOnlineResumeGrade($grade: Int!) {
	CandidateEditOnlineResumeGrade(grade: $grade) 
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

/* 

newMessage

*/ 
`
subscription newMessage {
	newMessage {
		from 
		messageType 
		messageContent 
		to 
		uuid 
		createdAt 
	}
}
`,

/* 

newContract

*/ 
`
subscription newContract {
	newContract {
		id 
		logo 
		name 
		pos 
		ent 
		last_msg 
		last_msg_time 
		job 
	}
}
`,