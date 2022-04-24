import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 12,
  },
  tabScrollview: {
    height: 38,
    paddingLeft: 11,
    backgroundColor: '#ffffff',
  },
  listScrollView: {
    backgroundColor: '#F3F3F3',
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

  reviewerContainerRightItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreTitle: {
    color: '#888888',
    fontSize: 13,
    fontWeight: 'bold',
    minWidth: 65,
  },
  linearView: {
    height: 6,
    backgroundColor: '#ECECEC',
    borderRadius: 3,
    overflow: 'hidden',
    flex: 1,
  },
  linearItem: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden'
  },
})
