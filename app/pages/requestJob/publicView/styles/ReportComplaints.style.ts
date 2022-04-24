import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 12,
  },
  listView: {

  },
  cell: {
    minHeight: 63,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 11,
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '400',
    width: SystemHelper.width - 40,
  },
  description: {
    marginTop: 7,
    fontSize: 10,
    color: '#666666',
    width: SystemHelper.width - 40,
  },
  nextIcon: {
    width: 7,
    height: 13,
  }
})
