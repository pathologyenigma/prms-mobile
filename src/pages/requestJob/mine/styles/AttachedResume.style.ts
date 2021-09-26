import { StyleSheet } from 'react-native'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listView: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 11,
  },
  cellStyle: {
    marginTop: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#E1E1E1',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  fileType: {
    height: 24,
    width: 31,
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
  cellName: {
    color: '#333333',
    fontSize: 13,
    fontWeight: '400'
  },
  fileInfo: {
    color: '#888888',
    marginTop: 5,
    fontSize: 11
  },
  editBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chakanIcon: {
    width: 20,
    height: 4,
    marginRight: 3
  },
  cellHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 25,
    marginTop: 10,
  },
  cellHeaderTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  jianliText: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  jianliAmount: {
    color: '#7FDDA1'
  },
  footerView: {
    marginTop: 25,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 41,
    marginHorizontal: 11,
    borderColor: '#7FDDA1',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 4
  },
  uploadIcon: {
    width: 18,
    height: 18,
  },
  uploadText: {
    color: '#7FDDA1',
    marginLeft: 9,
    fontSize: 13,
    fontWeight: 'bold'
  },
  useVipText: {
    marginTop: 29,
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 17,
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
  uploadVipIcon: {
    width: 40,
    height: 40
  },
  nextIcon: {
    width: 7,
    height: 12
  },
  vipTitle: {
    color: '#DDAB91',
    fontSize: 15,
    fontWeight: 'bold'
  },
  vipDetail: {
    color: '#888888',
    fontSize: 12,
    marginTop: 5,
  },
  bottomView: {
    // paddingTop: 14,
    paddingBottom: SystemHelper.safeBottom + 40,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  editNameBtn: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#E1E1E1',
    borderBottomWidth: 1
  },
  editNameText: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '400'
  },
  deleteBtn: {
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#F7F7F7',
    borderBottomWidth: 5
  },
  deleteText: {
    color: '#F25C5C',
    fontSize: 15,
    fontWeight: '400'
  },
  cancelBtn: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
