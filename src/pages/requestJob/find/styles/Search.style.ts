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
  locationBtn: {
    flexDirection: 'row',
    height: 33,
    alignItems: 'center',
    marginLeft: 11,
  },
  locationIcon: {
    width: 10,
    height: 13,
  },
  locationText: {
    color: '#666666',
    fontSize: 15,
    marginLeft: 5,
    marginRight: 2
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
