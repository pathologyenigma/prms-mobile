import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: global.TAB_BAR_HEIGHT,
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
    display: 'flex',
    justifyContent: 'flex-end'
  },
  naviBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginHorizontal: 11,
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
    // width: 20,
    // height: 20,
    marginLeft: 10,
  },
  listView: {
    flex: 1,
    paddingHorizontal: 11,
  },
  listHeaderView: {
    width: SystemHelper.width,
  },
  conditionView: {
  	marginTop: 14,
    // height: 29,
    width: SystemHelper.width - 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  conditionLeftView: {
    flexDirection: 'row',
    // height: 13,
  },
  conditionLeftBtn: {
    marginRight: 15
  },
  conditionLeftText: {
    fontSize: 13,
    color: '#666',
  },
  conditionRightView: {
    flexDirection: 'row',
  },
  conditionRightBtn: {
    flexDirection: 'row',
    // width: 44,
    // height: 17,
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 2,
  },
  conditionRightText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 17,
    marginHorizontal: 7
  },
  rightBottomImg: {
    width: 3,
    height: 3,
    position: 'absolute',
    right: 0,
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
	bannerContainer: {
		marginTop: 14,
		borderRadius: 5,
		overflow: 'hidden'
	},
	bannerContent: {
		width: SCREEN_WIDTH - 22,
		height: 110,
	},
	bannerItemContainer: {
		// backgroundColor: '#54D693',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	bannerItemImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover'
	},
  videoView: {
    marginTop: 18,
    height: 174,
  },
  videoHeaderView: {
    flexDirection: 'row',
    // height: 16,
    alignItems: 'center',
    width: SystemHelper.width - 22,
    justifyContent: 'center',
  },
  videoTitle: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 18,
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
    // backgroundColor: greenColor,
    borderRadius: 8,
    overflow: 'hidden',
    width: (SystemHelper.width - 46) / 3,
    height: 140,
  },
  videoTextContainer: {
  	position: 'absolute',
  	bottom: 0,
  	paddingBottom: 5,
  	paddingHorizontal: 7,
  	paddingTop: 8.5,
    width: '100%',
  },
  videoText: {
    fontSize: 11,
    color: '#fff',
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
})
