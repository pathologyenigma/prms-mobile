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
    textAlign: 'center'
  },
  headerDetail: {
    color: '#666',
    marginTop: 32,
    fontSize: 13,
    textAlign: 'center'
  },
  searchBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#79D399',
    backgroundColor: '#F0FFF5',
    borderRadius: 3,
    width: 237,
    height: 52,
    alignItems: 'center',
    marginTop: 19,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderColor: '#79D399',
    borderRadius: 3,
    borderWidth: 1,
    width: 174,
    height: 41,
    marginLeft: 6
  },
  sousuo: {
    width: 25,
    height: 25,
    marginLeft: 17
  },
  qrcode: {
    width: 175,
    height: 175,
    marginTop: 23,
    alignSelf: 'center'
  },
  scanBtn: {
    backgroundColor: '#54D693',
    width: 237,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 46
  },
  scanText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold'
  }
})
