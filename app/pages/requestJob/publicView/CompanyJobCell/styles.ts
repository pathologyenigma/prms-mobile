import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'

export default StyleSheet.create({
  cellView: {
    minHeight: 100,
    paddingTop: 16,
    paddingBottom: 8,
    marginLeft: 22,
    marginRight: 20,
    backgroundColor: '#FFF',
    marginTop: 10,
    marginHorizontal: 21,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  cellTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cellTitle: {
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 15
  },
  cellSalary: {
    color: '#57DE9E',
    fontWeight: '400',
    fontSize: 16
  },
  cellCompanyView: {
    marginTop: 7,
    flexDirection: 'row',
  },
  cellCompany: {
    color: '#333',
    marginRight: 12,
    fontWeight: '200',
    fontSize: 12
  },
  cellJobView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginRight: 10
  },
  cellExperience: {
    marginRight: 25,
    // height: 15,
    lineHeight: 20,
    fontSize: 12,
    color: '#333333',
  },
  publishTime: {
    color: '#888888',
    fontSize: 10,
    marginTop: 8
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
  cellInterviewer: {
    marginLeft: 11,
    color: '#666',
    fontSize: 13
  },
  onDelivery: {
    backgroundColor: greenColor,
    width: 57,
    height: 23,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  onDeliveryText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold'
  }
})
