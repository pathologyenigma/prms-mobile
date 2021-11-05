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

// const loginGql = ''

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

const GET_LOGIN = (account: string, password: string) => gql`
  query UserLogIn {
    UserLogIn (info:{
      account: "ccb"
      password:{
        isVerifyCode:false
        value: "ccb123123"
      }
    }){
      username
    }
  }
`

export {
  apolloClientShare,
  initApolloClient,
  GET_LOGIN,
}