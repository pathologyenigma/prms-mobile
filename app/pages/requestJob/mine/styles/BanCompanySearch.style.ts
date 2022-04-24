import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listView: {
    paddingHorizontal: 21,
    flex: 1,
  },
  contentView: {
    flex: 1,
  },
  navBar: {
    paddingTop: SystemHelper.safeTop + 8,
    height: SystemHelper.safeTop + 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    backgroundColor: '#FFF',
  },
  searchTipsView: {
    backgroundColor: '#E5E5E5',
    marginHorizontal: 11,
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 20,
    flexDirection: 'row',
    marginTop: 25,
  },
  searchTipsIcon: {
    width: 15,
    height: 15,
    marginTop: 3
  },
  tipsView: {
    marginLeft: 8,
  },
  wxts: {
    color: '#666666',
    fontSize: 13,
    fontWeight: 'bold',
    width: SystemHelper.width - 60,
  },
  tips1: {
    color: '#666666',
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 20,
    width: SystemHelper.width - 60,
  },
  tipsDetail: {
    color: '#888888',
    fontSize: 12,
    width: SystemHelper.width - 60,
  },
  cancelBtn: {
    marginRight: 11,
    marginLeft: 30,
    height: 33,
    justifyContent: 'center',
  },
  cancelText: {
    color: '#666666',
    fontSize: 15
  },
  tagBtn: {
    width: SystemHelper.width - 22,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 2,
    minHeight: 50
  },
  tagText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#666666',
    marginLeft: 17
  },
  searchHeader: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: SystemHelper.width - 42,
  },
  searchHeaderTitle: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 14
  },
  deleteHistory: {
    width: 30,
    height: 30,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  deleteHistoryIcon: {
    width: 16,
    height: 17
  },
  selectedIcon: {
    width: 23,
    height: 23
  },
  footerView: {
    height: SystemHelper.safeBottom + 110,
    borderTopColor: '#E1E1E1',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  checkAll: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 11,
  },
  checkAllIcon: {
    width: 17,
    height: 17,
  },
  resetText: {
    color: '#888888',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  confirmBtn: {
    marginLeft: 22,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginTop: 16,
    width: SystemHelper.width - 44,
  },
  linearStyle: {
    width: SystemHelper.width - 44,
  },
})
