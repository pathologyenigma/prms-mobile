import { gql, useMutation } from '@apollo/client'
import { useCallback } from 'react'

export default function useEditEmail() {
  const [fn] = useMutation(mutation)

  const editEmail = useCallback(
    async (email: string, code: string) => {
      await fn({
        variables: {
          email: email,
          code: code,
        },
      })
    },
    [fn],
  )

  return editEmail
}

const mutation = gql`
  mutation UserEditEmail($email: String!, $code: String!) {
    UserEditEmail(newEmail: $email, code: $code)
  }
`
