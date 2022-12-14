import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  saveBtn: {
    color: greenColor,
    fontSize: 15
  },
  contentView: {
    flex: 1,
  },
  detailView: {
    flex: 1,
    width: SystemHelper.width,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  detailSecondView: {
    backgroundColor: '#FFF',
    width: '35%'
  },
  detailSecondBtn: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#FFF',
  },
  detailSecondText: {
    color: '#666666',
    fontSize: 15,
  },
  detailThirdView: {
    backgroundColor: '#F8F8F8',
    width: '65%'
  },
  detailThirdBtn: {
    paddingLeft: 20,
    // marginBottom: 45,
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#F8F8F8',
    flexDirection: 'row',
    paddingVertical: 20,
  },
  selectTag: {
    width: 15,
    height: 11,
    marginRight: 24
  },
  selectedText: {
    color: '#888888',
    fontSize: 12,
    marginTop: 10,
    marginHorizontal: 21,
  },
  selectIndustryView: {
    height: 21,
    marginHorizontal: 21,
    marginTop: 4
  },
  selectIndustryBtn: {
    backgroundColor: '#E2FFF0',
    height: 21,
    paddingHorizontal: 9,
    flexDirection: 'row',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  selectIndustryText: {
    color: '#54D693',
    fontSize: 12,
    fontWeight: 'bold'
  },
  deleteImage: {
    marginLeft: 6,
    height: 9,
    width: 9
  },
  footerView: {
    flexDirection: 'row',
    height: HOME_BAR_HEIGHT + 65,
    paddingTop: 10,
    paddingBottom: HOME_BAR_HEIGHT + 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 21,
  },
  resetBtn: {
    width: SystemHelper.width * 0.28,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
  },
  resetText: {
    color: '#666',
    fontSize: 13,
  },
  confirmBtn: {
    marginLeft: 9,
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 4
  },
  linearStyle: {
    flex: 1,
    width: SystemHelper.width * 0.72 - 51,
  },
  detailQuyuView: {
    backgroundColor: '#F8F8F8',
    width: SystemHelper.width * 0.36,
  },
  detailZhenView: {
    backgroundColor: '#F0F0F0',
    width: SystemHelper.width * 0.365,
  },
})
