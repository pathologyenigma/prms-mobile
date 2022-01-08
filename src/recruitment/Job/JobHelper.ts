import { Education, FullTime } from './typings'

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

export function stringForExperience(experience: number) {
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

  return '不限'
}

export function stringForEducation(education: Education) {
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
      return '不限'
  }
}

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
