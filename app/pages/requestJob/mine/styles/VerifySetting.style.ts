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
    marginTop: 30
  },
  title: {
    color: '#333333',
    fontSize: 20,
    fontWeight: '400'
  },
  cellView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SystemHelper.width - 22,
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
  },
  cellTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '400',
    flex: 1
  },
  nextIcon: {
    width: 7,
    height: 12
  },
  cellValue: {
    color: '#4F74FF',
    fontSize: 15,
    fontWeight: 'bold'
  },
  cellName: {
    flex: 1,
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  topView: {
    width: SystemHelper.width,
    alignItems: 'center',
    marginTop: 38,
  },
  successIcon: {
    width: 75,
    height: 76,
  },
  currentCode: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 23
  },
  appealBtn: {
    marginTop: 15,
    alignSelf: 'flex-end'
  },
  appealText: {
    color: '#888888',
    fontSize: 13,
  },
  verifyExplainBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    alignSelf: 'center',
    marginBottom: SystemHelper.safeBottom + 20
  },
  verifyExplainText: {
    color: '#57DE9E',
    fontSize: 11,
    fontWeight: 'bold'
  },
  inputContainer: {
    marginHorizontal: 11,
    height: 57,
    paddingTop: 20,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    alignItems: 'center',
    width: SystemHelper.width - 22,
    flexDirection: 'row'
  },
  accountLoginInput: {
    padding: 0,
    fontSize: 15,
    color: '#333333',
    flex: 1,
    textAlign: 'right'
  },
  editTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
  },
  finishBtn: {
    height: 55,
    width: SystemHelper.width - 42,
    marginHorizontal: 21,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 138,
    backgroundColor: '#56d693',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  finishText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '400'
  },
})
