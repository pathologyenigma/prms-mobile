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
    height: 37,
    flexDirection: 'row',
    marginHorizontal: 90,
    justifyContent: 'space-around',
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
    height: 17,
    lineHeight: 17,
    color: '#FF4B4B',
    fontSize: 12,
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
    color: '#5095D8',
    fontSize: 15,
    lineHeight: 21,
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
})
