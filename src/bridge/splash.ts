import { NativeModules } from 'react-native'

const SplashModule = NativeModules.SplashModule

function hide() {
  SplashModule.hideSplash()
}

export default {
  hide,
}
