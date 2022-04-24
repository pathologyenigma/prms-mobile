import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  },
  askText: {
    fontSize: 13
  },
  listView: {
    flex: 1,
    paddingHorizontal: 21,
  },
  cellStyle: {
    marginHorizontal: 0,
  },
  contentView: {
    flex: 1,
  },
})
