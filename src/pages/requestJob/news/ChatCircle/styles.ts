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
  tabs: {
    width: SystemHelper.width,
    height: 48,
    paddingHorizontal: 11,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 13,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  selectTypeBtn: {
    marginRight: 48,
  },
  selectTypeText: {
    color: '#666666',
    fontSize: 16
  },
  tongzhiTips: {
    flexDirection: 'row',
    minHeight: 44,
    alignItems: 'center',
    paddingHorizontal: 11,
    justifyContent: 'space-between',
    backgroundColor: '#FFF7ED',
  },
  closeImg: {
    width: 15,
    height: 15
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  openNoficationTips: {
    color: '#FFBA6A',
    fontSize: 13,
    marginLeft: 12
  },
  linear: {
    height: 25,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  openText: {
    color: '#FEFEFE',
    fontSize: 14,
    fontWeight: 'bold'
  },
  findCircleTopic: {
    marginTop: 9,
    minHeight: 63,
    borderRadius: 8,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EEE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 11,
  },
  findCircleTopicLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  findCircleImage: {
    width: 22,
    height: 26,
    marginLeft: 19,
  },
  findCircleText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 15
  },
  findCircleDetail: {
    color: '#5DD899',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 15,
    marginRight: 16
  }
})
