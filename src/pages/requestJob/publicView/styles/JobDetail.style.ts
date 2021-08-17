import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
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
    height: 14,
    alignItems: 'center'
  },
  headerExperience: {
    marginRight: 25,
    height: 15,
    lineHeight: 15,
    fontSize: 12,
    color: '#333333',
  },
  interviewerView: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center'
  },
  interviewerIcon: {
    width: 29,
    height: 29,
    borderRadius: 14.5,
    backgroundColor: greenColor,
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
  }
})
