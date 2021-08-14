import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  cell: {
    marginTop: 13,
    minHeight: 88,
    backgroundColor: '#FFF',
    borderRadius: 8,
    flexDirection: 'row',
  },
  rankIcon: {
    width: 27,
    height: 31,
    marginRight: 9,
    borderRadius: 4,
  },
  watchedView: {
    width: 123,
    minHeight: 68,
    borderRadius: 8,
    backgroundColor: greenColor,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginLeft: 13,
    overflow: 'hidden'
  },
  watchedText: {
    backgroundColor: 'rgba(0,0,0,0.66)',
    lineHeight: 17,
    borderTopLeftRadius: 8,
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
    paddingHorizontal: 7,
  },
  detailView: {
    flex: 1,
  },
  titleView: {
    flexDirection: 'row',
    lineHeight: 17,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTagView: {
    alignItems: 'center',
    backgroundColor: '#333',
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    overflow: 'hidden',
  },
  titleTag: {
    color: '#fff',
    fontSize: 9,
    paddingHorizontal: 3,
    height: 13,
    lineHeight: 13,
  },
  titleDetail: {
    fontSize: 14,
    lineHeight: 17,
    color: '#333333',
    backgroundColor: '#fff',
  },
  platform: {
    color: '#666666',
    fontSize: 11
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  priceText: {
    color: '#FF5D00',
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '400'
  },
  gradientButton: {
    width: 90,
    height: 20,
    borderRadius: 4,
  },
  gradientText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 21,
  },
})
