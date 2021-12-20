import { ApolloClient, gql } from '@apollo/client'

let apolloClientShare: ApolloClient<any>

export function setApolloClient(client: ApolloClient<any>) {
  apolloClientShare = client
}

export const GET_ALL_COUNTRIES = gql`
  query getAllCountry {
    getAllCountry {
      name
      id
      countryCode
      currencyCode
    }
  }
`

const sendSMSGql = gql`
  query StaticSendSms($phoneNumber: String!) {
    StaticSendSms(phoneNumber: $phoneNumber)
  }
`

const numberCheckGql = gql`
  query UserNumberCheck($num: String!) {
    UserNumberCheck(num: $num)
  }
`

const testGql = gql`
  query rates($currency: String!) {
    rates(currency: $currency) {
      currency
    }
  }
`

const loginGql = gql`
  query UserLogIn($info: LogIn!) {
    UserLogIn(info: $info) {
      username
      token
      createdAt
    }
  }
`

const registerGql = gql`
  query UserRegister($info: Register!) {
    UserRegister(info: $info)
  }
`

// 重置密码
const resetPasswordGql = gql`
  mutation UserResetPassword($info: ResetPassword!) {
    UserResetPassword(info: $info)
  }
`

// check 验证码
const checkUserVerifyCodeConsumeGql = gql`
  query UserVerifyCodeConsume($info: VerifyInfo!) {
    UserVerifyCodeConsume(info: $info)
  }
`

// subscription message
const subscriptionGqlServerGql = gql`
  subscription newMessage {
    newMessage {
      from
      messageType
      messageContent
      to
      uuid
    }
  }
`

// 获取和某人的消息记录
const userGetMessagesGql = gql`
  query UserGetMessages($targetId: Int!, $page: Int!, $pageSize: Int!) {
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
`

// 选择身份
const chooseOrSwitchIdentityGql = gql`
  mutation UserChooseOrSwitchIdentity(
    $targetIdentity: Identity!
    $role: EnterpriseRole!
  ) {
    UserChooseOrSwitchIdentity(targetIdentity: $targetIdentity, role: $role)
  }
`

const getAllRegionGql = gql`
  query StaticGetAllRegion {
    StaticGetAllRegion {
      data {
        Cities {
          name
          city_id
        }
        name
      }
    }
  }
`

const getUserEditPersonalDataGql = gql`
  mutation UserEditPersonalData($info: BasicData!) {
    UserEditPersonalData(info: $info)
  }
`

const getENTEditEnterpriseBasicInfoGql = gql`
  mutation ENTEditEnterpriseBasicInfo($info: EditEnterpriseBasicInfo!) {
    ENTEditEnterpriseBasicInfo(info: $info)
  }
`

const getCandidateGetAllJobExpectationsGql = gql`
  query CandidateGetAllJobExpectations {
    CandidateGetAllJobExpectations {
      job_category
      aimed_city
      min_salary_expectation
      max_salary_expectation
    }
  }
`

const getCandidateGetJobListGql = gql`
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
        expired_at
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
`

/**
 * 公司详情页的公司基本信息
 */
const candidateGetEnterpriseDetail_EntInfoGql = gql`
  query UserGetEnterpriseDetail_EntInfo($entId: Int!) {
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
`

/**
 * 公司详情页的公司基本信息
 */
const candidateGetEnterpriseDetail_HRListGql = gql`
  query CandidateGetEnterpriseDetail_HRList($entId: Int!) {
    CandidateGetEnterpriseDetail_HRList(entId: $entId) {
      id
      name
      logo
      pos
    }
  }
`

/**
 * 公司详情页的公司热门招聘官信息
 */
const candidateGetEnterpriseDetail_InterviewRecommentGql = gql`
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
`

/**
 * 公司详情页的公司问答
 */
const candidateGetEnterpriseDetail_QAGql = gql`
  query CandidateGetEnterpriseDetail_QA($entId: Int!) {
    CandidateGetEnterpriseDetail_QA(entId: $entId) {
      questionCount
      answerCount
      question
      answer
    }
  }
`

/**
 * 获取职位详情
 */
const getJobDetailGql = gql`
  query CandidateGetJob($jobid: Int!) {
    CandidateGetJob(jobid: $jobid) {
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
        updatedAt
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
`

const getHrBasicInfoGql = gql`
  query CandidateGetHRDetail_HRInfo($hrId: Int!) {
    CandidateGetHRDetail_HRInfo(hrId: $hrId) {
      name
      pos
      last_log_out_time
      company_belonged
      logo
    }
  }
`

const getHrMatchJobListGql = gql`
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
`

const getHrMoreJobListGql = gql`
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
`

// send message
const sendMessageGql = gql`
  mutation UserSendMessage($info: SendMessage!) {
    UserSendMessage(info: $info)
  }
`

const userGetContractListGql = gql`
  query UserGetContractList {
    UserGetContractList {
      id
      name
      pos
      ent
      last_msg
      last_msg_time
      # logo
    }
  }
`

export {
  apolloClientShare,
  sendSMSGql,
  loginGql,
  numberCheckGql,
  registerGql,
  getUserEditPersonalDataGql,
  getENTEditEnterpriseBasicInfoGql,
  resetPasswordGql,
  checkUserVerifyCodeConsumeGql,
  subscriptionGqlServerGql,
  testGql,
  chooseOrSwitchIdentityGql,
  getAllRegionGql,
  getCandidateGetAllJobExpectationsGql,
  getCandidateGetJobListGql,
  getJobDetailGql,
  getHrBasicInfoGql,
  getHrMatchJobListGql,
  getHrMoreJobListGql,
  sendMessageGql,
  userGetMessagesGql,
  candidateGetEnterpriseDetail_EntInfoGql,
  candidateGetEnterpriseDetail_HRListGql,
  candidateGetEnterpriseDetail_InterviewRecommentGql,
  candidateGetEnterpriseDetail_QAGql,
  userGetContractListGql,
}
