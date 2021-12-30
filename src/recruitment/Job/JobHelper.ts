import { Education, FullTime } from './typing'

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

  if (experience > 0) {
    return '1 年以下'
  }

  return '经验不限'
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
      return '高中以上'
    case 'JuniorCollege':
      return '大专以上'
    case 'RegularCollege':
      return '本科以上'
    case 'Postgraduate':
      return '研究生以上'
    case 'Doctor':
      return '博士'
    default:
      return '学历不限'
  }
}
