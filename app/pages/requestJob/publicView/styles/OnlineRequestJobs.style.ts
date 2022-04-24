import { StyleSheet } from 'react-native'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 12,
  },
  tabScrollview: {
    height: 32,
    paddingLeft: 11,
  },
  containerType: {
    width: 56,
    height: 32,
    borderRadius: 4,
    marginRight: 11,
  },
  jobTypeBtn: {
    width: 56,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
    marginRight: 11,
    borderRadius: 4
  },
  cellStyle: {
    borderRadius: 0,
    marginTop: 0,
    marginHorizontal: 0,
  },
  noMoreJobs: {
    marginTop: 30,
    color: '#666',
    fontSize: 12,
    textAlign: 'center'
  },
})
