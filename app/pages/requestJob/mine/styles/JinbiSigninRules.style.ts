import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollview: {
    paddingBottom: 20,
  },
  content: {
    marginHorizontal: 21,
    lineHeight: 21,
    color: '#333',
    fontSize: 15,
  }
})
