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
    height: 35,
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
    alignItems: 'center'
  },
  selectedScrollview: {
    height: 50,
    marginLeft: 10,
  },
  selectedScrollviewContainer: {
    alignItems: 'center'
  },
  selectedTitle: {
    color: '#666'
  },
  selectedTagBtn: {
    backgroundColor: '#E7FBFB',
    borderRadius: 15,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  selectedTagText: {
    color: greenColor,
    fontSize: 16,
    lineHeight: 30,
  },
  closeTagBtn: {
    height: 30,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeTagText: {
    color: greenColor,
    fontSize: 16,
    lineHeight: 30,
  },
  optionalViewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  optionalView: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  optionalViewBtn: {
    height: 35,
    paddingHorizontal: 10,
    backgroundColor: '#F7F7F7',
    marginTop: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  optionalViewText: {
    color: '#666666'
  }
})
