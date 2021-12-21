import { differenceInHours } from "date-fns"

const formatHintsIndex = (originIndex: string | number) => {
  return Number(originIndex) > 9 ? originIndex.toString() : `0${Number(originIndex)}`
}

const calculateTime = (originTime: string) => {
  if (!originTime) {
    return '--'
  }
  let status = ''
  const diffTime = differenceInHours(new Date(), new Date(originTime))
  if (diffTime < 1) {
    status = '刚刚活跃'
  } else if (diffTime < 24) {
    status = `${diffTime}小时前在线`
  } else if (diffTime < 24 * 7) {
    status = `${Math.floor(diffTime / 24)}天前在线`
  } else {
    status = `${Math.floor(diffTime / (24 * 7))}周前在线`
  }
  return status
}

const calculateSize = (originSize: number) => {
  if (!originSize) {
    return '--'
  }
  let status = ''
  if (originSize < 1024) {
    status = `${originSize}KB`
  } else if (originSize < 1024 * 1024) {
    status = `${(originSize / 1024).toFixed(2)}MB`
  } else if (originSize < 1024 * 1024 * 1024) {
    status = `${(originSize / 1024 / 1024).toFixed(2)} GB`
  }
  return status
}

const reformEducation = (education: string) => {
  if (!education) {
    return ''
  }
  let showEducation = education
  switch (education) {
    case 'LessThanPrime':
      showEducation = '无要求'
      break;
    case 'Primary':
      showEducation = '小学及以上'
      break;
    case 'Junior':
      showEducation = '初中及以上'
      break;
    case 'High':
      showEducation = '高中及以上'
      break;
    case 'JuniorCollege':
      showEducation = '大专及以上'
      break;
    case 'RegularCollege':
      showEducation = '本科及以上'
      break;
    case 'Postgraduate':
      showEducation = '研究生及以上'
      break;
    case 'Doctor':
      showEducation = '博士及以上'
      break;
    default:
      break;
  }
  return showEducation
}

const reformCompanySize = (size: string) => {
  if (!size) {
    return ''
  }
  let showSize = ''
  switch (size) {
    case 'LessThanFifteen':
      showSize = '1-14人'
      break;
    case 'FifteenToFifty':
      showSize = '15-49人'
      break;
    case 'FiftyToOneHundredFifty':
      showSize = '50-99人'
      break;
    case 'OneHundredFiftyToFiveHundreds':
      showSize = '100-499人'
      break;
    case 'FiveHundredsToTwoThousands':
      showSize = '500-2000人'
      break;
    case 'MoreThanTwoThousands':
      showSize = '2000人以上'
      break;
    default:
      break;
  }
  return showSize
}

const reformComFinancing = (comp_financing: string) => {
  // enum EnterpriseFinancing { NotYet, AngelFinancing, A, B, C, D, Listed, NoNeed }
  if (!comp_financing) {
    return ''
  }
  let showComp_financing = ''
  switch (comp_financing) {
    case 'NotYet':
      showComp_financing = '不需要融资'
      break;
    case 'AngelFinancing':
      showComp_financing = '天使轮'
      break;
    case 'A':
      showComp_financing = 'A轮'
      break;
    case 'B':
      showComp_financing = 'B轮'
      break;
    case 'C':
      showComp_financing = 'C轮'
      break;
    case 'D':
      showComp_financing = 'D轮'
      break;
    case 'Listed':
      showComp_financing = '已上市'
      break;
    case 'NoNeed':
      showComp_financing = '不需要融资'
      break;
    default:
      break;
  }
  return showComp_financing
}

const reformFullTime = (full_time_job: string) => {
  if (!full_time_job) {
    return ''
  }
  switch (full_time_job) {
    case 'PartTime':
      return '兼职'
    case 'FullTime':
      return '全职'
    case 'InternShip':
      return '实习'
    default:
      break;
  }
  return ''
}

const reformDistanceYears = (first_time_working: string) => {
  if (!first_time_working) {
    return ''
  }
  const fromYears = first_time_working.split('-')[0]
  if (!fromYears) {
    return ''
  }
  return (new Date().getFullYear() - Number(fromYears))
}

export {
  formatHintsIndex,
  calculateTime,
  calculateSize,
  reformEducation,
  reformCompanySize,
  reformComFinancing,
  reformFullTime,
  reformDistanceYears,
}
