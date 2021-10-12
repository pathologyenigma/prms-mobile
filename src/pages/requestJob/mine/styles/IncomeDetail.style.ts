import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  contentView: {
    flex: 1,
  },
  bar: {
    paddingTop: SystemHelper.safeTop,
    height: SystemHelper.safeTop + 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    backgroundColor: '#FFF',
  },
  left: {
    minWidth: 60,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 16,
  },
  riliBtn: {
    minWidth: 60,
    height: 22,
    paddingRight: 11,
    alignItems: 'flex-end'
  },
  riliBtnIcon: {
    width: 22,
    height: 22,
  },
  backIcon: {
    width: 8,
    height: 14,
  },
  tabsView: {
    flexDirection: 'row',
    height: 45,
    marginTop: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 11,
    alignItems: 'center',
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
  },
  tabLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsBtn: {
    height: 43,
    marginRight: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsTitle: {
    fontSize: 16,
    color: '#666',
  },
  linearView: {
    width: 24,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    bottom: 0,
  },
  selectedTitle: {
    color: greenColor,
    fontWeight: 'bold'
  },
  incomeMonthHeader: {
    width: '100%',
    height: 60,
    paddingLeft: 11,
    justifyContent: 'center',
  },
  incomeMonthHeaderText: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '400',
  },
  incomeCell: {
    backgroundColor: '#fff',
    width: '100%',
    height: 60,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 11,
    flexDirection: 'row',
    alignItems: 'center'
  },
  hongbaoIcon: {
    width: 37,
    height: 37,
  },
  cellValue: {
    marginLeft: 19,
    flex: 1
  },
  cellName: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '400'
  },
  cellDate: {
    color: '#888888',
    fontSize: 11,
    marginTop: 3
  },
  cellMoney: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold'
  },
  withdrawCell: {
    height: 124,
    backgroundColor: '#fff',
  },
  withdrawCellHeader: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC'
  },
  withdrawCellTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '400'
  },
  withdrawCellMoney: {
    color: '#6BE0A6',
    fontSize: 15,
    fontWeight: '400'
  },
  withdrawHeader: {
    height: 58,
    lineHeight: 58,
    fontSize: 15,
    color: '#666666',
    fontWeight: '400',
    marginHorizontal: 11,
  },
  withdrawCellItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 11,
    marginTop: 13,
    alignItems: 'center'
  },
  withdrawCellIcon: {
    width: 15,
    height: 15
  },
  withdrawCellDate: {
    color: '#666666',
    marginLeft: 15,
    fontSize: 13,
    flex: 1,
  },
  withdrawCellDateValue: {
    color: '#666666',
    marginLeft: 15,
    fontSize: 13,
  }
})
