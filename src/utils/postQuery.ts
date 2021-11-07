import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client"
import { hostUri } from "./config";

let apolloClientShare: ApolloClient<any>

const initApolloClient = () => {
  apolloClientShare = new ApolloClient({
    uri: hostUri,
    cache: new InMemoryCache()
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

const loginGql = gql`
  query UserLogIn( $info:Login! ) {
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

export {
  apolloClientShare,
  initApolloClient,
  sendSMSGql,
  loginGql,
  numberCheckGql,
  registerGql,
}