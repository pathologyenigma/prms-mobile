import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  saveBtn: {
    color: greenColor,
    fontSize: 15
  },
  contentView: {
    flex: 1,
  },
  detailView: {
    flex: 1,
    width: SystemHelper.width,
    backgroundColor: '#fff',
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  detailSecondView: {
    backgroundColor: '#fff',
    width: SystemHelper.width * 0.5,
    paddingTop: 25,
  },
  detailSecondBtn: {
    marginBottom: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#EEEEEE'
  },
  detailSecondText: {
    color: '#666666'
  },
  detailThirdView: {
    backgroundColor: '#EEEEEE',
    width: SystemHelper.width * 0.5,
    paddingTop: 25,
  },
  detailThirdBtn: {
    marginLeft: 20,
    marginBottom: 45,
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#EEEEEE',
    flexDirection: 'row'
  },
  selectTag: {
    width: 15,
    height: 11,
    marginLeft: 11
  },
})
