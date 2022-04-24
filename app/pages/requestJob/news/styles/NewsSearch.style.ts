import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listView: {
    flex: 1
  },
  setTop: {
    height: 80,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5A9BFB',
  },
  hideBtnText: {
    color: '#FFFEFE',
    fontSize: 14
  },
  contentView: {
    flex: 1,
  },
  navBar: {
    paddingLeft: 11,
    paddingTop: SystemHelper.safeTop + 8,
    height: SystemHelper.safeTop + 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    backgroundColor: '#FFF',
  },
  cancelBtn: {
    marginRight: 11,
    height: 33,
    justifyContent: 'center',
  },
  cancelText: {
    color: '#666666',
    fontSize: 15
  },
  cellItem: {
    height: 35,
    // width: (SystemHelper.width - 64) / 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 11,
    marginTop: 14,
    flexDirection: 'row',
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    paddingHorizontal: 11,
    paddingBottom: 18,
  },
  clearAllBtn: {
    marginTop: 29,
    alignSelf: 'center'
  },
  clearAllText: {
    color: '#7DDBA3',
    fontSize: 14,
    fontWeight: '400'
  },
  searchIcon: {
    width: 15,
    height: 15,
  },
  tagBtn: {
    height: 35,
    // width: (SystemHelper.width - 64) / 3,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 11,
    marginTop: 14,
    paddingHorizontal: 15
  },
  rank: {
    color: '#ED682C',
    fontSize: 14,
  },
  tagText: {
    color: '#888888',
    fontSize: 14,
    flex: 1,
    marginLeft: 20,
  },
  searchHeader: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: SystemHelper.width - 42,
    marginLeft: 11,
  },
  hotSearchHeader: {
    height: 40,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: SystemHelper.width - 42,
  },
  hotIcon: {
    marginLeft: 9,
    width: 27,
    height: 12
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
