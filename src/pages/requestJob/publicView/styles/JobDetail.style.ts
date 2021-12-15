import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  navBar: {
    paddingTop: SystemHelper.safeTop + 8,
    height: SystemHelper.safeTop + 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    backgroundColor: '#F8F8F8',
  },
  backBtn: {
    minWidth: 16 + 44,
    height: 23,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 11,
  },
  backImage: {
    width: 12,
    height: 23,
  },
  rightView: {
    flexDirection: 'row',
    marginRight: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightItem: {
    marginRight: 20,
    width: 23,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shoucang: {
    width: 20,
    height: 19
  },
  jubao: {
    width: 23,
    height: 21
  },
  fenxiang: {
    width: 18,
    height: 18
  },
  headerView: {
    minHeight: 110,
    paddingTop: 22,
    paddingBottom: 23,
    backgroundColor: '#FFF',
    marginTop: 10,
    marginHorizontal: 11,
    borderRadius: 8,
    paddingHorizontal: 11
  },
  headerTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 18
  },
  headerSalary: {
    color: '#57DE9E',
    fontWeight: '400',
    fontSize: 16
  },
  headerCompanyView: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerCompany: {
    color: '#666666',
    marginRight: 22,
    fontSize: 13
  },
  headerJobView: {
    flexDirection: 'row',
    marginTop: 11,
    alignItems: 'center'
  },
  headerExperience: {
    marginRight: 25,
    height: 15,
    lineHeight: 15,
    fontSize: 12,
    color: '#333333',
  },
  headerInterviewer: {
    marginLeft: 11,
    color: '#666',
    fontSize: 13
  },
  location: {
    width: 11,
    height: 14,
    marginRight: 8
  },
  locationText: {
    color: '#333333',
    fontSize: 13,
    fontWeight: 'bold'
  },
  interviewerView: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    minHeight: 88,
    marginHorizontal: 11,
    borderRadius: 8,
  },
  interviewerIcon: {
    marginLeft: 11,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: greenColor,
  },
  interviewerInfo: {
    flex: 1,
    marginLeft: 12
  },
  interviewerTitleView: {
    flexDirection: 'row',
    minHeight: 15,
    alignItems: 'center',
  },
  interviewerTitle: {
    color: '#333333',
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 15,
  },
  dot: {
    marginLeft: 18,
    marginRight: 5,
    width: 6,
    height: 6,
    backgroundColor: '#AAAAAA',
    borderRadius: 3
  },
  interviewerOnline: {
    color: '#AAAAAA',
    fontSize: 10,
    lineHeight: 15,
    fontWeight: 'bold'
  },
  interviewerCompany: {
    marginTop: 16,
    color: '#666666',
    fontSize: 12
  },
  nextBtn: {
    marginRight: 10,
    width: 7,
    height: 13
  },
  jobInfoTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  jobInfoTagView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  jobInfoTagItem: {
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    paddingHorizontal: 9,
    lineHeight: 18,
    color: '#888888',
    fontSize: 11,
    marginRight: 9,
    marginTop: 8
  },
  jobInfoDetail: {
    color: '#333333',
    fontSize: 14,
    marginTop: 22,
    lineHeight: 18,
  },
  jobContent: {
    color: '#666666',
    marginTop: 20,
    fontSize: 13,
    lineHeight: 18,
  },
  showMoreText: {
    marginBottom: -4,
    lineHeight: 18,
    color: '#57DE9E',
    fontSize: 13,
    fontWeight: 'bold'
  },
  companyInfo: {
    flexDirection: 'row',
    minHeight: 50,
    marginTop: 16,
    alignItems: 'center'
  },
  companyTitle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  companyIcon: {
    width: 50,
    height: 50,
    backgroundColor: greenColor,
    borderRadius: 4
  },
  companyName: {
    marginLeft: 18,
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  jobRenzheng: {
    marginLeft: 16,
    width: 13,
    height: 15,
  },
  companyTag: {
    marginTop: 17,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  companyTagItem: {
    marginRight: 27,
    color: '#666666',
    fontSize: 13
  },
  map: {
    marginTop: 17,
    height: 180,
    backgroundColor: greenColor,
    borderRadius: 8
  },
  listView: {
    flex: 1,
  },
  cellStyle: {
    borderRadius: 0,
    marginTop: 0,
    marginHorizontal: 0,
  },
  dotContainer: {
    flexDirection: 'row',
    width: SystemHelper.width,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotView: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E7E7E7',
    marginRight: 6
  },
  selectDot: {
    backgroundColor: '#57DE9E',
    width: 9,
    height: 4,
    borderRadius: 2
  },
  tipsView: {
    minHeight: 189,
    width: SystemHelper.width - 22,
    alignSelf: 'center',
    marginTop: 12,
    borderRadius: 5,
    paddingTop: 15,
    paddingRight: 13,
    backgroundColor: 'blue',
    paddingBottom: 18,
    paddingLeft: 11,
    flexDirection: 'row',
    overflow: 'hidden',
    flex: 1,
  },
  zhuyiIcon: {
    width: 15,
    height: 15,
    marginRight: 7,
    marginTop: 2
  },
  zhuyiText: {
    flex: 1,
    lineHeight: 18,
    fontSize: 12,
    color: '#E66B42',
    fontWeight: 'bold'
  }
})
