import { StyleSheet } from 'react-native'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollview: {
    paddingHorizontal: 11,
  },
  contentContainerStyle: {
    alignItems: 'center',
    paddingBottom: 20 + SystemHelper.safeBottom,
  },
  header: {
    marginTop: 50
  },
  headerText: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 1
  },
  headerGreen: {
    width: 131,
    height: 9,
    backgroundColor: '#7FDDA1',
    marginTop: -9
  },
  itemView: {
    marginTop: 35
  },
  itemDetail: {
    color: '#666666',
    fontSize: 13,
    textAlign: 'center'
  },
  itemImage: {
    marginTop: 14,
    width: 235,
  }
})
