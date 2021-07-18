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
    width: SystemHelper.width - 74,
    marginHorizontal: 37,
    borderRadius: 8,
  },
  topView: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 8,
    paddingTop: 30,
    paddingBottom: 30,
  },
})
