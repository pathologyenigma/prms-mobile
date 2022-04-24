import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  cell: {
    marginTop: 14,
    backgroundColor: '#FFF',
    paddingTop: 15,
    flexDirection: 'row',
  },
  videoBtn: {
    backgroundColor: greenColor,
    borderRadius: 8,
    width: 140,
    minHeight: 190,
  },
  videoTagContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: 14,
    width: 68,
    borderRadius: 7,
    marginTop: 5,
    marginLeft: 6,
    overflow: 'hidden',
    alignItems: 'center'
  },
  videoTagView: {
    width: 39,
    height: 14,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  videoTagTitle: {
    fontSize: 10,
    color: '#fff',
    marginLeft: 2,
    lineHeight: 12
  },
  videoTable: {
    marginLeft: 5,
    width: 7,
    height: 8
  },
  videoAccount: {
    color: '#FFF',
    fontSize: 8,
    width: 29,
    textAlign: 'center',
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
  cellInfo: {
    marginLeft: 13,
    marginTop: 5,
  },
  titleView: {
    flexDirection: 'row',
  },
  zhaoIcon: {
    width: 17,
    height: 17,
  },
  nameText: {
    marginLeft: 7,
    lineHeight: 17,
    color: '#333333',
    fontSize: 16,
    fontWeight: '400',
    width: SystemHelper.width - 205,
  },
  offlineView: {
    marginTop: 12,
    width: SystemHelper.width - 180,
    flex: 1,
  },
  organizersText: {
    color: '#333333',
    fontSize: 13,
  },
  offlineTime: {
    marginTop: 10,
    color: '#666',
    fontSize: 12
  },
  locationView: {
    flexDirection: 'row',
    marginTop: 13,
  },
  locationIcon: {
    width: 11,
    height: 14,
  },
  locationText: {
    color: '#666',
    fontSize: 12,
    marginLeft: 5,
    width: SystemHelper.width - 202,
  },
  offlineProgressView: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  offlineProgressText: {
    paddingHorizontal: 10,
    height: 16,
    borderColor: '#55D693',
    borderWidth: 1,
    color: '#55D693',
    fontSize: 11,
    marginTop: 7,
    borderRadius: 4,
  },
  offlineProgressDetail: {
    height: 23,
    borderRadius: 4,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  offlineProgressDetailT: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    marginHorizontal: 15
  },
  onlineTag: {
    paddingHorizontal: 9,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tag: {
    lineHeight: 18,
    color: '#EAD991',
    fontSize: 11,
    fontWeight: 'bold'
  },
  summary: {
    marginTop: 8,
    color: '#666666',
    fontSize: 12
  },
  liveTimeView: {
    flexDirection: 'row',
    minHeight: 19,
    marginTop: 12,
  },
  liveTimeIcon: {
    height: 19,
    width: 19
  },
  liveTimeText: {
    lineHeight: 19,
    marginLeft: 4,
    color: '#80E3AD',
    fontSize: 10,
    width: SystemHelper.width - 203,
  }
})
