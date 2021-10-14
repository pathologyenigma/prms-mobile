import { StyleSheet } from 'react-native'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listView: {
    flex: 1,
  },
  cellStyle: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 1,
    paddingHorizontal: 11,
  },
  cellTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '400',
  },
  headerView: {
    paddingHorizontal: 11,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackIcon: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '400',
    flex: 1,
    marginLeft: 17,
  },
  nextImage: {
    marginLeft: 16,
    width: 7,
    height: 12
  },
  listHeaderView: {
    height: 45,
    paddingHorizontal: 11,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  },
  xinxiIcon: {
    width: 18,
    height: 18,
  },
  listTitle: {
    marginLeft: 12,
    fontWeight: '400',
    color: '#333333',
    fontSize: 18,
  },
})
