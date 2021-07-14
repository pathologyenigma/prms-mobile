import { StyleSheet } from 'react-native'
import { greenColor } from '../../../utils/constant'
import SystemHelper from '../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollview: {
    flex: 1,
  },
  oneClickLoginView: {
    alignItems: 'center',
    marginTop: 120
  },
  logoText: {
    color: '#666666',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 10
  },
  logoImg: {
    width: 132,
    height: 43
  },
  privacyView: {
    height: 12,
    marginBottom: SystemHelper.safeBottom + 21,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  privacyText: {
    textAlign: 'center',
    lineHeight: 14,
    color: '#666666',
    fontSize: 12,
    fontWeight: '300',
  },
  privacyDetail: {
    color: greenColor,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '400'
  },
  oneClickLoginStyle: {
    marginTop: 143,
  },
  loginBtn: {
    marginTop: 33,
    height: 55,
    marginHorizontal: 21,
    borderRadius: 8,
    backgroundColor: 'rgba(84,214,147,0.6)',
    width: SystemHelper.width - 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontWeight: '600',
    fontSize: 15,
    color: '#fff'
  },
  passwordLogin: {
    marginLeft: 21,
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  passwordLoginText: {
    color: '#666',
    fontSize: 14,
  },
  accountLoginTitle: {
    color: '#333333',
    marginTop: 115,
    fontWeight: '400',
    fontSize: 20,
    marginLeft: 22
  },
  accountLoginConatiner: {
    height: 35,
    marginHorizontal: 21,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginTop: 31,
    justifyContent: 'center'
  },
  accountLoginInput: {
    padding: 0,
    fontSize: 15,
    color: '#333333',
  },
  accountPasswordConatiner: {
    marginTop: 24,
    height: 35,
    marginHorizontal: 21,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  accountPasswordInput: {
    padding: 0,
    fontSize: 15,
    color: '#333333',
    flex: 1,
  },
  passwordHideBtn: {
    marginRight: 3,
  },
  passwordHideImg: {
    width: 19,
    height: 9,
  },
  forgetView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 21,
  }
})
