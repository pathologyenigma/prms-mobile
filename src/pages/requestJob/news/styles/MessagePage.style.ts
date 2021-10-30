import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    width: SystemHelper.width,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 11,
    marginTop: 25
  },
  navBar: {
    paddingLeft: 11,
    paddingTop: SystemHelper.safeTop + 8,
    height: SystemHelper.safeTop + 44,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  barLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
  },
  backIcon: {
    width: 12,
    height: 23,
  },
  unreadText: {
    color: '#333333',
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 10,
    width: 26,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#f3f3f3',
    lineHeight: 22,
    textAlign: 'center'
  },
  barTitleView: {
    flex: 1,
  },
  barTitle: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 16,
    fontWeight: '400'
  },
  barDetail: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 11,
  },
  editBtbn: {
    width: 50,
    height: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 11,
  },
  editIcon: {
    width: 20,
    height: 4,
  },
  operateVeiw: {
    height: 50,
    width: SystemHelper.width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  operateBtn: {
    alignItems: 'center'
  },
  operateIcon: {
    width: 19,
    height: 18,
  },
  operateText: {
    color: '#333333',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2
  },
  listView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  footerContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 11,
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
  commonWordsBtn: {
    width: 44,
    height: 22,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3
  },
  commonWordsText: {
    color: '#FFFFFF',
    backgroundColor: '#7DD49C',
    fontSize: 12,
    fontWeight: 'bold'
  },
  commonWordIcon: {
    width: 29,
    height: 29
  },
  contentInput: {
    borderRadius: 4,
    backgroundColor: '#F7F7F7',
    lineHeight: 20,
    padding: 0,
    maxHeight: 83,
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 15,
    paddingLeft: 5,
    paddingRight: 3,
    marginLeft: 10,
    flex: 1,
    marginTop: 10,
    minHeight: 30
  },
  emojeBtn: {
    marginLeft: 19,
    marginBottom: 3
  },
  emojeIcon: {
    width: 21,
    height: 20,
  },
  addBtn: {
    marginLeft: 10,
    marginBottom: 3
  },
  addIcon: {
    width: 20,
    height: 20
  },
  snedText: {
    borderRadius: 2,
    width: 34,
    height: 20,
    textAlign: 'center',
    lineHeight: 20,
    backgroundColor: greenColor,
    fontSize: 13,
    color: '#fff',
  },
  commonWordView: {
    height: 155,
    width: SystemHelper.width,
  },
  commonWordCell: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    minHeight: 60,
    borderTopColor: '#F0F0F0',
    borderTopWidth: 1,
    justifyContent: 'center',
  },
  commonWordCellTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  commonWordSetting: {
    marginTop: 5,
    marginBottom: 5,
    height: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commonWordSettingIcon: {
    width: 19,
    height: 18,
  },
  commonWordSettingText: {
    marginLeft: 13,
    color: '#333333',
    fontSize: 15
  },
  mediaVeiw: {
    height: 80,
    width: SystemHelper.width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  mediaBtn: {
    alignItems: 'center'
  },
  mediaIcon: {
    width: 26,
    height: 27,
  },
  mediaText: {
    color: '#333333',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2
  },
})
