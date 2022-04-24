import { StyleSheet } from 'react-native'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollview: {

  },
  contentContainerStyle: {
    alignItems: 'center',
    paddingBottom: 20 + SystemHelper.safeBottom,
  },
  name: {
    height: 80,
    paddingHorizontal: 11,
    flexDirection: 'row',
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 1,
    alignItems: 'center'
  },
  nameText: {
    flex: 1,
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  nameDetail: {
    color: '#888888',
    fontSize: 13,
  },
  nextIcon: {
    width: 8,
    height: 13,
    marginLeft: 18,
  },
  companyConatinerView: {
    height: 80,
    paddingHorizontal: 11,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  companyView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  companyDetail: {
    color: '#888888',
    marginTop: 6,
    width: SystemHelper.width - 22,
  }
})
