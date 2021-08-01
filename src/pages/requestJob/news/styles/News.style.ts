import { StyleSheet } from 'react-native'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  tabsView: {
    paddingTop: SystemHelper.safeTop + 24,
    height: SystemHelper.safeTop + 61,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 11,
  },
  tabLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  tabsBtn: {
    marginRight: 24,
    alignItems: 'center',
  },
  tabsTitle: {
    fontSize: 16,
    color: '#666',
  },
  selectedTitle: {
    color: '#333',
    fontWeight: 'bold'
  },
  tabsLine: {
    height: 6,
    borderRadius: 3,
    width: 24,
    marginTop: 4
  },
  searchBtn: {

  },
  tongzhiImage: {
    width: 22,
    height: 27
  },
  tongzhiDot: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 9,
    width: 9
  }
})
