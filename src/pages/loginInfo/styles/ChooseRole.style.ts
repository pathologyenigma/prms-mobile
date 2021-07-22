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
    marginTop: 40,
    height: 80,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CFFFEA',
    paddingLeft: 20
  },
  typeLogo: {
    width: 20,
    height: 20
  },
  requestJobTitle: {
    marginLeft: 20,
    color: greenColor,
    fontSize: 16
  },
  grayCellView: {
    marginTop: 40,
    height: 80,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    paddingLeft: 20
  },
  requestPersonTitle: {
    marginLeft: 20,
    color: '#919191',
    fontSize: 16
  },
})
