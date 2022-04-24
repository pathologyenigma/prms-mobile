import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  scrollview: {
    flex: 1,
  },
  tabsView: {
    flexDirection: 'row',
    height: 38,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  tabLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  tabsBtn: {
    paddingRight: 30,
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
  searchImage: {
    // width: 20,
    // height: 20
  }
})
