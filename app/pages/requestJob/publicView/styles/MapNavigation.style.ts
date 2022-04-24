import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  leftBtn: {
    position: 'absolute',
    top: SystemHelper.safeTop + 10,
    zIndex: 1,
    width: 32,
    height: 23,
    alignItems: 'flex-end',
  },
  leftIcon: {
    width: 12,
    height: 23
  },
  bottomContainer: {
    width: SystemHelper.width,
    height: SystemHelper.safeBottom + 54,
    marginHorizontal: 22,
    paddingTop: 7
  },
  btnContainer: {
    width: SystemHelper.width - 44,
    height: 40,
  }
})
