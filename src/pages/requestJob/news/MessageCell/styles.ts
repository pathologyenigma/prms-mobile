import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  cell: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 11,
  },
  nameText: {
    lineHeight: 17,
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  icon: {
    height: 54,
    width: 54,
    borderRadius: 27,
  },
  titleView: {
    marginLeft: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    width: SystemHelper.width - 85,
    justifyContent: 'space-between',
  },
  contactDetail: {
    flexDirection: 'row',
    lineHeight: 18,
    alignItems: 'center'
  },
  linear: {
    marginLeft: 15,
    paddingHorizontal: 8,
    height: 18,
    borderRadius: 9,
  },
  openText: {
    fontSize: 11,
    color: '#FFF',
    lineHeight: 18
  },
  companyText: {
    color: '#888888',
    marginLeft: 10,
    fontSize: 10
  },
  timeText: {
    color: '#AAAAAA',
    fontSize: 12,
    fontWeight: '300',
    paddingHorizontal: 3
  },
  messageText: {
    color: '#AAAAAA',
    fontSize: 12,
    marginTop: 14,
    width: SystemHelper.width - 90
  },
})
