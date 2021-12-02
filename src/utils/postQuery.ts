import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  split,
  ApolloLink,
  HttpLink,
} from "@apollo/client"
import { hostUri, wssUri } from "./config"
import { WebSocketLink, } from '@apollo/link-ws'
import { getMainDefinition } from '@apollo/client/utilities';

let apolloClientShare: ApolloClient<any>

const initApolloClient = (Authorization: string) => {
  const ws = new WebSocketLink({
    uri: wssUri,
    options: {
      reconnect: true,
      connectionParams: {
        Authorization: Authorization,
      }
    },
  });

  const http = new HttpLink({
    uri: hostUri,
    headers: {
      Authorization: Authorization,
    }
  })

  const newLink = split(
    ({ query }) => {
      const def = getMainDefinition(query);
      return def.kind === 'OperationDefinition' && def.operation === 'subscription';
    },
    ws,
    http,
  )
  apolloClientShare = new ApolloClient({
    // uri: hostUri,
    link: newLink,
    cache: new InMemoryCache(),
  })
  return apolloClientShare
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
`;

const sendSMSGql = gql`
  query StaticSendSms( $phoneNumber:String! ) {
    StaticSendSms(phoneNumber:$phoneNumber)
  }
`

const numberCheckGql = gql`
  query UserNumberCheck( $num:String! ) {
    UserNumberCheck(num:$num)
  }
  `

const testGql = gql`
  query rates($currency:String!) {
    rates(currency:$currency){
      currency
    }
  }
`

const loginGql = gql`
  query UserLogIn( $info:LogIn! ) {
    UserLogIn(info:$info) {
      username
      token
      createdAt
    }
  }
`

const registerGql = gql`
  query UserRegister( $info:Register! ) {
    UserRegister(info:$info)
  }
`

// 重置密码
const resetPasswordGql = gql`
  mutation UserResetPassword( $info:ResetPassword! ) {
    UserResetPassword(info:$info)
  }
`

// check 验证码
const checkUserVerifyCodeConsumeGql = gql`
  query UserVerifyCodeConsume( $info:VerifyInfo! ) {
    UserVerifyCodeConsume(info:$info)
  }
`

// subscription message
const subscriptionGqlServerGql = gql`
  subscription newMessage{
    newMessage{
      messageContent
    }
  }
`

// 选择身份
const chooseOrSwitchIdentityGql = gql`
  mutation UserChooseOrSwitchIdentity($targetIdentity:String!,$role:String!){
    UserChooseOrSwitchIdentity(targetIdentity:$targetIdentity,role:$role)
  }
`

const getAllRegionGql = gql`
  query StaticGetAllRegion{
    StaticGetAllRegion{
    data{
      Cities{
        name
        city_id
      }
      name
    }
  }
}
`

const getUserEditPersonalDataGql = gql`
  mutation UserEditPersonalData($info:BasicData!){
    UserEditPersonalData(info:$info)
  }
`

const getENTEditEnterpriseBasicInfoGql = gql`
  mutation ENTEditEnterpriseBasicInfo ($info:EditEnterpriseBasicInfo!){
    ENTEditEnterpriseBasicInfo (info:$info)
  }
`

const getCandidateGetAllJobExpectationsGql = gql`
  query CandidateGetAllJobExpectations{
    CandidateGetAllJobExpectations{
      job_category
      aimed_city
      min_salary_expectation
      max_salary_expectation
    }
  }
`

const getCandidateGetJobListGql = gql`
  query CandidateGetJobList($filter:JobFilter!){
    CandidateGetJobList(filter:$filter){
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
const getGetEnterpriseGql = gql`
  query CandidateGetEnterpriseDetail_EntInfo($entId:Int!){
    CandidateGetEnterpriseDetail_EntInfo(entId:$entId) {
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
 * 获取职位详情
 */
const getJobDetailGql = gql`
 query CandidateGetJob($jobid:Int!){
    CandidateGetJob(jobid:$jobid) {
        job{
            id
            title
            category
            detail
            address_coordinate
      #       adress_description
            salaryExpected
            experience
            education
            required_num
            full_time_job
            tags
            updatedAt
          }
        hr{
          id
          name
          pos
          last_log_out_time
          # logo
        }
        company{
          id
          name
          address_coordinates
          address_description
    #       industry_involved
          business_nature
    #       enterprise_logo
        }
  }
 }
`

export {
  apolloClientShare,
  initApolloClient,
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
}