import { gql, useMutation } from '@apollo/client'
import { useCallback } from 'react'

interface ProfileInput {
  logo?: string
  username?: string
  gender?: boolean
}

function isValidName(name: string) {
  return name.length >= 6 && name.length <= 12
}

export default function useEditProfile() {
  const [edit] = useMutation(mutation)

  const editProfile = useCallback(
    async (info: ProfileInput) => {
      if (info.username) {
        if (!isValidName(info.username)) {
          throw new Error('姓名必须在6到12个字符之间')
        }
      }

      await edit({
        variables: {
          info: info,
        },
      })
    },
    [edit],
  )

  return editProfile
}

const mutation = gql`
  mutation UserEditBasicInfo($info: BasicData!) {
    UserEditBasicInfo(info: $info)
  }
`
