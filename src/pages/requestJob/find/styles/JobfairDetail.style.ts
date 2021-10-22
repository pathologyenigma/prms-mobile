import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollview: {
    flex: 1,
  },
  title: {
    color: '#333333',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 17,
    paddingBottom: 17,
    marginHorizontal: 10,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1
  },
  topBg: {
    width: SystemHelper.width,
  },
  timeView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 11,
    marginBottom: 6,
  },
  time: {
    lineHeight: 15,
    fontSize: 12,
    color: '#666',
  },
  timeIcon: {
    width: 11,
    height: 11,
    marginRight: 5
  },
  locationIcon: {
    width: 11,
    height: 14
  },
  locationTitle: {
    color: '#333',
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold'
  },
  locationValue: {
    color: '#666666',
    marginLeft: 12,
    fontSize: 12,
  },
  mapView: {
    marginHorizontal: 11,
    width: SystemHelper.width - 22,
    height: 80,
    backgroundColor: greenColor,
    marginTop: 15,
    borderRadius: 4
  },
  roleText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 11,
    marginBottom: 9
  },
  amountView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 11,
    marginTop: 5,
    minHeight: 18,
    alignItems: 'center'
  },
  gangwei: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qiyeIcon: {
    width: 18,
    height: 17,
    marginRight: 13
  },
  amountText: {
    color: '#666666',
    fontSize: 12,
    fontWeight: 'bold'
  },
  jobSeekerAmountIcon: {
    width: 18,
    height: 18,
    marginRight: 13
  },

  tabsView: {
    flexDirection: 'row',
    height: 38,
    backgroundColor: '#fff',
    paddingHorizontal: 11,
    marginTop: 18
  },
  tabLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  tabsBtn: {
    marginRight: 24,
    alignItems: 'center',
  },
  tabsTitle: {
    fontSize: 16,
    color: '#666',
  },
  selectedTitle: {
    color: '#333',
    fontWeight: 'bold'
  },
  tabsLine: {
    height: 6,
    borderRadius: 3,
    width: 24,
    marginTop: 4
  },
  footerBtnView: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0'
  },
  footerBtnContainer: {
    width: SystemHelper.width - 44,
    marginLeft: 22,
    height: 40,
    borderRadius: 4,
    marginBottom: SystemHelper.safeBottom + 4,
    marginTop: 4,
    backgroundColor: 'red',
  },
  footerBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  footerBtnTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold'
  },
  footerBtnDetail: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  detailView: {
    paddingHorizontal: 11,
    marginTop: 10,
  },
  detailViewTitle: {
    color: '#666666',
    fontSize: 13,
  },
  detailIcon: {
    width: SystemHelper.width - 22,
    height: 108,
    backgroundColor: greenColor,
    borderRadius: 8,
    marginVertical: 18,
  },
  listView: {
    flex: 1,
    paddingHorizontal: 11,
  },
  questionView: {
    position: 'absolute',
    bottom: SystemHelper.safeBottom + 44,
    right: 0,
    zIndex: 1
  },
  askBtnIcon: {
    width: 85,
    height: 88
  },
  askView: {
    paddingHorizontal: 11,
    paddingVertical: 18,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
  },
  cellTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconImage: {
    width: 44,
    height: 44
  },
  commentInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  cellTitle: {
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 15
  },
  cellJob: {
    color: '#888888',
    fontSize: 13,
  },
  answerView: {
    backgroundColor: '#F8F8F8',
    borderRadius: 7,
    padding: 7,
    marginTop: 10,
  },
  answerViewPerson: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  answerViewPersonIcon: {
    width: 17,
    height: 17,
  },
  answerViewTitle: {
    marginLeft: 8,
    color: '#333333',
    fontSize: 12,
    fontWeight: 'bold'
  },
  answerViewContent: {
    marginTop: 8,
    color: '#666666',
    fontSize: 12
  },
})
