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
    paddingLeft: 22,
  },
  findPassword: {
    color: '#333',
    fontSize: 20,
    fontWeight: '400',
    marginTop: 10,
    paddingBottom: 8,
  },
  accountLoginContainer: {
    height: 57,
    paddingTop: 20,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    justifyContent: 'center',
    width: SystemHelper.width - 44
  },
  accountLoginInput: {
    padding: 0,
    fontSize: 15,
    color: '#333333',
  },
  countTimeBtnText: {
    color: '#fff',
    height: 20,
    borderRadius: 4,
    lineHeight: 20,
    fontSize: 11,
    backgroundColor: '#333',
    width: 80,
    textAlign: 'center'
  },
  renderVerifyCodeConatiner: {
    height: 57,
    paddingTop: 20,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    justifyContent: 'center',
    width: SystemHelper.width - 44,
    flexDirection: 'row',
    alignItems: 'center'
  },
  countTimeBtn: {
    height: 20,
    width: 80,
    borderRadius: 4
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
