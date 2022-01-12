import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useCallback, useEffect } from 'react'

interface ConsumeResult {
  UserVerifyCodeConsume: null
}

export default function useEditPhoneNumber(phoneNumber: string, code: string) {
  const [fetch, { data }] = useLazyQuery<ConsumeResult>(query)
  const [update] = useMutation(mutation)

  const editPhoneNumber = useCallback(async () => {
    fetch({
      variables: {
        info: {
          phoneNumber: phoneNumber,
          verifyCode: code,
          operation: 'UserChangePhoneNumber',
        },
      },
    })
  }, [fetch, phoneNumber, code])

  useEffect(() => {
    if (data) {
      update({
        variables: {
          newNum: phoneNumber,
        },
      })
    }
  }, [update, data])

  return editPhoneNumber
}

const query = gql`
  query UserVerifyCodeConsume($info: VerifyInfo) {
    UserVerifyCodeConsume(info: $info)
  }
`
const mutation = gql`
  mutation UserChangePhoneNumber($newNum: String!) {
    UserChangePhoneNumber(newNum: $newNum)
  }
`
