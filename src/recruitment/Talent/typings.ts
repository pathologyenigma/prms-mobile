import { ParamListBase } from '@react-navigation/native'

interface Category {
  primary: string
  secondary: string
  final: string
}

export interface TalentParamList extends ParamListBase {
  TalentList: undefined
  JobCategory: {
    categories?: Category[]
  }
  CandidateFilter: {
    categories?: Category[]
  }
}
