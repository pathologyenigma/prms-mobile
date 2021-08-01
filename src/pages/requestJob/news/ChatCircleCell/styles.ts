import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  cell: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 11,
  },
  nameText: {
    lineHeight: 17,
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  icon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: greenColor,
  },
  titleView: {
    marginLeft: 13,
  },
  genderIcon: {
    marginLeft: 8,
    width: 13,
    height: 13
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
  companyText: {
    color: '#888888',
    marginTop: 8,
    fontSize: 12,
    lineHeight: 15
  },
  messageText: {
    color: '#666666',
    fontSize: 13,
    marginTop: 16,
    width: SystemHelper.width - 90
  },
  messagePic: {
    width: 180,
    height: 230,
    borderRadius: 10,
    marginTop: 18,
    backgroundColor: greenColor,
  },
  findCircleTopic: {
    color: '#5DD899',
    marginTop: 6,
    fontSize: 12,
    lineHeight: 15,
    width: SystemHelper.width - 90
  },
  shareView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  shareIcon: {
    width: 16,
    height: 16,
  },
  commentIcon: {
    width: 17,
    height: 17,
  },
  dianzanIcon: {
    width: 15,
    height: 16,
  },
  shareText: {
    fontWeight: 'bold',
    fontSize: 11,
    color: '#666666',
    marginLeft: 6,
    marginRight: 27,
  }
})
