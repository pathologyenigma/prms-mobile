import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollview: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
  navBar: {
    paddingTop: SystemHelper.safeTop + 8,
    height: SystemHelper.safeTop + 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    width: SystemHelper.width,
  },
  backBtn: {
    minWidth: 16 + 44,
    height: 23,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 22,
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
  jubao: {
    width: 23,
    height: 21
  },
  fenxiang: {
    width: 18,
    height: 18
  },

  statusBarStyle: {
    height: SystemHelper.safeTop,
    width: '100%',
    position: 'absolute',
    left: 0,
    top: -SystemHelper.safeTop,
    zIndex: 100
  },
  naviBar: {
    height: SystemHelper.safeTop + 44,
    width: '100%',
    paddingTop: 35,
    paddingHorizontal: 11,
  },
  naviBarContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 20,
    overflow: 'hidden',
  },
  naviBarScrollview: {
    height: 20,
    overflow: 'hidden',
    width: SystemHelper.width - 100,
  },
  naviBarText: {
    height: 20,
    lineHeight: 20,
    fontSize: 16,
    color: '#FFF',
    marginRight: 20,
  },
  naviBarIcon: {
    width: 20,
    height: 20,
  },
  topImage: {
    height: SystemHelper.safeTop + 180,
    width: SystemHelper.width,
  },
  iconView: {
    marginTop: 11,
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    height: 69,
    width: 68,
    borderRadius: 34,
    marginLeft: 11,
  },
  hrIcon: {
    width: 71,
    height: 70
  },
  gender: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  nameView: {
    marginLeft: 21
  },
  hrNameView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  hrRenzheng: {
    marginLeft: 16,
    width: 13,
    height: 15
  },
  hrFocusBtn: {
    width: 50,
    height: 20,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    borderRadius: 4
  },
  hrFocusText: {
    color: '#FFFFFF',
    fontSize: 14
  },
  nameTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400'
  },
  detailInfo: {
    color: '#fff',
    fontSize: 15,
    marginTop: 5,
  },
  companyInfo: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
  matchJobView: {
    backgroundColor: '#fff',
    marginHorizontal: 11,
    marginTop: -30,
    borderRadius: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 11,
    paddingVertical: 21,
    paddingTop: 16,
    elevation: 3,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 3 },
  },
  matchTitle: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold'
  },
  hrMessageBg: {
    width: 300,
    height: 43,
    marginTop: 19,
    flexDirection: 'row'
  },
  hrMessageIcon: {
    width: 27,
    height: 27,
    marginTop: 4,
    marginLeft: 8,
  },
  hrMessageText: {
    marginLeft: 15,
    color: '#888888',
    fontSize: 13,
    lineHeight: 27,
    marginTop: 4
  },
  matchJobTitleView: {
    marginTop: 6,
    width: 45,
    height: 15,
    borderRadius: 2,
    backgroundColor: '#5C70F0',
    alignItems: 'center',
  },
  matchJobTitleText: {
    color: '#FFFFFF',
    fontSize: 9,
    marginTop: 1,
  },
  matchJobCell: {
    borderBottomWidth: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 4,
    paddingBottom: 0,
    minHeight: 50,
    marginHorizontal: 0,
    paddingTop: 0,
  },
  moreJobView: {
    marginTop: 14,
    marginHorizontal: 11,
    borderRadius: 12,
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  moreJobTitle: {
    marginLeft: 10,
    marginTop: 19,
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold'
  },
  moreJobCell: {
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F7F7F7',
    marginTop: 0,
    marginLeft: 0,
    paddingLeft: 11,
    marginRight: 0,
    paddingRight: 11,
    paddingBottom: 20,
  },
  listView: {
    flex: 1
  }
})
