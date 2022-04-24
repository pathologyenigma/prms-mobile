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
  jinbiIcon: {
    width: 18,
    height: 18,
    marginLeft: 8
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
  }
})
