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
  tabs: {
    width: SystemHelper.width,
    height: 40,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 7,
    borderTopColor: '#F0F0F0',
    borderTopWidth: 1,
  },
  selectTypeBtn: {
    marginRight: 51,
  },
  selectTypeText: {
    color: '#666666',
    fontSize: 14
  }
})
