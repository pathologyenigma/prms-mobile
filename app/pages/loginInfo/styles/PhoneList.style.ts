import { StyleSheet } from 'react-native'
import SystemHelper from '../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: SystemHelper.safeBottom,
  },
  page: {
    backgroundColor: '#FFFFFF',
  },
  sectionHeader: {
    height: 60,
    marginHorizontal: 14,
    lineHeight: 60,
    color: 'rgba(50,51,56,0.5)',
    backgroundColor: '#FFFFFF',
  },
  countryCell: {
    height: 50,
    paddingLeft: 24,
    paddingRight: 54,
    borderBottomWidth: 1,
    borderBottomColor: '#f6f6f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countryTitle: {
    height: 23,
    fontSize: 18,
    lineHeight: 23,
    color: '#323338'
  },
  popularView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 14,
  },
  sectionHeaderText: {
    height: 60,
    marginLeft: 8,
    lineHeight: 60,
    color: 'rgba(50,51,56,0.5)',
    backgroundColor: '#FFFFFF',
  },
  popularHeaderIcon: {
    width: 16,
    height: 14,
  },
  popularIcon: {
    width: 14,
    height: 14,
  },
  countryCode: {
    height: 23,
    lineHeight: 23,
    fontSize: 18,
    color: '#000000',
  },
  sideView: {
    position: 'absolute',
    width: 18,
    height: SystemHelper.height - 190,
    right: 14,
    top: 140,
    borderRadius: 9.5,
    backgroundColor: '#f5f6fa',
    justifyContent: 'space-between',
    paddingVertical: 12,
    alignItems: 'center',
  },
  sideText: {
    opacity: 0.5,
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
  },
})
