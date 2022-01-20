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
  },
  confirmBtn: {
    color: '#333333',
    fontSize: 15
  },
  titleView: {
    marginTop: 10,
    paddingHorizontal: 11,
  },
  title: {
    fontSize: 20,
    color: '#333333',
    fontWeight: '400'
  },
  description: {
    marginTop: 5,
    fontSize: 13,
    color: '#666666',
  },
  tagsScrollview: {
    marginHorizontal: 11,
  },
  customBtn: {
    marginTop: 20,
    height: 40,
    width: 80,
    borderColor: greenColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  customText: {
    color: greenColor,
    fontSize: 13
  },
  selectedView: {
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    marginHorizontal: 11,
  },
  selectedScrollview: {
    height: 50,
  },
  selectedTitle: {
    color: '#666'
  },
})
