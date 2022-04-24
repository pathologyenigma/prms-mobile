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
  iconView: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 11
  },
  iconText: {
    fontSize: 15,
    color: '#333333',
  },
  iconStyle: {
    width: 65,
    height: 65
  },
  cell: {
    minHeight: 80,
    paddingHorizontal: 11,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  cellText: {
    fontSize: 13,
    color: '#666',
  },
  valueView: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cellDetail: {
    color: '#333333',
    fontSize: 15,
  },
  nextIcon: {
    width: 7,
    height: 13,
  },
  genderView: {
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 11,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 1,
  },
  genderText: {
    color: '#666666',
    fontSize: 13
  },
  genderDetail: {
    flexDirection: 'row'
  },
  genderDetailBtn: {
    width: 56,
    height: 27,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#BEBEBE',
    borderWidth: 1,
    marginLeft: 15
  },
  genderDetailText: {
    color: '#333333',
    fontSize: 13
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
  }
})
