import { ParamListBase } from '@react-navigation/native'

export interface HrParamList extends ParamListBase {
  HrProfile: {
    username?: string
    avatar?: string
    gender?: 'male' | 'female'
    company?: string
    title?: string
    phoneNumber?: string
    email?: string
  }
  EditHrEmail: {
    email?: string
  }
  EditHrPhoneNumber: {
    phoneNumber?: string
  }
  EditHrTitle: {
    title?: string
  }
  EditHrName: {
    username?: string
  }
  AvatarViewer: {
    avatar?: string
    targetRouteName: string
  }
  AvatarCropper: {
    uri: string
    targetRouteName: string
  }
}
