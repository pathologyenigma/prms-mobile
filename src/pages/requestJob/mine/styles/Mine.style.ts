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
    height: SystemHelper.safeTop + 286,
    width: SystemHelper.width,
  },
  scanBtn: {
    marginTop: SystemHelper.safeTop + 28,
    alignSelf: 'flex-end',
    marginRight: 11,
  },
  scanImage: {
    width: 22,
    height: 22
  },
  iconView: {
    marginTop: 11,
    flexDirection: 'row',
  },
  avatar: {
    height: 69,
    width: 68,
    borderRadius: 34,
    marginLeft: 11,
    backgroundColor: 'pink',
  },
  gender: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  nameView: {
    marginLeft: 21
  },
  nameTitle: {
    marginTop: 5,
    color: '#FDFDFD',
    fontSize: 21,
    fontWeight: '400'
  },
  detailInfo: {
    marginTop: 8,
    color: '#FDFDFD',
    fontSize: 14,
  },
  onlineJianliView: {
    height: 40,
    width: 85,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'absolute',
    right: 0,
    top: 15,
    justifyContent: 'center',
    paddingLeft: 18
  },
  onlineJianliTop: {
    flexDirection: 'row',
    minHeight: 12,
    alignItems: 'center',
  },
  onlineText: {
    color: '#EBD793',
    fontSize: 10
  },
  onlineJianli: {
    color: '#EAD991',
    fontSize: 12,
    fontWeight: 'bold'
  },
  yellowRight: {
    width: 7,
    height: 12,
    marginLeft: 4,
    marginRight: 9,
  },
  detailInfoView: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 11
  },
  detailInfoItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailInfoValue: {
    color: '#FDFDFD',
    fontSize: 15,
    fontWeight: '400',
  },
  detailInfoTag: {
    color: '#FDFDFD',
    fontSize: 13,
  },
  jianliViewContainer: {
    backgroundColor: '#fff',
    height: 192,
    marginTop: -58,
    borderRadius: 8,
    paddingTop: 5,
    elevation: 3,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 3 },
    marginHorizontal: 11,
  },
  jianliView: {
    backgroundColor: '#fff',
    // height: 110,
    marginHorizontal: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 12,
  },
  jianliItem: {
    alignItems: 'center'
  },
  jianliIcon: {
    width: 45,
    height: 49
  },
  jianliTag: {
    color: '#333333',
    fontSize: 12,
  },
  adImage: {
    marginTop: 21,
    height: 94,
    borderRadius: 8,
    backgroundColor: greenColor,
    marginHorizontal: 11,
  },
  myStudyContainer: {
    marginTop: 17,
    height: 120,
    paddingLeft: 11,
  },
  myStudyView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 11,
    justifyContent: 'space-between',
  },
  myStudy: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  moreTextView: {
    flexDirection: 'row'
  },
  moreText: {
    color: '#666666',
    fontSize: 12,
  },
  rightArrow: {
    width: 8,
    height: 14,
    marginLeft: 13
  },
  studyView: {
    height: 190,
    marginTop: 13,

  },
  studyItem: {
    width: 139,
    height: 80,
    backgroundColor: greenColor,
    borderRadius: 8,
    marginRight: 11
  },
  cellItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 44,
    paddingHorizontal: 11,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftArrow: {
    width: 21,
    height: 21,
  },
  otherTitle: {
    fontWeight: 'bold',
    color: '#666666',
    fontSize: 13,
    marginLeft: 17
  },
  loginBtn: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 34 + SystemHelper.safeBottom
  },
  loginBtnText: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  }
})
