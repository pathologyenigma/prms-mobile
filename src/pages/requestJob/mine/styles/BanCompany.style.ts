import { StyleSheet } from 'react-native'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
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
    height: 88,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 11
  },
  linear: {
    width: 160,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24
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
    fontSize: 12,
    marginTop: 5
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
  }
})
