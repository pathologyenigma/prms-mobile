import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  content: {
    width: SystemHelper.width,
    backgroundColor: '#fff',
    paddingTop: 27,
    paddingBottom: 32,
    alignItems: 'center',
    paddingHorizontal: 11
  },
  title: {
    color: '#333333',
    fontSize: 20,
    fontWeight: '400'
  },
  cellView: {
    flexDirection: 'row',
    marginVertical: 9,
    alignItems: 'center',
    width: SystemHelper.width - 22,
  },
  cellTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '400',
    flex: 1
  },
  jinbiIcon: {
    width: 18,
    height: 18,
    marginLeft: 8
  },
  cellValue: {
    color: '#888888',
    fontSize: 14,
  },
  cellName: {
    flex: 1,
    color: '#333333',
    fontSize: 15,
    fontWeight: '400'
  },
  cellMoney: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold'
  },
})
