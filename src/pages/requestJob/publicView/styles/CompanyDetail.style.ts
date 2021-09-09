import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#222222',
  },
  navBar: {
    paddingTop: SystemHelper.safeTop + 8,
    height: SystemHelper.safeTop + 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    backgroundColor: '#222222',
  },
  backBtn: {
    minWidth: 16 + 44,
    height: 23,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 11,
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
  shoucang: {
    width: 20,
    height: 19
  },
  jubao: {
    width: 23,
    height: 21
  },
  fenxiang: {
    width: 18,
    height: 18
  },
  headerView: {
    minHeight: 110,
    paddingTop: 22,
    paddingBottom: 23,
    backgroundColor: '#222222',
    marginTop: 10,
    marginHorizontal: 11,
    borderRadius: 8,
    paddingHorizontal: 11
  },
  headerTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 18
  },
  headerSalary: {
    color: '#57DE9E',
    fontWeight: '400',
    fontSize: 16
  },
  companyXinxi: {
    paddingHorizontal: 11,
    marginTop: 39,
  },
  companyXinxiTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold'
  },
  companyXinxiDetail: {
    color: '#DEDEDE',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 28,
  },
  showMore: {
    color: greenColor,
  },
  companyXinxiView: {
    marginTop: 25,
    justifyContent: 'center',
    backgroundColor: '#3C3C3C',
    minHeight: 78,
    borderRadius: 8,
    paddingHorizontal: 11,
  },
  companyXinxiLocaView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  locationIcon: {
    width: 11,
    height: 13
  },
  companyXinxiCompany: {
    flexDirection: 'row',
    color: '#DDDDDD',
    fontSize: 13,
    marginLeft: 14
  },
  companyXinxiLocaViewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  companyXinxiViewTitleView: {
    flexDirection: 'row',
    minHeight: 15,
    alignItems: 'center',
  },
  companyXinxiViewTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 15,
  },
  companyXinxiViewCompany: {
    marginTop: 16,
    color: '#fff',
    fontSize: 12
  },
  nextBtn: {
    width: 28,
    height: 13,
    alignItems: 'center'
  },
  nextIcon: {
    width: 8,
    height: 13,
  },
  jobInfoTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  jobInfoTagView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  jobInfoTagItem: {
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    paddingHorizontal: 9,
    lineHeight: 18,
    color: '#888888',
    fontSize: 11,
    marginRight: 9,
    marginTop: 8
  },
  jobInfoDetail: {
    color: '#333333',
    fontSize: 14,
    marginTop: 22,
  },
  jobContent: {
    color: '#666666',
    marginTop: 20,
    fontSize: 13,
    lineHeight: 18,
  },
  addScoreBtn: {
    flexDirection: 'row',
    marginTop: 22,
  },
  addScoreText: {
    color: '#333333',
    fontSize: 14,
  },
  showAddScoreText: {
    color: '#57DE9E',
    fontSize: 13,
    fontWeight: 'bold'
  },
  companyInfo: {
    flexDirection: 'row',
    minHeight: 50,
    marginTop: 29,
    paddingHorizontal: 11,
    alignItems: 'center'
  },
  companyTitleView: {
    flex: 1,
    minHeight: 68,
    justifyContent: 'center',
  },
  companyTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SystemHelper.width - 130
  },
  companyIcon: {
    width: 68,
    height: 68,
    backgroundColor: greenColor,
    borderRadius: 4
  },
  companyName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400',
  },
  companySummary: {
    marginTop: 10,
    color: '#DEDEDE',
    fontSize: 13
  },
  jobRenzheng: {
    marginLeft: 10,
    width: 13,
    height: 15,
  },
  compayRulesView: {
    width: SystemHelper.width,
  },
  rulesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 11,
    marginTop: 27,
  },
  rulesInfoContainer: {
    width: SystemHelper.width - 50,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  rulesView: {
    flexDirection: 'row',
    marginRight: 20,
    alignItems: 'center',
  },
  rulesIcon: {
    width: 16,
    height: 12,
    marginRight: 7,
  },
  rulesDetail: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold'
  },
  jobFuliScrollview: {
    height: 41,
    marginTop: 15,
    marginLeft: 11,
    paddingRight: 20
  },
  fuliView: {
    minWidth: 101,
    paddingHorizontal: 12,
    height: 41,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#AAAAAA',
    borderRadius: 8,
    marginRight: 8,
    flexDirection: 'row'
  },
  fuliIcon: {
    width: 20,
    height: 17,
    marginRight: 8,
  },
  fuliDetail: {
    color: '#FFFFFF',
    fontSize: 13
  },
  companyPhotoView: {
    marginTop: 39,
  },
  companyPhotoText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '400',
    paddingHorizontal: 11,
  },
  companyPhotoScrollview: {
    marginTop: 28,
    marginLeft: 11,
    paddingRight: 20
  },
  companyPhotoItem: {
    width: 270,
    height: 150,
    borderRadius: 8,
    backgroundColor: greenColor,
    marginRight: 13
  },
  reviewerScrollview: {
    marginTop: 23,
    marginLeft: 11,
    paddingRight: 20
  },
  reviewerItem: {
    marginRight: 24,
    alignItems: 'center',
    maxWidth: 83,
  },
  reviewerIcon: {
    width: 55,
    height: 55,
    backgroundColor: greenColor,
    borderRadius: 27.5
  },
  reviewerName: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  reviewerJob: {
    marginTop: 9,
    fontSize: 12,
    color: '#EDEDED',
    maxWidth: 83,
  },
  interviewView: {
    marginTop: 26,
    paddingHorizontal: 11,
  },
  reviewerContainer: {
    flexDirection: 'row'
  },
  scoreView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 10,
    marginTop: 18,
  },
  scoreText: {
    color: '#FC384B',
    fontSize: 30,
    fontWeight: 'bold',
  },
  scoreUnit: {
    marginBottom: 4,
    color: '#DDDDDD',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  starView: {
    flexDirection: 'row'
  },
  starItem: {
    width: 10,
    height: 10,
    marginRight: 5
  },
  reviewerContainerLeft: {
    alignItems: 'center',
  },
  line: {
    width: 1,
    height: 45,
    backgroundColor: '#dddddd',
    marginHorizontal: 17,
    alignSelf: 'center'
  },
  reviewerContainerRight: {
    flex: 1,
    justifyContent: 'space-between'
  },
  reviewerContainerRightItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreTitle: {
    color: '#DDDDDD',
    fontSize: 13,
    fontWeight: 'bold',
    minWidth: 65,
  },
  linearView: {
    height: 6,
    backgroundColor: '#DDDDDD',
    borderRadius: 3,
    overflow: 'hidden',
    flex: 1,
  },
  linearItem: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden'
  },
  commentList: {
    flex: 1
  },
  noMoreText: {
    marginTop: 19,
    alignSelf: 'center',
    fontSize: 10,
    color: '#AAAAAA',
    width: SystemHelper.width,
    textAlign: 'center'
  },
  showMoreBtn: {
    width: SystemHelper.width,
    alignItems: 'center',
    marginTop: 19,
  },
  showMoreText: {
    color: '#57DE9E',
    fontSize: 14,
    fontWeight: 'bold'
  },
  askQuestionBtn: {
    width: 91,
    alignSelf: 'center',
    height: 28,
    borderWidth: 1,
    borderColor: '#57DE9E',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },
  askQuestionText: {
    fontSize: 12,
    color: '#57DE9E'
  },
  onlineView: {
    marginHorizontal: 22,
    height: 40,
    marginVertical: 10,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  onlineViewBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  onlineText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  bottomView: {
    paddingTop: 14,
    paddingBottom: SystemHelper.safeBottom + 50,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  closeBtn: {
    width: 76,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  closeIcon: {
    width: 40,
    height: 40
  },
  bottomViewWorkTime: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 17,
    marginHorizontal: 22,
  },
  bottomViewTimeView: {
    flexDirection: 'row',
    marginTop: 24,
    marginLeft: 22,
    height: 16,
    alignItems: 'center',
  },
  bottomViewTimeIcon: {
    width: 16,
    height: 16,
    marginRight: 12
  },
  bottomViewTimeText: {
    color: '#888888',
    fontSize: 15
  },
  bottomViewFuliView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 13,
    marginTop: 14,
    width: SystemHelper.width - 42,
  },
  bottomViewFuliItem: {
    width: (SystemHelper.width - 66) / 3,
    flexDirection: 'row',
    height: 40,
    marginBottom: 10,
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomViewFuliIcon: {
    width: 20,
    height: 18
  },
  bottomViewFuliText: {
    color: '#666666',
    fontSize: 13,
    marginLeft: 7
  },
  bottomViewDetail: {
    color: '#888888',
    fontSize: 11,
    marginTop: 84,
    marginHorizontal: 12,
  }
})
