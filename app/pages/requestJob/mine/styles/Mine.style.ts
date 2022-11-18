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
  scrollViewContent: {
  	paddingBottom: TAB_BAR_HEIGHT + 100
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
    paddingTop: SystemHelper.safeTop + 30,
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
    flexDirection: 'row',
  },
  avatarContainer: {
  	marginLeft: 20,
  },
  avatar: {
  	borderRadius: 69 / 2.0,
    borderWidth: 2,
    borderColor: '#FDFDFD',
   	height: 69,
    width: 69,
  },
  gender: {
    position: 'absolute',
    top: 50,
    right: 3,
  },
  nameView: {
    marginLeft: 21,
    flex: 1,
    justifyContent: 'center',
  },
  nameTitle: {
    color: '#FDFDFD',
    fontSize: 21,
    fontWeight: 'bold'
  },
  detailInfo: {
    marginTop: 13,
    color: '#FDFDFD',
    fontSize: 14,
  },
  onlineJianliView: {
  	alignSelf: 'center',
  	height: 40,
  	justifyContent: 'center',
    paddingLeft: 18,
    paddingRight: 8.5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  onlineJianliTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineJianli: {
    color: '#EAD991',
    fontSize: 12,
    fontWeight: '500'
  },
  yellowRight: {
    marginLeft: 4,
  },
  onlineText: {
    color: '#EBD793',
    fontSize: 10,
  },
  detailInfoView: {
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  detailInfoItem: {
    alignItems: 'center',
  },
  detailInfoValue: {
    color: '#FDFDFD',
    fontSize: 15,
    fontWeight: '600',
  },
  detailInfoTag: {
  	marginTop: 8.5,
    color: '#FDFDFD',
    fontSize: 13,
  },
  jianliViewContainer: {
  	flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    marginTop: -30,
    marginHorizontal: 15,
    paddingTop: 11,
    borderRadius: 8,
    shadowColor: '#7DE2AC',
    shadowRadius: 9,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  jianliItem: {
  	width: '33%',
    alignItems: 'center',
    marginBottom: 25,
  },
  jianliIcon: {
    width: 45,
    height: 49,
    resizeMode: 'contain'
  },
  jianliTag: {
  	marginTop: 5.5,
    color: '#333333',
    fontSize: 12,
  },
  adImage: {
    marginTop: 20,
    height: 94,
    borderRadius: 8,
    // backgroundColor: greenColor,
    marginHorizontal: 15,
  },
  myStudyContainer: {
    paddingHorizontal: 15,
  },
  myStudyView: {
  	paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  myStudy: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '500',
  },
  moreTextView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  moreText: {
    color: '#666666',
    fontSize: 12,
    marginRight: 13
  },
  studyView: {
    
  },
  studyItem: {
    width: 139,
    height: 80,
    // backgroundColor: greenColor,
    borderRadius: 8,
    marginRight: 11
  },
  sectionOtherTitle: {
  	paddingHorizontal: 15,
  	paddingTop: 28,
  	paddingBottom: 10,
  	fontSize: 15,
  	color: '#333333',
  	fontWeight: '500'
  },
  cellItem: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 13,
    paddingHorizontal: 15,
  },
  leftArrow: {
    
  },
  otherTitle: {
    fontWeight: '500',
    color: '#666666',
    flex: 1,
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
