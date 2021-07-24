import { Toast } from '@ant-design/react-native'
import Localization from '../localization'

export default class RootLoading {
  public static loading = (content?: string, duration?: number, onClose?: () => void, mask?: boolean) => {
    Toast.loading(
      content || Localization.get('loading'),
      0,
      onClose || undefined,
      mask || true
    )
  }

  public static hide = () => {
    Toast.removeAll()
  }

  public static success = (content?: string, duration?: number, onClose?: () => void, mask?: boolean) => {
    Toast.removeAll()
    Toast.success(
      content || Localization.get('load_success'),
      duration || 1,
      onClose || undefined,
      mask || true
    )
  }

  public static fail = (content?: string, duration?: number, onClose?: () => void, mask?: boolean) => {
    Toast.removeAll()
    Toast.fail(
      content || 'failed !',
      duration || 1,
      onClose || undefined,
      mask || true
    )
  }

  public static info = (content?: string, duration?: number, onClose?: () => void, mask?: boolean) => {
    Toast.removeAll()
    Toast.info(
      content || 'info',
      duration || 1,
      onClose || undefined,
      mask || true
    )
  }
}
