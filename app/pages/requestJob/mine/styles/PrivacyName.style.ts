import { StyleSheet } from 'react-native'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  currentStatusText: {
    color: '#888888',
    fontSize: 13,
    marginTop: 20,
    paddingHorizontal: 11,
  },
  cell: {
    paddingHorizontal: 11,
    flexDirection: 'row',
    height: 64,
    marginTop: 12,
    alignItems: 'center',
  },
  roleIcon: {
    width: 42,
    height: 42,
  },
  name: {
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 20,
  },
  selectedView: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#7FDDA1',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    width: 10,
    height: 10,
    backgroundColor: '#7FDDA1',
    borderRadius: 5,
  },
  unselectedView: {
    borderColor: '#CECECE',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1
  }
})
