import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  listView: {
    flex: 1,
    paddingHorizontal: 21,
  },
  titleViewStyle: {
    backgroundColor: '#ffffff',
    marginHorizontal: 12,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 4
  },
  contentView: {
    flex: 1,
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
  interviewerInfo: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  interviewer: {
    color: '#333333',
    fontSize: 12,
    marginLeft: 15,
    fontWeight: 'bold'
  },
  messageIcon: {
    width: 12,
    height: 12,
    marginLeft: 13
  },
  interviewerIcon: {
    width: 24,
    height: 24
  },
  titleCell: {
    flexDirection: 'row',
    marginTop: 15,
  },
  titleCellText: {
    color: '#888888',
    fontSize: 12,
    minWidth: 70
  },
  titleCellDetail: {
    color: '#333333',
    fontSize: 12,
    fontWeight: 'bold',
    width: SystemHelper.width - 110
  },
  phoneView: {
    flexDirection: 'row',
    width: SystemHelper.width - 110,
    alignItems: 'center'
  },
  phoneDetail: {
    color: '#333333',
    fontSize: 12,
    fontWeight: 'bold',
  },
  phoneIcon: {
    width: 11,
    height: 13,
    marginLeft: 12
  },
  locationMap: {
    marginTop: 14,
    borderRadius: 8,
    height: 80,
    width: '100%',
    backgroundColor: greenColor,
  },
  progressView: {
    backgroundColor: '#fff',
    marginTop: 16,
    paddingHorizontal: 21,
    paddingVertical: 16,
    marginHorizontal: 11,
    borderRadius: 8,
  },
  progressTitle: {
    color: '#333333',
    fontSize: 17,
    fontWeight: 'bold'
  },
  cellStyle: {
    marginHorizontal: 0,
    height: 48,
    flexDirection: 'row',
    marginTop: 8,
  },
  grayCircle: {
    width: 12,
    height: 12,
    backgroundColor: '#E9E9E9',
    position: 'absolute',
    left: 0,
    top: 4,
    borderRadius: 6
  },
  grayLine: {
    width: 1,
    height: '100%',
    position: 'absolute',
    left: 5.5,
    top: 12,
  },
  timeView: {
    width: 24,
    alignItems: 'center',
  },
  interviewInfoView: {
    flexDirection: 'row'
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
  progressStatus: {
    color: '#888888',
    fontSize: 11,
    fontWeight: 'bold'
  },
  progressTime: {
    color: '#888888',
    marginTop: 4,
    fontSize: 10,
    fontWeight: 'bold',
  },
  progressDetail: {
    marginTop: 10,
    color: '#888888',
    fontSize: 13
  },
  scoreTitle: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 30,
  },
  scoreView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  scoreCellTitle: {
    color: '#666666',
    fontSize: 13,
    fontWeight: 'bold',
    marginRight: 10,
    minWidth: 58,
  },
  scoreStar: {
    width: 10,
    height: 10,
    marginLeft: 5
  },
  tagView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SystemHelper.width - 40,
  },
  tagBtn: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
    marginTop: 10,
    minHeight: 19,
  },
  tagText: {
    color: '#888888',
    fontSize: 12,
    lineHeight: 19,
  },
  inputView: {
    borderRadius: 8,
    width: SystemHelper.width - 55,
    paddingHorizontal: 11,
    height: 108,
    justifyContent: 'space-between',
    backgroundColor: '#F4F4F4',
    marginTop: 10,
  },
  contentInput: {
    width: '100%',
    color: '#666666',
    fontSize: 12,
    textAlignVertical: 'top'
  },
  contentAmount: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 5
  },
  contentCell: {
    minHeight: 80,
    paddingHorizontal: 11,
    justifyContent: 'center',
    marginTop: 10,
  },
  btnContainer: {
    width: SystemHelper.width - 55,
    height: 40,
    marginTop: 35,
  },
  modalView: {
    width: SystemHelper.width * 0.75,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modalTitle: {
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalInput: {
    padding: 0,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    marginTop: 22,
    height: 46,
    textAlign: 'center',
    width: '100%'
  },
  modalBtn: {
    marginTop: 19,
    height: 45,
    width: SystemHelper.width * 0.5,
    backgroundColor: greenColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6
  },
  modalBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
