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
    marginTop: 34
  },
  bindPhoneText: {
    color: '#888888',
    fontSize: 15,
    fontWeight: 'bold'
  },
  bindPhoneValue: {
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  title: {
    color: '#333333',
    fontSize: 20,
    fontWeight: '400'
  },
  inputContainer: {
    marginHorizontal: 22,
    height: 57,
    paddingTop: 20,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    justifyContent: 'center',
    width: SystemHelper.width - 44.
  },
  accountLoginInput: {
    padding: 0,
    fontSize: 15,
    color: '#333333',
  },
  renderVerifyCodeConatiner: {
    height: 57,
    paddingTop: 20,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    justifyContent: 'center',
    width: SystemHelper.width - 44,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 22
  },
  nextIcon: {
    width: 7,
    height: 12
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
    marginTop: 105,
    marginHorizontal: 10,
  },
  selectText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '400'
  },
  countTimeBtn: {
    height: 20,
    width: 90,
    borderRadius: 4,
    alignSelf: 'center',
  },
  countTimeBtnTitle: {
    fontSize: 11,
    fontWeight: '100',
    lineHeight: 13,
  },
  countTimeBtnText: {
    color: '#fff',
    height: 20,
    borderRadius: 4,
    lineHeight: 20,
    fontSize: 11,
    backgroundColor: '#ddd',
    width: 90,
    textAlign: 'center'
  },
})
