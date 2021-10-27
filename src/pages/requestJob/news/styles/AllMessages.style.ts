import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listView: {
    flex: 1
  },
  contentView: {
    flex: 1,
  },
  tabsView: {
    flexDirection: 'row',
    height: 45,
    marginTop: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 11,
    alignItems: 'center',
  },
  tabLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  tabsBtn: {
    height: 43,
    marginRight: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsTitle: {
    fontSize: 16,
    color: '#666',
  },
  linearView: {
    width: 24,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    bottom: 0,
  },
  selectedTitle: {
    color: greenColor,
    fontWeight: 'bold'
  },
  interactionCell: {
    paddingHorizontal: 11,
    paddingVertical: 18,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  interactionCellIconView: {
    width: 54,
    height: 54,
  },
  interactionCellIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  interactionCellTag: {
    width: 20,
    height: 20,
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  interactionCellValue: {
    flex: 1,
    marginLeft: 25,
  },
  interactionCellName: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold'
  },
  interactionCellComment: {
    fontSize: 12,
    color: '#333333',
    marginTop: 5,
  },
  interactionCellDetail: {
    color: '#888888',
    fontSize: 11,
    marginTop: 5,
  },
  interactionCellRole: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#AAAAAA'
  },
  interactionCellCommentOthers: {
    flexDirection: 'row'
  },
  interactionCellCommentOthersIcon: {
    width: 23,
    height: 23,
    borderRadius: 12
  },
  interactionCellCommentCellImage: {
    width: 67,
    height: 67,
    borderRadius: 4,
    marginLeft: 5
  },
  trendCell: {
    paddingHorizontal: 11,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    flexDirection: 'row'
  },
  trendCellIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  trendCellValue: {
    marginLeft: 29,
    flex: 1,
  },
  trendCellContent: {
    fontSize: 14,
    color: '#333333',
    fontWeight: 'bold'
  },
  trendCellContentTime: {
    color: '#888888',
    fontSize: 11,
    marginTop: 10,
  }
})
