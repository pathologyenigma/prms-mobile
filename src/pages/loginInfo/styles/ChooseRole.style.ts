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
    paddingHorizontal: 20,
  },
  chooseTitle: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    paddingBottom: 8,
  },
  cellView: {
    marginTop: 56,
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
    width: 36,
    height: 36
  },
  requestJobTitle: {
    marginLeft: 22,
    color: greenColor,
    fontSize: 15,
    fontWeight: '400'
  },
  grayCellView: {
    marginTop: 56,
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
