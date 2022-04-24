import { StyleSheet } from 'react-native'
import SystemHelper from '../../../utils/system'

export default StyleSheet.create({
  topView: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 8,
    width: SystemHelper.width,
    paddingBottom: SystemHelper.safeBottom + 60
  },
  scrollView: {
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1
  },
  containerScrollView: {
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    height: 117,
    minWidth: SystemHelper.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: (SystemHelper.width - 160) / 6,
  },
  shareIcon: {
    height: 50,
    width: 50
  },
  shareText: {
    marginTop: 9,
    color: '#666666',
    fontSize: 12,
  },
  cancleBtn: {
    marginTop: 7,
    paddingVertical: 10,
    width: SystemHelper.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancleText: {
    color: '#666666',
    fontSize: 15,
    fontWeight: 'bold'
  }
})
