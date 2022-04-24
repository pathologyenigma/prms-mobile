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
    marginTop: 10,
  },
  logoIcon: {
    width: 125,
    height: 155,
  },
  currentCode: {
    color: '#888888',
    fontSize: 13
  },
  submitBtn: {
    backgroundColor: greenColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 55,
    marginTop: 10,
    marginHorizontal: 10,
  },
  selectText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '400'
  },
  countTimeBtn: {
    height: 20,
    width: 80,
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 10
  },
  countTimeBtnTitle: {
    fontSize: 11,
    fontWeight: '100'
  },
  linearView: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    marginHorizontal: 11,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linerText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  }
})
