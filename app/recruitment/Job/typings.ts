import { ParamListBase } from '@react-navigation/native'
import { PoiItem } from '~/common/location/geolocation'
import { LatLng } from '~/common/location/MapView'
import { Education, FullTime } from '../typings'

export interface JobParamList extends ParamListBase {
  EditJobName: {
    initialName?: string
  }
  EditJobDescription: {
    initialDescription?: string
  }
  EditJobWelfare: {
    initialTags?: string[]
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
    jobId?: number
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
