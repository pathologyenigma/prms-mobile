import { NativeModules } from 'react-native'
const { SystemModule } = NativeModules

class SystemHelper {
  /**
   * 状态栏的高度
   */
  public static safeTop: number = global.STATUS_BAR_HEIGHT

  /**
   * 底部安全区高度
   */
  public static safeBottom: number = SystemModule.safeBottom

  /**
   * 屏幕宽度
   */
  public static width: number = SystemModule.width

  /**
   * 屏幕高度
   */
  public static height: number = SystemModule.height

  /**
     * 设备屏幕宽度 / 设计图宽度
     */
  public static widthRatio: number = SystemModule.width / 375

  /**
       * 设备屏幕高度 / 设计图高度
       */
  public static heightRatio: number = SystemModule.height / 812

  /**
   * 语言
   */
  public static language: string = SystemModule.language

  /**
   * 是否是ios
   */
  public static iOS: boolean = SystemModule.os === 'ios'
}

export default SystemHelper
