import { StyleSheet } from 'react-native'
import SystemHelper from '../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: SystemHelper.safeBottom,
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
  tabsView: {
    minWidth: 188,
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 90,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  sendCodeBtn: {
    backgroundColor: '#66DEFF',
    marginHorizontal: 30,
    marginTop: 20,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendCodeText: {
    height: 20,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    color: '#ffffff'
  },
  loginBtn: {
    backgroundColor: '#2EB9FF',
    marginHorizontal: 30,
    marginTop: 40,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: '#FFF',
    fontSize: 16,
  },
  warning: {
    marginTop: 4,
    marginHorizontal: 30,
    lineHeight: 17,
    color: '#FF4B4B',
    fontSize: 12,
  },
  emailTips: {
    lineHeight: 15,
    fontSize: 12,
    color: 'rgba(32,33,38,0.5)',
    marginHorizontal: 30,
    marginTop: 10,
  },
  emailBtn: {
    height: 21,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailQuestion: {
    color: '#323338',
    fontSize: 15,
    height: 21,
    lineHeight: 21,
  },
  emailBtnText: {
    height: 20,
    fontSize: 16,
    letterSpacing: 0,
    color: '#5095D8',
    lineHeight: 18,
  },
  phoneView: {
    flexDirection: 'row',
    marginHorizontal: 30,
  },
  blue_right: {
    width: 12,
    height: 13,
    marginLeft: 8,
  },
  tabsBtn: {
    height: 50,
    minWidth: 94,
    alignItems: 'center',
  },
  tabsTitle: {
    fontSize: 18,
    color: 'rgba(32,33,38,0.29)',

    height: 46,
    lineHeight: 46,
  },
  selectedTitle: {
    color: '#323338',
  },
  tabsLine: {
    backgroundColor: '#66DEFF',
    width: 50,
    height: 4,
    borderRadius: 2,
    position: 'absolute',
    bottom: 0,
  },
  welcomeView: {
    alignItems: 'center',
  },
  welcomeIcon: {
    width: 102,
    height: 102,
    marginTop: 29,
  },
  welcomeText: {
    height: 25,
    lineHeight: 25,
    fontSize: 20,

    color: '#323338',
    marginTop: 14,
  },
  welcomeDetail: {
    marginTop: 10,
    lineHeight: 18,

    color: '#323338',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 30,
  },
  modalBtn: {
    borderRadius: 8,
    marginTop: 20,
    width: 200,
    height: 52,
  },
  modalBtn_aboveStyle: {
    width: 200,
    height: 44,
  },
  modalBtnText: {
    height: 20,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  privacyTips: {
    height: 20,
    lineHeight: 20,
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginTop: 20,
  },
  privacyButton: {
    marginTop: 10,
    alignSelf: 'center'
  },
  privacyButtonText: {
    height: 20,
    fontSize: 16,
    letterSpacing: 0,
    color: '#5095D8',
    lineHeight: 18,
  },
})
