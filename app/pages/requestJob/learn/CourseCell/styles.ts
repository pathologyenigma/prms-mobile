import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  cell: {
    marginTop: 20,
    minHeight: 88,
    backgroundColor: '#FFF',
    borderRadius: 8,
    flexDirection: 'row',
  },
  rankIcon: {
    // width: 27,
    // height: 31,
    marginRight: 9,
    borderRadius: 4,
  },
  watchedView: {
    marginLeft: 13,
    width: 123,
    height: 68,
    borderRadius: 8,
    overflow: 'hidden' 
  },
  watchedImage: {
  	width: '100%',
  	height: '100%'
  },
  watchedTextContainer: {
  	left: null,
  	top: null,
  	bottom: 0,
  	backgroundColor: 'rgba(0,0,0,0.66)',
    borderTopLeftRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  watchedText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  detailView: {
    flex: 1,
  },
  titleView: {
  	
  },
  titleTagView: {
  	right: null,
  	bottom: null,
  	top: 2.5,
    backgroundColor: '#333',
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
  titleTag: {
    color: '#fff',
    fontSize: 9,
  },
  titleDetail: {
  	fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: '#333333',
  },
  platform: {
  	marginTop: 7,
    color: '#666666',
    fontSize: 11
  },
  priceView: {
  	marginTop: 7,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  priceText: {
    color: '#FF5D00',
    fontSize: 18,
    fontWeight: 'bold'
  },
  priceTextRight: {
  	color: '#FF8B05',
  	fontWeight: 'normal',
  	fontSize: 15,
  },
  gradientButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  gradientText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
})
