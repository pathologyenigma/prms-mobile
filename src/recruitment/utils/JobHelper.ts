import {
  Education,
  EnterpriseNature,
  EnterpriseSize,
  FullTime,
  ResumeJobStatus,
} from '../typings'

export function stringForFullTime(fullTime: FullTime) {
  switch (fullTime) {
    case 'Full':
      return '全职'
    case 'Part':
      return '兼职'
    case 'InternShip':
      return '实习'
    default:
      throw new Error('无法识别的 fullTime:' + fullTime)
  }
}

export const experienceLabels = [
  '不限',
  '1 年以下',
  '1-3 年',
  '3-5 年',
  '5-10 年',
  '10 年以上',
]
export const experienceValues = [undefined, 0, 1, 3, 5, 10]

export function stringForExperience(experience?: number, prefix = true) {
  if (experience === undefined) {
    return '不限'
  }

  if (experience >= 10) {
    return '10 年以上'
  }

  if (experience >= 5) {
    return '5-10 年'
  }

  if (experience >= 3) {
    return '3-5 年'
  }

  if (experience >= 1) {
    return '1-3 年'
  }

  if (experience >= 0) {
    return '1 年以下'
  }

  return prefix ? '经验不限' : '不限'
}

export const educationLabels = [
  '不限',
  '高中',
  '大专',
  '本科',
  '研究生',
  '博士',
]

export const educationValues: Array<Education | undefined> = [
  undefined,
  'High',
  'JuniorCollege',
  'RegularCollege',
  'Postgraduate',
  'Doctor',
]

export function stringForEducation(education?: Education, prefix = false) {
  // | 'LessThanPrime'
  // | 'Primary'
  // | 'Junior'
  // | 'High'
  // | 'JuniorCollege'
  // | 'RegularCollege'
  // | 'Postgraduate'
  // | 'Doctor'
  switch (education) {
    case 'High':
      return '高中'
    case 'JuniorCollege':
      return '大专'
    case 'RegularCollege':
      return '本科'
    case 'Postgraduate':
      return '研究生'
    case 'Doctor':
      return '博士'
    default:
      return prefix ? '学历不限' : '不限'
  }
}

function range(min: number, max: number, suffix: string) {
  return Array(max - min + 1)
    .fill(1)
    .map((_, index) => `${index + min}${suffix}`)
}

function nrange(min: number, max: number, step = 1000) {
  return Array(max - min + 1)
    .fill(1)
    .map((_, index) => (index + min) * step)
}

export const minSalaryLabels = range(1, 490, 'k')
export const minSalaryValues = nrange(1, 490)
export const maxSalaryLabels = range(2, 500, 'k')
export const maxSalaryValues = nrange(2, 500)
export const yearEndSalaryLabels = ['不设置', ...range(13, 24, '薪')]
export const yearEndSalaryValues = nrange(12, 24, 1)

export function stirngForSalary(salary: number[]) {
  if (salary.length === 2) {
    return `${salary[0] / 1000}-${salary[1] / 1000}k`
  } else {
    if (salary[2] > 12) {
      return `${salary[0] / 1000}-${salary[1] / 1000}k·${salary[2]}`
    } else {
      return `${salary[0] / 1000}-${salary[1] / 1000}k`
    }
  }
}

export const jobStatusLabels = [
  '不限',
  '离职-暂不找工作',
  '离职-正在找工作',
  '在职-暂不找工作',
  '在职-正在找工作',
]

export const jobStatusValues = [
  undefined,
  'NoJobButNoJob',
  'NoJobButWantJob',
  'OnTheJob',
  'OnTheJobButLookingForAJob',
]

export function stringForJobStatus(jobStatus: ResumeJobStatus) {
  switch (jobStatus) {
    case 'NoJobButNoJob':
      return '离职-暂不找工作'
    case 'NoJobButWantJob':
      return '离职-正在找工作'
    case 'OnTheJobButLookingForAJob':
      return '在职-正在找工作'
    case 'OnTheJob':
      return '在职-暂不找工作'
    default:
      return '不限'
  }
}

export function stringForEnterpriseNature(nature: EnterpriseNature) {
  return '创业公司'
}

export function stringForEnterpriseSize(size: EnterpriseSize) {
  return '少于 15 人'
}
