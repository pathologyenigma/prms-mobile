import { StyleSheet } from 'react-native'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  recordBtn: {
    color: '#666666',
    fontSize: 15,
  },
  content: {
    marginTop: 38,
    marginHorizontal: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    width: 75,
    height: 76
  },
  countTimeBtn: {
    marginTop: 67,
    height: 40,
    width: SystemHelper.width - 44,
    borderRadius: 4,
    marginHorizontal: 22
  },
  countTimeBtnTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff'
  },
  successTitle: {
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 23,
  },
  successDetail: {
    color: '#888888',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 16,
  }
})
