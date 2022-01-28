import { gql, useMutation } from '@apollo/client'
import { useCallback } from 'react'

interface ConsumeResult {
  UserVerifyCodeConsume: null
}

export default function useEditPhoneNumber(phoneNumber: string, code: string) {
  const [verifyCodeConsume] = useMutation<ConsumeResult>(VerifyCodeConsume)
  const [updatePhoneNumber] = useMutation(UpdatePhoneNumber)

  const editPhoneNumber = useCallback(async () => {
    await verifyCodeConsume({
      variables: {
        info: {
          phoneNumber: phoneNumber,
          verifyCode: code,
          operation: 'UserChangePhoneNumber',
        },
      },
    })
    await updatePhoneNumber({
      variables: {
        newNum: phoneNumber,
      },
    })
  }, [fetch, phoneNumber, code])

  return editPhoneNumber
}

const VerifyCodeConsume = gql`
  mutation UserVerifyCodeConsume($info: VerifyInfo) {
    UserVerifyCodeConsume(info: $info)
  }
`
const UpdatePhoneNumber = gql`
  mutation UserChangePhoneNumber($newNum: String!) {
    UserChangePhoneNumber(newNum: $newNum)
  }
`
