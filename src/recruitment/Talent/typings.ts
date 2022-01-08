import { ParamListBase } from '@react-navigation/native'
import { Education } from '../typings'

interface JobCategory {
  primary: string
  secondary: string
  final: string
}

interface IndustryCategory {
  primary: string
  secondary: string
}

export interface TalentParamList extends ParamListBase {
  TalentList: undefined
  TalentJobCategory: {
    categories?: JobCategory[]
  }
  TalentIndustryCategory: {
    categories?: IndustryCategory[]
  }
  JobCity: {
    cities?: string[]
  }
  CandidateFilter: {
    jobCategories?: JobCategory[]
    industryCategories?: IndustryCategory[]
    education?: Education
    experience?: number
    age?: number[]
    salary?: number[]
    cities?: string[]
  }
}
