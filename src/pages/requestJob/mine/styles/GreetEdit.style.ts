import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  saveBtn: {
    color: greenColor,
    fontSize: 15
  },
  inputView: {
    borderRadius: 8,
    marginHorizontal: 11,
    width: SystemHelper.width - 22,
    marginTop: 52,
    paddingBottom: 19,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 1
  },
  contentInput: {
    width: '100%',
    color: '#333333',
    fontSize: 15,
    textAlignVertical: 'top'
  },
  contentAmount: {
    color: '#333333',
    fontSize: 15,
    marginHorizontal: 11,
    marginTop: 11
  },
})
