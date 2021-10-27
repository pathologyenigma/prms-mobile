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
    paddingHorizontal: 22,
  },
  pageTitle: {
    color: '#333',
    fontSize: 20,
    fontWeight: '400',
    marginTop: 10,
  },
  pageDetail: {
    color: '#333',
    fontSize: 12,
    marginTop: 10,
    paddingBottom: 8,
  },
  inputView: {
    flexDirection: 'row',
    width: SystemHelper.width - 44,
    justifyContent: 'space-between'
  },
  accountLoginInput: {
    padding: 0,
    fontSize: 15,
    color: '#333333',
    width: 55,
    height: 55,
    backgroundColor: '#ECECEC',
    borderRadius: 8,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  sendBtnText: {
    fontSize: 14,
    color: '#54D693'
  },
  countTimeBtnText: {
    color: '#333',
    height: 20,
    borderRadius: 4,
    lineHeight: 20,
    fontSize: 11,
    width: 80,
    marginTop: 20,
    alignSelf: 'flex-end',
    textAlign: 'right'
  },
  renderVerifyCodeConatiner: {
    paddingTop: 20,
    justifyContent: 'center',
    width: SystemHelper.width - 44,
  },
  countTimeBtn: {
    height: 20,
    width: 80,
    marginTop: 20,
    alignItems: 'flex-end',
    alignSelf: 'flex-end'
  },
  countTimeBtnTitle: {
    fontSize: 11,
    fontWeight: '100'
  },
  finishBtn: {
    marginTop: 44,
    height: 55,
    alignItems: 'center',
    backgroundColor: greenColor,
    width: SystemHelper.width - 44,
    borderRadius: 8,
    justifyContent: 'center',
  },
  finishBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '400'
  }
})
