import { StyleSheet } from 'react-native'
import SystemHelper from '../../../utils/system'

export default StyleSheet.create({
  bar: {
    paddingTop: SystemHelper.safeTop,
    height: SystemHelper.safeTop + 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    elevation: 1,
    backgroundColor: '#FFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ececec',
  },
  left: {
    minWidth: 16 + 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 16,
  },
  font: {
    fontSize: 18,
    color: '#FFF',
  },
  icon: {
    width: 8,
    height: 14,
  },
  leftButton: {
    minWidth: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  right: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rightButton: {
    minWidth: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    width: SystemHelper.width - (16 + 44) * 2,
    textAlign: 'center',
    position: 'absolute',
    left: 16 + 44,
    zIndex: 1,
    lineHeight: 44,
    bottom: 0,
    fontSize: 20,
    
    color: '#323338',
  },
})
