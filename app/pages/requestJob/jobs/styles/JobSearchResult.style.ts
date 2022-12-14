import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listView: {
    flex: 1,
    marginBottom: HOME_BAR_HEIGHT
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
    borderBottomWidth: 1
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
    color: greenColor,
    fontWeight: 'bold'
  },
  navBar: {
    paddingTop: SystemHelper.safeTop + 8,
    height: SystemHelper.safeTop + 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    backgroundColor: '#FFF',
  },
  conditionRightView: {
    flexDirection: 'row',
  },
  conditionRightBtn: {
    flexDirection: 'row',
    width: 44,
    height: 17,
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 2,
  },
  conditionRightText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 17,
    marginLeft: 7,
  },
  rightBottomImg: {
    width: 3,
    height: 3,
    position: 'absolute',
    right: 3,
    bottom: 3
  },
  locationBtn: {
    flexDirection: 'row',
    height: 33,
    alignItems: 'center',
    marginLeft: 11,
  },
  locationIcon: {
    width: 10,
    height: 13,
  },
  locationText: {
    color: '#666666',
    fontSize: 15,
    marginLeft: 5,
    marginRight: 2
  },
  cancelBtn: {
    marginRight: 11,
    height: 33,
    justifyContent: 'center',
  },
  cancelText: {
    color: '#666666',
    fontSize: 15
  },
  searchHeader: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: SystemHelper.width - 42,
  },
  searchHeaderTitle: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 14
  },
  deleteHistory: {
    width: 30,
    height: 30,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  deleteHistoryIcon: {
    width: 16,
    height: 17
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
