import { StyleSheet } from 'react-native'
import SystemHelper from '../../../utils/system'

export default StyleSheet.create({
  datePicker: {
    marginTop: 10,
    width: SystemHelper.width * 5,
    marginLeft: SystemHelper.width / 2 + 20,
    height: 210,
    fontWeight: 'bold',
  },
  title: {
    lineHeight: 21,
    fontSize: 18,
    textAlign: 'center',
    color: '#333333',
    marginHorizontal: 26,
    fontWeight: '400'
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftBtn: {
    width: 110,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 11,
  },
  leftText: {
    height: 20,
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    color: '#666666'
  },
  rightBtn: {
    width: 110,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 11,
  },
  rightText: {
    height: 20,
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    color: '#79D398'
  }
})