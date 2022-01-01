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

export interface JobAddress {
  adcode: string
  name: string
  address: string
  city: string
  district: string
  latitude: number
  longitude: number
}

export interface JobParamList extends ParamListBase {
  EditJobName: {
    initialName?: string
  }
  EditJobDescription: {
    initialDescription?: string
  }
  EditJobCategory: undefined
  EditJobWelfare: {
    initialTags?: string[]
  }
  EditJobCity: {
    currentCity?: string
  }
  EditJobAddress: {
    address?: JobAddress
  }
  SearchJobAddress: {
    city?: string
  }
  PostJob: {
    jobName?: string
    jobDescription?: string
    jobNature?: FullTime
    jobCategory?: string[]
    experience?: number
    education?: Education
    salary?: number[]
    tags?: string[]
    headcount?: number
  }
}
