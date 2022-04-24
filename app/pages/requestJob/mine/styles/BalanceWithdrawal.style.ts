import { StyleSheet } from 'react-native'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  recordBtn: {
    color: '#666666',
    fontSize: 15,
  },
  content: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 11,
    minHeight: 253,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceView: {
    flexDirection: 'row',
  },
  balanceTitle: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  balanceUnit: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 15,
  },
  balanceValue: {
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 5,
  },
  withdrawText: {
    color: '#333333',
    fontSize: 12,
    marginTop: 5,
  },
  withdrawTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 11,
    marginTop: 25,
    alignSelf: 'flex-start'
  },
  balanceInputView: {
    flexDirection: 'row',
    height: 35,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    marginHorizontal: 11,
  },
  balanceInput: {
    flex: 1,
    padding: 0,
    height: 30,
    marginLeft: 10,
  },
  bindAlipay: {
    color: '#333333',
    fontSize: 13
  },
  balanceAllText: {
    color: '#FA8E4F',
    fontSize: 15,
    fontWeight: 'bold'
  },
  linear: {
    width: 60,
    height: 27,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 13,
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
  codeInputView: {
    marginTop: 20,
    alignSelf: 'center',
    width: 240,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e7e7e7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  codeIcon: {
    width: 11,
    height: 13
  },
  verificationCode: {
    padding: 0,
    flex: 1,
    marginLeft: 10,
  },
  countTimeBtnText: {
    color: '#333333',
    fontSize: 11,
    fontWeight: 'bold'
  },
  sendTimeBtn: {
    width: 55,
    height: 18,
  },
  sendTimeBtnTitle: {
    color: '#fff',
    fontSize: 10
  },
  bindView: {
    alignSelf: 'flex-start',
    marginHorizontal: 11,
  },
  bindViewValue: {
    color: '#333333',
    fontSize: 13,
    marginTop: 10,
  }
})
