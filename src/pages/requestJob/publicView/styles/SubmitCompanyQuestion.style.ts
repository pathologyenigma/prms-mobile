import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    width: SystemHelper.width,
    height: SystemHelper.safeBottom + 54,
    marginHorizontal: 22,
    paddingTop: 7
  },
  btnContainer: {
    width: SystemHelper.width - 44,
    height: 40,
  },
  askText: {
    fontSize: 13
  },
  listView: {
    flex: 1,
  },
  contentView: {
    flex: 1,
  },
  headerInfo: {
    marginTop: 10,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 21,
  },
  headerInfoIcon: {
    width: 27,
    height: 27,
    backgroundColor: greenColor,
    borderRadius: 4
  },
  headerInfoView: {
    marginLeft: 9
  },
  headerInfoName: {
    color: '#333333',
    fontSize: 13,
    fontWeight: 'bold',
  },
  headerInfoTime: {
    marginTop: 5,
    color: '#888888',
    fontSize: 10,
  },
  question: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    paddingHorizontal: 21,
  },
  detail: {
    color: '#666666',
    fontSize: 13,
    marginTop: 5,
    paddingHorizontal: 21,
  },
  line: {
    backgroundColor: '#F8F8F8',
    marginTop: 15,
    height: 5,
  },
  listTitle: {
    marginTop: 15,
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 17,
    paddingHorizontal: 21,
  },
  dianzanIcon: {
    width: 13,
    height: 12,
  },
  cellStyle: {
    marginHorizontal: 21,
    flexDirection: 'row',
    marginTop: 23,
    paddingBottom: 17,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
  },
  cellInfo: {
    marginLeft: 12,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cellName: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    width: SystemHelper.width - 94
  },
  cellAnswer: {
    color: '#666666',
    marginTop: 6,
    fontSize: 13,
    width: SystemHelper.width - 94
  },
  cellDianzan: {
    flexDirection: 'row',
    marginTop: 9,
    alignItems: 'center'
  },
  cellDianzanText: {
    marginLeft: 5,
    color: '#AAAAAA',
    fontSize: 10,
  }
})
