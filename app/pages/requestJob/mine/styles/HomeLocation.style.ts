import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  saveBtn: {
    color: greenColor,
    fontSize: 15
  },
  inputView: {
    marginHorizontal: 11,
    width: SystemHelper.width - 22,
    marginTop: 52,
    paddingBottom: 13,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 1
  },
  contentInput: {
    width: '100%',
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 0,
  },
  locationView: {
    marginHorizontal: 11,
    backgroundColor: '#fff',
    height: 69,
    marginTop: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 3 },
  },
  locationItem: {
    width: (SystemHelper.width - 22) / 2,
    height: 69,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  currentIcon: {
    width: 15,
    height: 18,
    marginRight: 16
  },
  locationText: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  mapIcon: {
    width: 18,
    height: 18,
    marginRight: 16
  },
  line: {
    width: 1,
    height: 25,
    backgroundColor: '#E3E3E3',
  },
})
