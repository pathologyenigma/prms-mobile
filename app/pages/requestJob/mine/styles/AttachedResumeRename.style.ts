import { StyleSheet } from 'react-native'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  saveBtn: {
    color: '#333333',
    fontSize: 15
  },
  content: {
    marginTop: 10,
    paddingHorizontal: 11,
  },
  title: {
    color: '#333333',
    fontSize: 18,
    fontWeight: '400'
  },
  detail: {
    color: '#666',
    fontSize: 13,
    marginTop: 13,
  },
  inputView: {
    borderRadius: 4,
    width: SystemHelper.width - 22,
    paddingHorizontal: 11,
    justifyContent: 'space-between',
    marginTop: 30,
    backgroundColor: '#F4F4F4',
  },
  contentInput: {
    width: '100%',
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 15,
    textAlignVertical: 'top'
  },
  contentAmount: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 5
  },
})
