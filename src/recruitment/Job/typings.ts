import { ParamListBase } from '@react-navigation/native'
import { PoiItem } from '../../bridge/geolocation'
import { LatLng } from '../../bridge/MapView'
import { Education, FullTime } from '../typings'

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
    poiItem?: PoiItem
    coordinates?: [number, number]
    workingAddress?: string[]
  }
  SearchJobAddress: {
    city?: string
    coordinates?: LatLng
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
    coordinates?: [number, number]
    workingAddress?: string[]
  }
  JobDetail: {
    jobId: number
  }
}
