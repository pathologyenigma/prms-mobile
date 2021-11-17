import { StyleSheet } from 'react-native'
import { greenColor } from '../../../utils/constant'
import SystemHelper from '../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollview: {
    flex: 1,
    paddingHorizontal: 13,
  },
  chooseTitle: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    paddingBottom: 8,
  },
  roleView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  currentCellView: {
    width: (SystemHelper.width - 36) / 2,
    marginTop: 36,
    height: 90,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BDFFDD',
    paddingLeft: 20
  },
  typeLogo: {
    width: 37,
    height: 35
  },
  hrLogo: {
    width: 37,
    height: 38
  },
  currentTitle: {
    marginLeft: 22,
    color: greenColor,
    fontSize: 15,
    fontWeight: '400',
  },
  grayCellView: {
    width: (SystemHelper.width - 36) / 2,
    marginTop: 36,
    height: 90,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    paddingLeft: 20
  },
  requestPersonTitle: {
    marginLeft: 22,
    color: '#888888',
    fontSize: 15
  },
})
