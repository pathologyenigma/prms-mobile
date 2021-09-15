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
  interviewView: {
    marginTop: 26,
    paddingHorizontal: 11,
  },
  reviewerContainer: {
    flexDirection: 'row'
  },
  scoreView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 10,
    marginTop: 18,
  },
  scoreText: {
    color: '#FC384B',
    fontSize: 30,
    fontWeight: 'bold',
  },
  scoreUnit: {
    marginBottom: 4,
    color: '#888888',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  starView: {
    flexDirection: 'row'
  },
  starItem: {
    width: 10,
    height: 10,
    marginRight: 5
  },
  reviewerContainerLeft: {
    alignItems: 'center',
  },
  line: {
    width: 1,
    height: 45,
    backgroundColor: '#dddddd',
    marginHorizontal: 17,
    alignSelf: 'center'
  },
  reviewerContainerRight: {
    flex: 1,
    justifyContent: 'space-between'
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
  grayView: {
    height: 5,
    width: '100%',
    backgroundColor: '#F8F8F8',
    marginTop: 20,
  }
})
