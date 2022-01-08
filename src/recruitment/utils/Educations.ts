import { Education } from '../typings'

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

export function stringForEducation(education?: Education) {
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
