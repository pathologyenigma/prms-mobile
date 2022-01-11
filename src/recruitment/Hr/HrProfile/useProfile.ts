import { gql, useLazyQuery } from '@apollo/client'
import { useFocusEffect } from '@react-navigation/native'
import { useMemo } from 'react'

interface ProfileData {
  UserGetBasicInfo: {
    username: string
    image_url: string
    gender: null | boolean
    phone_number: string
    email: null | string
  }
  UserGetEnterpriseDetail_EntInfo: {
    enterprise_name: string
  }
}

interface Profile {
  username: string
  avatar: string
  gender: 'male' | 'female'
  company: string
  title: string
  phoneNumber: string
  email: string
}

export default function useProfile() {
  const [fetch, { loading, error, data }] = useLazyQuery<ProfileData>(query)

  useFocusEffect(fetch)

  const profile = useMemo<Profile | undefined>(() => {
    if (!data) {
      return undefined
    }

    const { UserGetBasicInfo, UserGetEnterpriseDetail_EntInfo } = data
    const { username, image_url, gender, phone_number, email } =
      UserGetBasicInfo
    const { enterprise_name } = UserGetEnterpriseDetail_EntInfo

    return {
      username: username,
      avatar: image_url,
      gender: gender ? 'male' : 'female',
      company: enterprise_name,
      title: '待完善',
      phoneNumber: phone_number,
      email: email || '',
    }
  }, [data])

  return { loading, error, profile, refetch: fetch }
}

const query = gql`
  query GetProfile {
    UserGetBasicInfo {
      username
      image_url
      gender
      phone_number
      email
    }

    UserGetEnterpriseDetail_EntInfo {
      enterprise_name
    }
  }
`
