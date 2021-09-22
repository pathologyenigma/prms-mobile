import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listView: {
    flex: 1,
    paddingHorizontal: 21,
  },
  cellStyle: {
    marginHorizontal: 0,
    height: 85,
    marginTop: 20,
  },
  contentView: {
    flex: 1,
  },
  timeView: {
    width: 80,
    paddingRight: 10,
    alignItems: 'center',
  },
  timeDate: {
    color: '#333333',
    fontSize: 14,
  },
  timeHour: {
    color: '#888888',
    fontSize: 12,
  },
  interviewInfoView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  companyInfo: {
    marginLeft: 17,
    width: SystemHelper.width - 109,
  },
  cellCompany: {
    color: '#333333',
    fontSize: 17,
    fontWeight: 'bold'
  },
  cellStatus: {
    color: '#333333',
    fontSize: 12,
    fontWeight: 'bold'
  },
  cellJobInfo: {
    color: '#666666',
    fontSize: 14,
  },
  companyIcon: {
    width: 50,
    height: 50,
    borderRadius: 4
  },
  cellCompanyDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
