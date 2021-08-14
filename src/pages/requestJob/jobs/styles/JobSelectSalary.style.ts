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
    paddingHorizontal: 22,
  },
  contentView: {
    flex: 1,
  },
  title: {
    marginLeft: 22,
    fontWeight: '400',
    fontSize: 15,
    marginTop: 20
  },
  jobSalaryBtn: {
    height: 35,
    width: (SystemHelper.width - 64) / 3,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 10,
    marginTop: 14
  },
  jobSalaryText: {
    color: '#666666'
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
