import { StyleSheet } from 'react-native'
import { greenColor } from '../../../utils/constant'

export default StyleSheet.create({
  cellView: {
    borderRadius: 8,
    minHeight: 125,
    paddingHorizontal: 17,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#FFF',
    marginTop: 10,
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
    flexDirection: 'row'
  },
  cellCompany: {
    color: '#333',
    marginRight: 12,
    fontWeight: '200',
    fontSize: 12
  },
  cellJobView: {
    flexDirection: 'row',
    marginTop: 8,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  cellExperience: {
    marginRight: 9,
    borderRadius: 3,
    backgroundColor: '#F0F0F0',
    height: 15,
    lineHeight: 15,
    fontSize: 10,
    color: '#888',
    paddingHorizontal: 6
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
  }
})