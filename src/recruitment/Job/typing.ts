import { ParamListBase } from '@react-navigation/native'

export type JobStatus = 'NotPublishedYet' | 'InRecruitment' | 'OffLine'

export type Education =
  | 'LessThanPrime'
  | 'Primary'
  | 'Junior'
  | 'High'
  | 'JuniorCollege'
  | 'RegularCollege'
  | 'Postgraduate'
  | 'Doctor'

export type FullTime = 'Full' | 'Part' | 'InternShip'

export interface JobParamList extends ParamListBase {
  EditJobName: {
    initialName?: string
  }
  EditJobDescription: {
    initialDescription?: string
  }
  EditJobCategory: undefined
  PostJob: {
    jobName?: string
    jobDescription?: string
    jobNature?: FullTime
    jobCategory?: string[]
  }
}
