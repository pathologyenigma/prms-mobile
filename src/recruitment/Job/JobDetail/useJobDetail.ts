import { gql, useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { LatLng } from '../../../bridge/MapView'
import {
  Education,
  EnterpriseNature,
  EnterpriseSize,
  FullTime,
} from '../../typings'
import {
  stirngForSalary,
  stringForEducation,
  stringForEnterpriseNature,
  stringForEnterpriseSize,
  stringForExperience,
  stringForFullTime,
} from '../../utils/JobHelper'
import { JobParamList } from '../typings'

interface Hr {
  id: number
  name: string
  pos: string
  last_log_out_time: null
  logo: string
}

interface Job {
  id: number
  title: string
  category: string[]
  detail: string
  address_coordinate: number[]
  address_description: string[]
  salaryExpected: number[]
  experience: number
  education: Education | null
  required_num: number
  full_time_job: FullTime
  tags: string[]
  updated_at: string
}

interface Company {
  id: number
  name: string
  address_coordinates: number[]
  address_description: string[]
  industry_involved: string[]
  business_nature: EnterpriseNature
  enterprise_logo: string
  enterprise_size: EnterpriseSize
}

interface JobDetailData {
  hr: Hr
  job: Job
  company: Company
  jobInput: JobInput
}

interface JobDetailResult {
  UserGetJob: JobDetailData
}

export interface JobItem {
  title: string
  salary: string
  jobNature: string
  headcount: string
  experience: string
  education: string
  address: string
  tags: string[]
  description: string
}

export interface CompanyItem {
  logo: string
  name: string
  labels: string[]
  address: string
  coordinate: LatLng
}

type JobInput = JobParamList['PostJob']

interface JobDetailItem {
  job: JobItem
  jobInput: JobInput
  company: CompanyItem
}

export default function useJobDetail(jobId: number) {
  const { data, loading, error, refetch } = useQuery<JobDetailResult>(query, {
    variables: {
      jobid: jobId,
    },
  })

  const detail = useMemo<JobDetailItem | undefined>(() => {
    if (!data) {
      return undefined
    }
    const { job, company } = data.UserGetJob

    const nature = stringForEnterpriseNature(company.business_nature)
    const scale = stringForEnterpriseSize(company.enterprise_size)
    const industry =
      company.industry_involved[company.industry_involved.length - 1]

    return {
      job: {
        title: job.title,
        salary: stirngForSalary(job.salaryExpected),
        jobNature: stringForFullTime(job.full_time_job),
        headcount: `招 ${job.required_num} 人`,
        experience: stringForExperience(job.experience, true),
        education: stringForEducation(job.education || undefined, true),
        address: `${job.address_description[4]}·${job.address_description[5]}·${job.address_description[6]}`,
        tags: job.tags,
        description: job.detail,
      },
      company: {
        logo: company.enterprise_logo,
        name: company.name,
        labels: [nature, scale, industry],
        address: `${company.address_description[4]}${company.address_description[5]}${company.address_description[6]}`,
        coordinate: {
          latitude: job.address_coordinate[1],
          longitude: job.address_coordinate[0],
        },
      },
      jobInput: {
        jobId: job.id,
        jobName: job.title,
        jobDescription: job.detail,
        jobNature: job.full_time_job,
        jobCategory: job.category,
        experience: job.experience,
        education: job.education || undefined,
        salary: job.salaryExpected,
        tags: job.tags,
        headcount: job.required_num,
        coordinates: job.address_coordinate as [number, number],
        workingAddress: job.address_description,
      },
    }
  }, [data])

  return { detail, loading, error, refetch }
}

const query = gql`
  query UserGetJob($jobid: Int) {
    UserGetJob(jobid: $jobid) {
      hr {
        id
        name
        pos
        last_log_out_time
        logo
      }
      job {
        id
        title
        category
        detail
        address_coordinate
        address_description
        salaryExpected
        experience
        education
        required_num
        full_time_job
        tags
        updated_at
      }
      company {
        id
        name
        address_coordinates
        address_description
        industry_involved
        business_nature
        enterprise_logo
        enterprise_size
      }
    }
  }
`
