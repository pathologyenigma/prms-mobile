import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  btnView: {
    flexDirection: 'row',
    height: 30,
    width: '100%',
    marginTop: -10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    lineHeight: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  list: {
    width: SystemHelper.width - 80,
  },
  leftText: {
    height: 20,
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    color: '#666666',
  },
  rightBtn: {
    minWidth: 50,
    height: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  rightText: {
    height: 20,
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    color: greenColor
  },
  modalContentView: {
    width: SystemHelper.width,
    height: SystemHelper.safeBottom + 245,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 22
  },
  contextStyle: {
    width: SystemHelper.width,
    marginHorizontal: 0,
    borderRadius: 0,
  },
  contentStyle: {
  	flexDirection: 'row',
  	alignItems: 'center',
  	// marginTop: 46,
    width: SystemHelper.width - 44,
    height: '100%',
  },
  picker: {
  	height: '100%',
  	flex: 1,
  },
})