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
  finishBtn: {
    marginTop: 78,
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
  },
  accountLoginConatiner: {
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginTop: 30,
    justifyContent: 'center',
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
  zhuyiView: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center'
  },
  zhuyiIcon: {
    width: 12,
    height: 12,
  },
  zhuyiText: {
    marginLeft: 7,
    fontSize: 12,
    color: '#888888'
  }
})
