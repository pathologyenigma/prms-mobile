import { ApolloClient, gql } from '@apollo/client'
import * as Auth from './auth'

let _client: ApolloClient<any>

function setApolloClient(client: ApolloClient<any>) {
  _client = client
}

let _tokenTask: Promise<void> | null = null

async function _refreshToken() {
  try {
    const res = await _client.mutate({
      mutation: REFRESH_TOKEN,
    })
    if (res.data) {
      await Auth.setToken(res.data.UserRefreshToken)
      return
    }
    await Auth.logout()
  } finally {
    _tokenTask = null
  }
}

async function refreshToken() {
  if (!_tokenTask) {
    _tokenTask = _refreshToken()
  }
  return _tokenTask
}

const REFRESH_TOKEN = gql`
  mutation UserRefreshToken {
    UserRefreshToken
  }
`

export { setApolloClient, refreshToken }
