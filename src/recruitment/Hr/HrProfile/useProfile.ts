import { gql, useQuery } from '@apollo/client'
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
  ENTGetAccountInfo: {
    pos: string
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
  const { loading, error, data, refetch } = useQuery<ProfileData>(query, {
    fetchPolicy: 'cache-and-network',
  })

  const profile = useMemo<Profile | undefined>(() => {
    if (!data) {
      return undefined
    }

    const {
      UserGetBasicInfo,
      UserGetEnterpriseDetail_EntInfo,
      ENTGetAccountInfo,
    } = data
    const { username, image_url, gender, phone_number, email } =
      UserGetBasicInfo
    const { enterprise_name } = UserGetEnterpriseDetail_EntInfo

    return {
      username: username,
      avatar:
        image_url || 'https://img95.699pic.com/photo/50034/7165.jpg_wh300.jpg',
      gender: gender ? 'male' : 'female',
      company: enterprise_name,
      title: ENTGetAccountInfo.pos || '待完善',
      phoneNumber: phone_number,
      email: email || '',
    }
  }, [data])

  return { loading, error, profile, refetch }
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

    ENTGetAccountInfo {
      pos
    }
  }
`
