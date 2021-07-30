import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  listView: {
    flex: 1,
    paddingHorizontal: 11,
  },
  contentStyle: {
  },
  tipsView: {
    width: SystemHelper.width,
    height: 79,
    backgroundColor: '#6CDEFD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  tipsText: {
    lineHeight: 23,
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 16,
    textAlign: 'center'
  },
  carousel: {
    width: SystemHelper.width - 22,
    height: 110,
  },
  dots: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginHorizontal: 3,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  activeDots: {
    width: 12,
    height: 5,
    borderRadius: 3,
    marginHorizontal: 3,
    overflow: 'hidden',
    backgroundColor: '#5AE5A8',
  },
  pageController: {
    width: SystemHelper.width - 22,
    alignItems: 'center',
    position: 'absolute',
  },
  adBtn: {
    width: '100%',
    height: '100%',
    backgroundColor: greenColor,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adText: {
    color: '#fff',
    alignSelf: 'center'
  },
})
