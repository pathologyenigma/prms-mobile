import { ParamListBase } from '@react-navigation/native'
import { Education, ResumeJobStatus } from '../typings'

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
  CandidateFilterJobCategory: {
    categories?: JobCategory[]
  }
  CandidateFilterIndustryCategory: {
    categories?: IndustryCategory[]
  }
  CandidateFilterCity: {
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
    gender?: boolean
    resumeJobStatus?: Array<ResumeJobStatus | undefined>
  }
}
