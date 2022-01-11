import { gql, useLazyQuery } from '@apollo/client'
import { useCallback } from 'react'

export default function useEmailVerifyCode() {
  const [fetch, { loading, error }] = useLazyQuery(query)

  console.log(loading, error)

  const requestEmailVerifyCode = useCallback(
    (email: string) => {
      console.log('-------useEmailVerifyCode-----------')
      fetch({
        variables: {
          email: email,
        },
      })
    },
    [fetch],
  )

  return { requestEmailVerifyCode, loading, error }
}

const query = gql`
  query StaticSendEmail($email: String!) {
    StaticSendEmail(emailAddress: $email)
  }
`
