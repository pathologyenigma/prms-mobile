import { StyleSheet } from 'react-native'
import SystemHelper from '../../../utils/system'

export default StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
  },
  videoView: {
    width: SystemHelper.width,
    height: 248,
    marginTop: -50
  },
  closeIcon: {
    width: 18,
    height: 18,
  }
})
