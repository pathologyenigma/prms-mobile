import { StyleSheet } from 'react-native'
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
  },
  title: {
    color: '#333333',
    fontSize: 20,
    fontWeight: '400'
  },
  cellView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SystemHelper.width,
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    paddingHorizontal: 11,
  },
  cellTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '400',
    flex: 1
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
  receiveMessageBtn: {
    backgroundColor: '#54D693',
    borderRadius: 4,
    width: 60,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiveMessageText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '400'
  }
})
