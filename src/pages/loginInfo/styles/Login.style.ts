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
  },
  verifyCodeLoginView: {
    flex: 1,
  },
  thirdLoginView: {

  },
  thirdLoginTitle: {
    alignSelf: 'center',
    color: '#666666',
    fontSize: 14
  },
  thirdLoginBtn: {
    marginTop: 19,
    marginBottom: 38,
    flexDirection: 'row',
    marginHorizontal: 100,
    justifyContent: 'space-between',
  },
  registerTipView: {
    paddingHorizontal: 50,
    minHeight: 200,
  },
  registerTipTitle: {
    flex: 1,
    paddingHorizontal: 50,
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  registerTipBtnView: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 18,
    justifyContent: 'space-between',
  },
  registerTipLeftBtn: {
    height: 40,
    width: 130,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: greenColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountTitle: {
    color: greenColor,
    fontSize: 15,
    fontWeight: 'bold',
  },
  registerTipRightBtn: {
    width: 100,
    marginLeft: 15,
    height: 40,
    borderRadius: 8
  },
  privacyModal: {
    height: 185,
    width: SystemHelper.width,
  },
  privacyModalTitle: {
    color: '#333333',
    fontSize: 17,
    fontWeight: '300',
    paddingTop: 2,
    marginLeft: 22,
  },
  privacyModalTitleView: {
    flexDirection: 'row',
    marginLeft: 30,
    marginTop: 21,
  },
  agreeBtn: {
    marginLeft: 21,
    width: SystemHelper.width - 165,
  },
})
