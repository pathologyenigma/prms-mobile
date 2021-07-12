import { StyleSheet } from 'react-native'
import SystemHelper from '../../../utils/system'
import { Quicksand_Bold } from '../../../constants/fontTypes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: SystemHelper.safeBottom + 23,
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
  backBtn: {
    width: 60,
    height: 39,
    justifyContent: 'center',
    position: 'absolute',
    left: 6,
    paddingLeft: 10,
  },
  backImage: {
    width: 8,
    height: 14,
  },
  tabsBtn: {
    height: 39,
    minWidth: 94,
    alignItems: 'center',
  },
  tabsTitle: {
    fontSize: 18,
    color: 'rgba(32,33,38,0.29)',

    height: 23,
    lineHeight: 23,
    flex: 1,
  },
  selectedTitle: {
    color: '#323338',
  },
  tabsLine: {
    backgroundColor: '#66DEFF',
    width: 50,
    height: 4,
    borderRadius: 2,
  },
  forgetBtn: {
    marginTop: 5,
    marginHorizontal: 30,
    height: 19,
  },
  forgetText: {
    height: 19,
    lineHeight: 19,
    fontSize: 15,

    color: '#5095d8'
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
  storyBg: {
    marginHorizontal: 16,
    width: SystemHelper.width - 32,
    height: 124 * SystemHelper.heightRatio,
    marginTop: 24,
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  modalView: {
    alignItems: 'center',
  },
  modalTitle: {
    height: 25,
    fontSize: 20,

    textAlign: 'center',
    color: '#323338',
    marginTop: 30,
  },
  modalTips: {
    height: 18,
    opacity: 0.4,
    fontSize: 14,

    color: '#323338',
    marginTop: 10,
  },
  modalInput: {
    width: 220,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#f5f6fa',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: Quicksand_Bold
  },
  modalBtn: {
    borderRadius: 8,
    marginTop: 30,
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
  bottomStyle: {
    backgroundColor: '#77C931',
    height: 30,
  },
  sideStoryBottomStyle: {
    backgroundColor: '#E0B32E',
    height: 30,
  },
  storyGuideView: {
    width: 168,
    height: 47,
    borderRadius: 23.5,
    backgroundColor: '#77C931',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 26,
    marginTop: 43,
    marginLeft: 16,
  },
  storyText: {
    textAlign: 'center',
    lineHeight: 47,
    fontSize: 20,

    color: '#FFF',
    flex: 1,
  },
  rightIcon: {
    width: 10,
    height: 10,
  },
  imageBg: {
    width: SystemHelper.width,
    backgroundColor: 'transparent',
    // paddingTop: SystemHelper.safeTop + 44,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: -44 - SystemHelper.safeTop,
  },
  welcome: {
    height: 40,
    lineHeight: 40,
    fontSize: 28,

    textAlign: 'center',
    color: '#ffffff',
  },
  betaModeTips: {
    backgroundColor: 'rgba(255,255,255,0.53)',
    borderRadius: 16,
    height: 32,
    width: 105,
    textAlign: 'center',
    overflow: 'hidden',
    position: 'absolute',
    bottom: 30,
    lineHeight: 32,
    color: '#34C2E9',
    fontSize: 16,
  },
  iconView: {
    width: 102,
    height: 102,
    backgroundColor: 'rgba(0,0,0,0.11)',
    alignSelf: 'center',
    borderRadius: 51,
    marginTop: 21,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 90,
    height: 90,
  },
  startTips: {
    height: 20,
    lineHeight: 20,
    color: '#323338',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 20,
  },
  warning: {
    marginTop: 4,
    marginHorizontal: 30,
    height: 17,
    lineHeight: 17,
    color: '#FF4B4B',
    fontSize: 12,
  },
  createTops: {
    marginTop: 26,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 60,
    alignItems: 'center',
  },
  line: {
    backgroundColor: '#E8E8E8',
    height: 1,
    width: 110,
  },
  createTips: {
    color: 'rgba(50,51,56,0.3)',
    fontSize: 15,
    lineHeight: 15,
  },
  createBtn: {
    height: 21,
    alignSelf: 'center',
    marginTop: 13,
  },
  createQuestion: {
    color: '#323338',
    fontSize: 15,
    height: 21,
    lineHeight: 21,
  },
  createBtnText: {
    color: '#5095D8',
    fontSize: 15,
    lineHeight: 21,
  },
  modeBtn: {
    flexDirection: 'row',
    minWidth: 128,
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: 32,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#DDEFF7',
    paddingHorizontal: 10,
  },
  mode: {
    width: 16,
    height: 16,
    marginLeft: 6,
  },
  modeText: {
    color: '#068FD4',
    fontSize: 16,
    lineHeight: 18,
  },
  phoneView: {
    flexDirection: 'row',
    marginHorizontal: 30,
  },
  areaCodeBtn: {
    width: 42,
  },
})
