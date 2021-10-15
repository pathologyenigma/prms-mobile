import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    width: SystemHelper.width,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 11,
    marginTop: 25
  },
  title: {
    color: '#333333',
    fontSize: 20,
    fontWeight: '400'
  },
  cellView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SystemHelper.width - 22,
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
  },
  cellTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '400',
    flex: 1
  },
  nextIcon: {
    width: 7,
    height: 12
  },
  cellValue: {
    color: '#888888',
    fontSize: 13,
  },
  cellName: {
    flex: 1,
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  topView: {
    width: SystemHelper.width,
    alignItems: 'center',
    marginTop: 90,
  },
  logoIcon: {
    width: 125,
    height: 155,
  },
  currentCode: {
    color: '#888888',
    fontSize: 13
  }
})
