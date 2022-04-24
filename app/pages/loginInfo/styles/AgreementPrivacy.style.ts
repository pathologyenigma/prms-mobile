import { StyleSheet } from 'react-native'
import SystemHelper from '../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    width: SystemHelper.width,
    backgroundColor: '#fff',
    paddingHorizontal: 11,
    paddingVertical: 20,
  },
  contentText: {
    color: '#333333',
    fontSize: 15,
    lineHeight: 23,
  }
})
