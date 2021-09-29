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
    flex: 1
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
    fontSize: 15,
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
    height: 35,
    width: (SystemHelper.width - 64) / 3,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 6,
    marginTop: 14,
    paddingHorizontal: 2
  },
  tagText: {
    color: '#666666'
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
  }
})
