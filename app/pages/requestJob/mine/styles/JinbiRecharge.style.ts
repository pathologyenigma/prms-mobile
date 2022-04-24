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
    height: SystemHelper.safeTop + 195,
    width: SystemHelper.width,
  },
  tagView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SystemHelper.width,
  },
  tagBtn: {
    borderColor: '#CCCCCC',
    borderRadius: 8,
    marginTop: 10,
    height: 60,
    backgroundColor: '#eee',
    width: (SystemHelper.width - 44) / 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 11,
  },
  tagAmount: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  tagMoney: {
    color: '#ED672C',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 3
  },
  tagCustomText: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  selectJinboTag: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 27,
    height: 15
  },
  cellItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 44,
    paddingHorizontal: 11,
    marginTop: 14,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  payTypeText: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 4,
    marginHorizontal: 11,
  },
  leftArrow: {
    width: 44,
    height: 44,
  },
  otherTitle: {
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 14,
    marginLeft: 17
  },
  yueTitle: {
    color: '#666666',
    fontSize: 10,
    marginLeft: 17
  },
  rightArrow: {
    width: 20,
    height: 20,
  },
  bar: {
    paddingTop: SystemHelper.safeTop,
    height: SystemHelper.safeTop + 44,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    borderBottomColor: '#ececec',
    justifyContent: 'space-between'
  },
  backBtn: {
    minWidth: 16 + 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 16,
  },
  backIcon: {
    width: 12,
    height: 23
  },
  barTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400'
  },
  qiandaoBtn: {
    width: 52,
    height: 22,
    marginTop: 10,
    marginRight: 11,
    alignSelf: 'flex-end'
  },
  qiandaoBtnIcon: {
    width: 52,
    height: 22
  },
  jinbiValue: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
    lineHeight: 40,
  },
  jinbiTitle: {
    marginTop: 10,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  customInputView: {
    flexDirection: 'row',
    height: 42,
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    marginHorizontal: 11,
  },
  customTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  customInput: {
    flex: 1,
    padding: 0,
    height: 30,
    marginLeft: 10,
  },
  bindAlipay: {
    color: '#333333',
    fontSize: 13
  },
  customAllText: {
    color: '#FA8E4F',
    fontSize: 15,
    fontWeight: 'bold'
  },
  tipsBg: {
    marginTop: 17,
    width: SystemHelper.width - 22,
    height: 189,
    marginLeft: 11,
    borderRadius: 5,
  },
  tipsTitleView: {
    marginTop: 20,
    marginLeft: 11,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipsIcon: {
    width: 15,
    height: 15,
    marginRight: 8,
  },
  tipsText: {
    color: '#666666',
    fontSize: 15,
    fontWeight: 'bold'
  },
  tipsItem: {
    color: '#888888',
    fontSize: 12,
    marginLeft: 33
  },

  footerView: {
    flexDirection: 'row',
    height: SystemHelper.safeBottom + 51,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 11,
    borderTopColor: '#ECECEC',
    borderTopWidth: 1,
  },
  moneyTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  moneyTitleValue: {
    marginLeft: 13,
    color: '#888888',
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1
  },
  confirmBtn: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    width: 110,
  },
  linearStyle: {
    flex: 1,
    width: SystemHelper.width * 0.72 - 51,
  },
  detailQuyuView: {
    backgroundColor: '#F8F8F8',
    width: SystemHelper.width * 0.36,
    paddingTop: 25,
  },
  detailZhenView: {
    backgroundColor: '#F0F0F0',
    width: SystemHelper.width * 0.365,
    paddingTop: 25,
  },
})
