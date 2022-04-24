import { StyleSheet } from 'react-native'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listView: {
    flex: 1,
    paddingHorizontal: 11,
  },
  emptyView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyIcon: {
    width: 203,
    height: 90,
    marginTop: (SystemHelper.height - SystemHelper.safeTop - SystemHelper.safeBottom - SystemHelper.safeTop) * 0.25
  },
  emptyText: {
    marginTop: 25,
    color: '#333333',
    fontSize: 15,
  },
  emptyDetail: {
    marginTop: 15,
    color: '#888888',
    fontSize: 13,
    marginHorizontal: 45,
    textAlign: 'center'
  },
  cellStyle: {
    marginTop: 13,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  cancelBanBtn: {
    width: 56,
    height: 25,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#7FDDA1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBanText: {
    color: '#7FDDA1',
    fontSize: 14,
    fontWeight: 'bold',
  },
  linear: {
    width: 160,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24
  },
  addBtn: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  cellIcon: {
    height: 44,
    width: 44,
  },
  cellInfo: {
    marginLeft: 10,
    flex: 1
  },
  cellCompany: {
    color: '#666666',
    fontSize: 15,
    fontWeight: 'bold'
  },
  statusView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cellName: {
    color: '#333333',
    fontSize: 13,
    fontWeight: 'bold'
  },
  dotIcon: {
    marginLeft: 18,
    width: 6,
    height: 6,
    backgroundColor: '#AAAAAA',
    borderRadius: 3,
    marginRight: 5
  },
  cellStatus: {
    color: '#AAAAAA',
    fontSize: 10,
    fontWeight: 'bold'
  },
  nextIcon: {
    width: 7,
    height: 12
  },
  headerView: {

    marginHorizontal: 11,
  },
  headerTitle: {
    marginTop: 10,
    color: '#333333',
    fontSize: 23,
    fontWeight: 'bold',
  },
  headerTips: {
    fontWeight: 'bold',
    color: '#888888',
    fontSize: 15,
    lineHeight: 18,
    marginTop: 16,
  },
  headerSearchView: {
    flexDirection: 'row',
    height: 33,
    marginTop: 25,
    borderRadius: 16,
    backgroundColor: '#eee',
    alignItems: 'center',
    marginHorizontal: 9,
    paddingHorizontal: 17,
  },
  searchIcon: {
    width: 15,
    height: 15,
  },
  headerSearchText: {
    marginLeft: 13,
    color: '#888888',
    fontSize: 13,
  },
  headerBanTips: {
    marginTop: 38,
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold'
  }
})
