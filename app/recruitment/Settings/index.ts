import { ComponentType } from 'react'
import SettingMain from './SettingMain'
import GreetingSetting from './GreetingSetting'
// import ChangeRole from './ChangeRole'
import ChooseRole from '../../pages/loginInfo/ChooseRole'

const screens: Record<string, ComponentType<any>> = {
  SettingMain,
  GreetingSetting,
  ChooseRole,
}

export default screens
