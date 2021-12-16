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
  navBar: {
    paddingLeft: 11,
    paddingTop: SystemHelper.safeTop + 8,
    height: SystemHelper.safeTop + 44,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  barLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
  },
  backIcon: {
    width: 12,
    height: 23,
  },
  unreadText: {
    color: '#333333',
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 10,
    width: 26,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#f3f3f3',
    lineHeight: 22,
    textAlign: 'center'
  },
  barTitleView: {
    flex: 1,
  },
  barTitle: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 16,
    fontWeight: '400'
  },
  barDetail: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 11,
  },
  editBtbn: {
    width: 50,
    height: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 11,
  },
  editIcon: {
    width: 20,
    height: 4,
  },
  operateVeiw: {
    height: 50,
    width: SystemHelper.width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  operateBtn: {
    alignItems: 'center'
  },
  operateIcon: {
    width: 19,
    height: 18,
  },
  operateText: {
    color: '#333333',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2
  },
  listView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 11,
  },
  footerContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 11,
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
  commonWordsBtn: {
    width: 44,
    height: 22,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3
  },
  commonWordsText: {
    color: '#FFFFFF',
    backgroundColor: '#7DD49C',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 3,
  },
  commonWordIcon: {
    width: 29,
    height: 29
  },
  contentInput: {
    borderRadius: 4,
    backgroundColor: '#F7F7F7',
    lineHeight: 20,
    padding: 0,
    maxHeight: 83,
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 15,
    paddingLeft: 5,
    paddingRight: 3,
    marginLeft: 10,
    flex: 1,
    marginTop: 10,
    minHeight: 30
  },
  emojeBtn: {
    marginLeft: 19,
    marginBottom: 3
  },
  emojeIcon: {
    width: 21,
    height: 20,
  },
  addBtn: {
    width: 40,
    marginLeft: 10,
    marginBottom: 3,
    alignItems: 'center'
  },
  addIcon: {
    width: 20,
    height: 20
  },
  snedText: {
    borderRadius: 2,
    width: 34,
    height: 20,
    textAlign: 'center',
    lineHeight: 20,
    backgroundColor: greenColor,
    fontSize: 13,
    color: '#fff',
  },
  commonWordView: {
    height: 155,
    width: SystemHelper.width,
  },
  commonWordCell: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    minHeight: 60,
    borderTopColor: '#F0F0F0',
    borderTopWidth: 1,
    justifyContent: 'center',
  },
  commonWordCellTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  commonWordSetting: {
    marginTop: 5,
    marginBottom: 5,
    height: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commonWordSettingIcon: {
    width: 19,
    height: 18,
  },
  commonWordSettingText: {
    marginLeft: 13,
    color: '#333333',
    fontSize: 15
  },
  mediaVeiw: {
    height: 80,
    width: SystemHelper.width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  mediaBtn: {
    alignItems: 'center'
  },
  mediaIcon: {
    width: 26,
    height: 27,
  },
  mediaText: {
    color: '#333333',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2
  },
  cellSendMessage: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  accpetIcon: {
    width: 17,
    height: 12,
    marginLeft: 11
  },
  icon: {
    width: 45,
    height: 45,
    borderRadius: 22,
  },
  detailText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 9
  },
  cellSendContent: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#7DD49C',
    borderRadius: 8,
    borderTopRightRadius: 2,
    maxWidth: SystemHelper.width - 126,
    marginRight: 7,
    marginTop: 8
  },
  cellSendText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  rejectIcon: {
    width: 16,
    height: 16,
    marginLeft: 6
  },
  cellReceiveMessage: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
  },
  cellReceiveContent: {
    color: '#333333',
    fontSize: 13,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderTopLeftRadius: 2,
    maxWidth: SystemHelper.width - 126,
    marginLeft: 7,
    marginTop: 8
  },
  requestResumeView: {
    marginTop: 25,
  },
  requestResume: {
    maxWidth: SystemHelper.width - 126,
    backgroundColor: '#fff',
    paddingTop: 15,
    marginLeft: 7,
    borderRadius: 8,
    borderTopLeftRadius: 2,
  },
  requestResumeTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  requestResumeDocIcon: {
    width: 38,
    height: 38,
    borderRadius: 4,
    backgroundColor: '#7DD49C',
  },
  requestResumeDocText: {
    color: '#333333',
    fontSize: 13,
    fontWeight: 'bold',
    maxWidth: SystemHelper.width - 196,
    marginLeft: 7,
  },
  requestResumeBtn: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    height: 52,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  requestResumeBtnLine: {
    width: 1,
    height: '100%',
    backgroundColor: '#DDDDDD',
  },
  requestResumeBtnItem: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestResumeBtnRegect: {
    color: '#333333',
    fontSize: 16
  },
  contextStyle: {
    width: SystemHelper.width,
    marginHorizontal: 0,
    borderRadius: 0,
  },
  modalContentView: {
    width: SystemHelper.width,
    height: SystemHelper.safeBottom + 255,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  inappropriateTitle: {
    color: '#333333',
    fontWeight: '400',
    fontSize: 18,
    alignSelf: 'center',
  },
  rightBtn: {
    position: 'absolute',
    top: 2,
    right: 5,
    minWidth: 50,
    height: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  rightText: {
    height: 20,
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    color: greenColor
  },
  inappropriateView: {
    flexDirection: 'row',
    marginTop: 20,
    width: SystemHelper.width,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  inappropriateBtn: {
    marginTop: 12,
    marginLeft: 12,
    height: 35,
    width: (SystemHelper.width - 46) / 3,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  inappropriateText: {
    color: '#666666'
  },
  inappropriateClose: {
    width: 40,
    height: 40
  },
  submitContainer: {
    marginTop: 10,
    marginHorizontal: 22,
  },
  operateBtnStyle: {
    width: SystemHelper.width,
    marginHorizontal: 0,
    borderRadius: 0,
  },
  operateBtnItem: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#E1E1E1',
    borderBottomWidth: 1
  },
  operateBtnText: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '400'
  },
  complainBtnItem: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  operateCancelBtnItem: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#F7F7F7',
    borderTopWidth: 5,
  },
  regectContent: {
    marginTop: 20,
  },
  regectViewTitle: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputView: {
    borderRadius: 8,
    width: SystemHelper.width - 100,
    paddingHorizontal: 11,
    height: 111,
    justifyContent: 'space-between',
    backgroundColor: '#F4F4F4',
    marginTop: 20,
  },
  regectInput: {
    width: '100%',
    color: '#666666',
    fontSize: 15,
    textAlignVertical: 'top'
  },
  regectAmount: {
    color: '#888888',
    fontSize: 15,
    textAlign: 'right',
    marginBottom: 5
  },
  rejectConfirmBtn: {
    width: 184,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7DDBA3',
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 20,
  },
  rejectConfirmText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  inviteBtn: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    height: 52,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteIcon: {
    width: 38,
    height: 38,
  }
})
