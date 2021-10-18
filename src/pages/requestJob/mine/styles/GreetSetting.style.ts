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
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 1,
    paddingHorizontal: 11,
    borderTopColor: '#f6f6f6',
    borderTopWidth: 5,
    paddingTop: 20,
    paddingBottom: 17,
  },
  cellTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  line: {
    marginBottom: 16,
    marginTop: 19,
    backgroundColor: '#ECECEC',
    height: 1,
    width: SystemHelper.width,
  },
  headerView: {
    paddingHorizontal: 11,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setDefaultText: {
    color: '#888888',
    fontSize: 13,
    fontWeight: 'bold',
  },
  feedbackIcon: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
  },
  nextImage: {
    marginRight: 13,
    width: 20,
    height: 20
  },
  editText: {
    color: '#57DE9E',
    fontSize: 13,
    fontWeight: 'bold'
  }
})
