import { gql, useLazyQuery } from '@apollo/client'
import { useCallback } from 'react'

export default function useSmsVerifyCode() {
  const [fetch, { loading, error }] = useLazyQuery(query)

  const requestSmsVerifyCode = useCallback(
    (phoneNumber: string) => {
      fetch({
        variables: {
          phoneNumber: phoneNumber,
        },
      })
    },
    [fetch],
  )

  return { requestSmsVerifyCode, loading, error }
}

const query = gql`
  query StaticSendSms($phoneNumber: String) {
    StaticSendSms(phoneNumber: $phoneNumber)
  }
`
