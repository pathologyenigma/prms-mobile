import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: '#333333',
    fontSize: 20,
    fontWeight: '400'
  },
  submitBtn: {
    backgroundColor: greenColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 55,
    marginTop: 109,
    marginHorizontal: 21,
  },
  selectText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '400'
  },
  inputContainer: {
    marginHorizontal: 22,
    height: 57,
    paddingTop: 20,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    alignItems: 'center',
    width: SystemHelper.width - 44,
    flexDirection: 'row'
  },
  cellTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 15,
  },
  accountLoginInput: {
    padding: 0,
    fontSize: 15,
    color: '#333333',
    flex: 1
  },
})
