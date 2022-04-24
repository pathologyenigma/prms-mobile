import { StyleSheet } from 'react-native'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollview: {
    paddingHorizontal: 11
  },
  header: {
    marginTop: 10
  },
  headerText: {
    color: '#333333',
    fontSize: 18,
    fontWeight: '400',
  },
  headerDetail: {
    color: '#666',
    marginTop: 13,
    fontSize: 13
  },
  linear: {
    minHeight: 75,
    borderRadius: 6,
    overflow: 'hidden',
    borderColor: 'rgba(96,96,96,0.08)',
    borderWidth: 1,
    paddingLeft: 23,
    paddingRight: 17,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  cellInfo: {
    marginLeft: 10,
    flex: 1
  },
  uploadVipIcon: {
    width: 41,
    height: 41
  },
  nextIcon: {
    width: 7,
    height: 12
  },
  vipTitle: {
    color: '#333333',
    fontSize: 15,
  },
  vipDetail: {
    color: '#888888',
    fontSize: 12,
    marginTop: 5,
  },
  uploadView: {
    flexDirection: 'row',
    minHeight: 75,
    borderRadius: 6,
    overflow: 'hidden',
    borderColor: 'rgba(96,96,96,0.08)',
    borderWidth: 1,
    paddingLeft: 23,
    paddingRight: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  uploadTypeText: {
    color: '#333333',
    fontSize: 15,
    flex: 1,
    marginLeft: 16
  },
  selectTypeView: {

  },
  selectTypeTitle: {
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 30,
  },
  selectTypeDetail: {
    color: '#888888',
    fontSize: 15,
    marginTop: 15,
    marginHorizontal: 30,
    marginBottom: 28,
  },
  selectTypeBtn: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#E1E1E1',
    borderTopWidth: 1,
  },
  selectTypeBtnText: {
    color: '#7FDDA1',
    fontSize: 14,
    fontWeight: 'bold'
  },
  cancelText: {
    color: '#888888',
    fontSize: 14,
    fontWeight: 'bold'
  }
})
