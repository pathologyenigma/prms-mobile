import { StyleSheet } from 'react-native'
import SystemHelper from '../../../utils/system'

export default StyleSheet.create({
  mask: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: SystemHelper.width,
    height: SystemHelper.height,
    position: 'absolute',
  },
  context: {
    width: SystemHelper.width,
    borderRadius: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  topView: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 8,
  },
})
