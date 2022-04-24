import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollview: {
    flex: 1,
    paddingTop: 10,
  },
  saveBtn: {
    color: greenColor,
    fontSize: 15
  },
  cellView: {
    marginHorizontal: 11,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    paddingBottom: 9,
    marginTop: 24,
  },
  cellTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cellText: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  nextImage: {
    width: 7,
    height: 13
  },
  cellViewDetail: {
    color: '#666666',
    marginTop: 16
  },
  contextStyle: {
    width: SystemHelper.width,
    marginHorizontal: 0,
    borderRadius: 0,
  },
  modalContentView: {
    width: SystemHelper.width,
    height: SystemHelper.safeBottom + 245,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 22
  },
  jobNatureTitle: {
    color: '#333333',
    fontWeight: '400',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 5,
  },
  leftBtn: {
  	position: 'absolute',
    top: 2,
    left: 22,
    minWidth: 50,
    height: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  rightBtn: {
    position: 'absolute',
    top: 2,
    right: 22,
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
  jobNatureView: {
    flexDirection: 'row',
    marginTop: 46,
    width: SystemHelper.width - 44,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 35
  },
  jobSalaryView: {
  	flexDirection: 'row',
  	alignItems: 'center',
  	marginTop: 46,
    width: SystemHelper.width - 44,
    height: '100%',
  },
  picker: {
  	height: '100%',
  	flex: 1,
  },
  jobNatureBtn: {
    height: 35,
    width: (SystemHelper.width - 76) / 3,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  jobNatureText: {
    color: '#666666'
  }
})
