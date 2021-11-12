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
  console.log('Authorization: ', Authorization)
  const ws = new WebSocketLink({
    uri: wssUri,
    options: {
      reconnect: true,
      connectionParams: {
        Authorization: Authorization || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImNjYjI3ODUiLCJkZWFkVGltZSI6IjE2MzY3NDM0NDkxNDk4NjQwMDAwMCIsImlhdCI6MTYzNjc0MzQ0OSwiZXhwIjoxNjM2NzQ3MDQ5fQ.VYeafdauTFk-OVr_xDS3kcE_HTZsP5Lb17G5OOMy2ZM',
      }
    },
  });

  const http = new HttpLink({ uri: hostUri })

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
    headers: {
      Authorization: Authorization || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImNjYjI3ODUiLCJkZWFkVGltZSI6IjE2MzY3NDM0NDkxNDk4NjQwMDAwMCIsImlhdCI6MTYzNjc0MzQ0OSwiZXhwIjoxNjM2NzQ3MDQ5fQ.VYeafdauTFk-OVr_xDS3kcE_HTZsP5Lb17G5OOMy2ZM'
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

// subscription message
const subscriptionGqlServerGql = gql`
  subscription newMessage{
    newMessage{
      messageContent
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
  testGql
}