import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  saveBtn: {
    color: '#333333',
    fontSize: 15
  },
  titleView: {
    marginTop: 10,
    paddingHorizontal: 11,
  },
  title: {
    fontSize: 20,
    color: '#333333',
    fontWeight: '400'
  },
  description: {
    marginTop: 5,
    fontSize: 13,
    color: '#666666',
  },
  detailInput: {
    width: '100%',
    color: '#333333',
    fontSize: 13,
    textAlignVertical: 'top',
    paddingHorizontal: 12
  },
  detailView: {
    marginTop: 37,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  cell: {
    minHeight: 80,
    paddingHorizontal: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    justifyContent: 'center',
  },
  cellTitle: {
    color: '#666666',
    fontSize: 15,
  },
  cellInput: {
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 0,
    marginTop: 10,
  },
  durationView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  beginTime: {
    color: '#CCCCCC',
    fontSize: 15,
    fontWeight: 'bold',
  },
  timeTips: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  inputView: {
    borderRadius: 8,
    width: SystemHelper.width - 22,
    paddingHorizontal: 11,
    height: 145,
    justifyContent: 'space-between',
    backgroundColor: '#F4F4F4',
    marginTop: 10,
  },
  contentInput: {
    width: '100%',
    color: '#666666',
    fontSize: 12,
    textAlignVertical: 'top'
  },
  contentAmount: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 5
  },
  contentCell: {
    minHeight: 80,
    paddingHorizontal: 11,
    justifyContent: 'center',
    marginTop: 10,
  },
  footerView: {
    flexDirection: 'row',
    height: SystemHelper.safeBottom + 51,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 21,
  },
  resetBtn: {
    width: SystemHelper.width * 0.28,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 4
  },
  resetText: {
    color: '#666',
    fontSize: 13,
  },
  confirmBtn: {
    marginLeft: 9,
    flex: 1,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 4
  },
  linearStyle: {
    flex: 1,
    width: SystemHelper.width * 0.72 - 51,
  },
})
