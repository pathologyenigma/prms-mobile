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
    height: SystemHelper.safeTop + 61,
    width: '100%',
    paddingHorizontal: 11,
    paddingTop: SystemHelper.safeTop + 29,
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
  listView: {
    flex: 1,
    paddingHorizontal: 11,
  },
  listHeaderView: {
    width: SystemHelper.width,
  },
  conditionView: {
    height: 29,
    width: SystemHelper.width - 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  conditionLeftView: {
    flexDirection: 'row',
    height: 13,
    marginTop: 14
  },
  conditionLeftBtn: {
    height: 13,
    marginRight: 15
  },
  conditionLeftText: {
    fontSize: 13,
    lineHeight: 13,
    color: '#666',
  },
  conditionRightView: {
    flexDirection: 'row',
    marginTop: 12
  },
  conditionRightBtn: {
    flexDirection: 'row',
    width: 44,
    height: 17,
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 2,
  },
  conditionRightText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 17,
    marginLeft: 7,
  },
  rightBottomImg: {
    width: 3,
    height: 3,
    position: 'absolute',
    right: 3,
    bottom: 3
  },

  carousel: {
    width: SystemHelper.width - 22,
    height: 110,
    marginTop: 12
  },
  dots: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginHorizontal: 3,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  activeDots: {
    width: 12,
    height: 5,
    borderRadius: 3,
    marginHorizontal: 3,
    overflow: 'hidden',
    backgroundColor: '#5AE5A8',
  },
  pageController: {
    width: SystemHelper.width - 22,
    alignItems: 'center',
    position: 'absolute',
  },
  adBtn: {
    width: '100%',
    height: '100%',
    backgroundColor: greenColor,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adText: {
    color: '#fff',
    alignSelf: 'center'
  },
  videoView: {
    marginTop: 18,
    height: 174,
  },
  videoHeaderView: {
    flexDirection: 'row',
    height: 16,
    alignItems: 'center',
    width: SystemHelper.width - 22,
    justifyContent: 'center',
  },
  videoTitle: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1
  },
  videoDetail: {
    lineHeight: 16,
    color: '#666666',
    fontSize: 12,
    marginRight: 10
  },
  videoRightImg: {
    width: 6,
    height: 11
  },
  videoTopView: {
    marginTop: 18,
    height: 158,
    width: SystemHelper.width - 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  videoBtn: {
    backgroundColor: greenColor,
    borderRadius: 8,
    width: (SystemHelper.width - 46) / 3,
    height: 140,
  },
  videoText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    bottom: 5,
    width: '100%',
    position: 'absolute'
  },
  videoTagContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: 14,
    width: 68,
    borderRadius: 7,
    marginTop: 5,
    marginLeft: 6,
    overflow: 'hidden',
    alignItems: 'center'
  },
  videoTagView: {
    width: 39,
    height: 14,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  videoTagTitle: {
    fontSize: 10,
    color: '#fff',
    marginLeft: 2,
    lineHeight: 12
  },
  videoTable: {
    marginLeft: 5,
    width: 7,
    height: 8
  },
  videoAccount: {
    color: '#FFF',
    fontSize: 8,
    width: 29,
    textAlign: 'center',
  },
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
