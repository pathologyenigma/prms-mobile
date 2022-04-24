import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listView: {
    flex: 1,
    paddingHorizontal: 21,
    marginTop: 20,
  },
  cellStyle: {
    marginHorizontal: 0,
    height: 130,
    flexDirection: 'row'
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
    color: '#333333',
    fontSize: 17,
    marginTop: 9
  },
  grayCircle: {
    width: 12,
    height: 12,
    backgroundColor: '#E9E9E9',
    position: 'absolute',
    right: 0,
    top: 4,
    borderRadius: 6
  },
  grayLine: {
    width: 1,
    height: '100%',
    position: 'absolute',
    right: 5.5,
    top: 12,
  },
  dashView: {
    width: 1,
  },
  dashItem: {
    backgroundColor: '#CBCBCB',
    width: 1,
    height: 6,
    marginTop: 3
  },
  interviewInfoView: {
    flex: 1,
    marginLeft: 13,
    paddingBottom: 40,
    borderRadius: 5,
    marginBottom: 40,
  },
  shadowView: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginTop: 5,
    borderRadius: 9
  },
  companyInfo: {
    flexDirection: 'row',
  },
  cellCompany: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold'
  },
  cellType: {
    marginLeft: 12,
    borderColor: '#E4E4E4',
    borderWidth: 1,
    borderRadius: 3,
    color: '#666666',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 3,
    lineHeight: 16,
    paddingTop: 2
  },
  jobInfo: {
    flexDirection: 'row',
    marginTop: 3,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cellJobInfo: {
    color: '#666666',
    fontSize: 11
  },
  cellStatus: {
    color: '#666666',
    fontSize: 14,
  },
  interviewerInfo: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  interviewer: {
    color: '#333333',
    fontSize: 11,
    fontWeight: 'bold'
  },
  messageIcon: {
    width: 12,
    height: 12,
    marginLeft: 13
  },
})
