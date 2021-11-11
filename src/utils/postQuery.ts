import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client"
import { hostUri } from "./config";

let apolloClientShare: ApolloClient<any>

const initApolloClient = (Authorization: string) => {
  console.log('Authorization: ', Authorization)
  apolloClientShare = new ApolloClient({
    uri: hostUri,
    cache: new InMemoryCache(),
    headers: {
      'Authorization': Authorization
    }
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
  testGql
}