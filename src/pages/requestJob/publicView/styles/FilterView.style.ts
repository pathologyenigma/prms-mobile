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
    paddingHorizontal: 21,
  },
  contentView: {
    flex: 1,
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
  jobSalaryBtn: {
    height: 34,
    width: (SystemHelper.width - 69) / 3,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 9,
    marginTop: 15
  },
  jobSalaryText: {
    color: '#666666'
  },
  footerView: {
    flexDirection: 'row',
    height: SystemHelper.safeBottom + 51,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 21,
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
