import { ComponentType } from 'react'
import SettingMain from './SettingMain'
import GreetingSetting from './GreetingSetting'
// import ChangeRole from './ChangeRole'

const screens: Record<string, ComponentType<any>> = {
  SettingMain,
  GreetingSetting,
}

export default screens
