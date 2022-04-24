import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollview: {
    flex: 1,
  },
  topImage: {
    height: SystemHelper.safeTop + 271,
    width: SystemHelper.width,
  },
  tagView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SystemHelper.width,
  },
  bar: {
    paddingTop: SystemHelper.safeTop,
    height: SystemHelper.safeTop + 44,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    borderBottomColor: '#ececec',
    justifyContent: 'space-between'
  },
  backBtn: {
    minWidth: 16 + 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 16,
  },
  backIcon: {
    width: 12,
    height: 23
  },
  barTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400'
  },
  qiandaoBtnIcon: {
    width: 167,
    height: 147,
    alignSelf: 'center',
    marginTop: 15
  },
  signinDay: {
    color: '#FFFFFF',
    height: 30,
    marginTop: 8,
    borderRadius: 15,
    backgroundColor: '#5290F7',
    lineHeight: 30,
    fontSize: 15,
    width: 140,
    textAlign: 'center',
    alignSelf: 'center'
  },
  dayContainer: {
    flexDirection: 'row',
    height: 59,
    paddingLeft: 11,
    marginTop: 28,
  },
  linear: {
    height: 59,
    borderRadius: 6,
    width: (SystemHelper.width - 76) / 7,
    alignItems: 'center',
    marginRight: 9,
  },
  dayText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  dayView: {
    backgroundColor: '#EEEEEE',
    borderRadius: 6,
    height: 59,
    width: (SystemHelper.width - 76) / 7,
    alignItems: 'center',
    marginRight: 9,
  },
  unsigninText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  signinIcon: {
    width: 15,
    height: 12,
    marginTop: 5,
  },
  unsigninIcon: {
    width: 21,
    height: 21,
  },
  rankView: {
    flexDirection: 'row',
    marginTop: 28,
    alignItems: 'center',
    marginHorizontal: 11,
    alignSelf: 'center',
    paddingTop: 10
  },
  rankText: {
    lineHeight: 18,
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signLinear: {
    height: 49,
    borderRadius: 24,
    width: 215,
    alignSelf: 'center',
    marginTop: 40,
  },
  signinBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  signinText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  signinRulesBtn: {
    alignSelf: 'center',
    marginTop: 14,
    minHeight: 30,
  },
  signinRulesText: {
    color: '#888888',
    fontSize: 14,
  }
})
