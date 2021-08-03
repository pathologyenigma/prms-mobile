import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollview: {
    flex: 1,
  },
  titleView: {
    marginTop: 38,
  },
  titleTextView: {
    flexDirection: 'row',
    marginLeft: 23,
    alignItems: 'center'
  },
  titleText: {
    color: '#333333',
    fontSize: 20,
    fontWeight: '400'
  },
  titleProgress: {
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 5,
  },
  titleViewDetail: {
    marginTop: 12,
    color: '#333333',
    fontSize: 12,
    marginLeft: 21,
  },
  jobView: {
    paddingVertical: 26,
    marginHorizontal: 12,
    elevation: 3,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    minHeight: 100,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 26,
    shadowOffset: { width: 0, height: 1 },
    paddingHorizontal: 15,
  },
  jobTitle: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold'
  },
  jobInfoView: {
    flexDirection: 'row',
    marginTop: 8,
  },
  jobInfo: {
    color: '#333333',
    fontSize: 12,
    marginRight: 23
  },
  jobPlatformView: {
    marginTop: 9,
    flexDirection: 'row',
  },
  jobPlatform: {
    color: '#666666',
    fontSize: 10,
    marginRight: 15
  },
  editBtn: {
    position: 'absolute',
    right: 16,
    top: 26
  },
  editImage: {
    width: 15,
    height: 15
  },
  jobStatus: {
    paddingVertical: 26,
    marginHorizontal: 12,
    elevation: 3,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    minHeight: 60,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 10,
    shadowOffset: { width: 0, height: 1 },
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  jobStatusTitle: {
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 14,
  },
  jobStatusNext: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  jobStatusNextStatus: {
    color: '#666666',
    fontSize: 12,
  },
  nextImage: {
    marginLeft: 16,
    width: 7,
    height: 12
  },
  finishBtn: {
    marginTop: 104,
    height: 55,
    alignItems: 'center',
    marginLeft: 22,
    backgroundColor: greenColor,
    width: SystemHelper.width - 44,
    borderRadius: 8,
    justifyContent: 'center',
  },
  finishBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '400'
  }
})
