import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listView: {
    flex: 1
  },
  contentView: {
    flex: 1,
  },
  tabsView: {
    flexDirection: 'row',
    height: 45,
    marginTop: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 11,
    alignItems: 'center',
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
  },
  tabLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  tabsBtn: {
    height: 43,
    marginRight: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsTitle: {
    fontSize: 16,
    color: '#666',
  },
  linearView: {
    width: 24,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    bottom: 0,
  },
  selectedTitle: {
    color: greenColor,
    fontWeight: 'bold'
  },
  moreJobsBtn: {
    marginTop: 1,
    height: 41,
    flex: 1,
    marginHorizontal: 21,
    borderWidth: 1,
    borderColor: '#57DE9E',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  moreJobsText: {
    color: '#57DE9E',
    fontWeight: 'bold',
    fontSize: 15,
  },
  moreJobsImage: {
    marginLeft: 9,
    width: 8,
    height: 13
  }
})
