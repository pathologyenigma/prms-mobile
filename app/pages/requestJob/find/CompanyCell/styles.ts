import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  cell: {
    marginTop: 13,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 16,
    backgroundColor: greenColor,
    borderRadius: 4,
  },
  titleView: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  company: {
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  linear: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    // height: 13,
    paddingHorizontal: 3,
    marginLeft: 11
  },
  text: {
    color: '#FFFFFF',
    fontSize: 10,
    paddingVertical: 2,
    fontWeight: 'bold',
  },
  isBestEmployer: {
    paddingHorizontal: 2,
    borderWidth: 1,
    borderColor: '#E5B531',
    borderRadius: 2,
    color: '#E5B531',
    fontSize: 8,
    // height: 13,
    paddingVertical: 3,
    marginLeft: 7
  },
  companyTagView: {
    flexDirection: 'row',
    marginTop: 11,
  },
  companyTag: {
    backgroundColor: '#F0F0F0',
    height: 14,
    lineHeight: 14,
    paddingHorizontal: 5,
    color: '#888888',
    fontSize: 10,
    marginRight: 4,
    borderRadius: 3,
  },
  starView: {
    flexDirection: 'row',
    marginTop: 9,
    alignItems: 'center'
  },
  starText: {
    color: '#666666',
    fontSize: 10,
    marginRight: 5,
  },
  star: {
    width: 10,
    height: 10,
    marginLeft: 5
  },
  onlineJobs: {
    color: '#666',
    fontSize: 10,
    marginLeft: 18,
  },
  basicInfoView: {
    flexDirection: 'row',
    width: SystemHelper.width - 65,
    // overflow: 'hidden',
    marginTop: 10,
  },
  basicItem: {
    paddingLeft: 7,
    paddingRight: 7,
    borderRightWidth: 1,
    borderRightColor: '#f0f0f0'
  },
  basicText: {
    color: '#666',
    fontSize: 11,
  },
})
