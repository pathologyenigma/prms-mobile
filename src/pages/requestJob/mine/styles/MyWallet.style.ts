import { StyleSheet } from 'react-native'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  recordBtn: {
    color: '#666666',
    fontSize: 15,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 25,
    marginHorizontal: 11,
    justifyContent: 'space-between'
  },
  itemBg: {
    width: (SystemHelper.width - 35) / 2,
    height: (SystemHelper.width - 35) / 2 * 18 / 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    color: '#fff',
    fontSize: 15
  },
  itemValue: {
    color: '#fff',
    fontSize: 40,
    marginTop: 5,
    fontWeight: 'bold'
  },
  itemBtn: {
    width: 83,
    height: 35,
    marginTop: 7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 17
  },
  itemBtnBg: {
    width: 83,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tixianBtn: {
    width: 15,
    height: 15
  },
  itemBtnText: {
    color: '#FFFFFF',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 14
  },
  qiandaoView: {
    position: 'absolute',
    width: 63,
    height: 15,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: 'rgba(255,74,26,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    right: 5,
    top: 48,
  },
  qiandaoTips: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  jinbiValue: {
    color: '#fff',
    fontSize: 40,
    marginTop: -5,
    fontWeight: 'bold'
  }
})
