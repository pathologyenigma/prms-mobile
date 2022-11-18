import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  confirmBtn: {
    color: '#333333',
    fontSize: 15
  },
  titleView: {
    marginTop: 10,
    paddingHorizontal: 11,
  },
  title: {
    fontSize: 20,
    color: '#333333',
    fontWeight: '400'
  },
  description: {
    marginTop: 5,
    fontSize: 13,
    color: '#666666',
  },
  detailInput: {
    width: '100%',
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
    textAlignVertical: 'top',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    height: 200,
  },
  detailView: {
    marginTop: 37,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
})
