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
  nextIcon: {
    width: 7,
    height: 12,
    marginLeft: 18
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
  logoOutBtn: {
    backgroundColor: greenColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 55,
    marginTop: 107,
    marginHorizontal: 21,
  },
  logoOutText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '400'
  }
})
