import { ParamListBase } from '@react-navigation/native'
import { Education } from '../typings'

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
    education?: Education
    experience?: number
    age?: number[]
    salary?: number[]
  }
}
