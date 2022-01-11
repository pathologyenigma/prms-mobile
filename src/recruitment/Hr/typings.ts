import { ParamListBase } from '@react-navigation/native'

export interface HrParamList extends ParamListBase {
  HrProfile: undefined
  EditHrEmail: {
    email?: string
  }
}
