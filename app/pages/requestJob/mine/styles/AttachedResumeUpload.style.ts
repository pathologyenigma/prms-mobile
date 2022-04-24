import { StyleSheet } from 'react-native'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    marginTop: 10,
    paddingHorizontal: 11,
    alignItems: 'center'
  },
  title: {
    color: '#333333',
    fontSize: 13,
    fontWeight: '400',
    marginTop: 19,
  },
  progressContain: {
    height: 5,
    width: 200,
    backgroundColor: '#E3E3E3',
    borderRadius: 3,
    marginTop: 23,
    overflow: 'hidden'
  },
  progressView: {
    height: 5,
    width: 0,
    backgroundColor: '#7FDDA1',
    borderRadius: 3,
  },
  uploadIcon: {
    width: 185,
    height: 87,
    marginTop: 94
  }
})
