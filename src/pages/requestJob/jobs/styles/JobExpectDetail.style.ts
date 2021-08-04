import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollview: {
    flex: 1,
    paddingTop: 10,
  },
  saveBtn: {
    color: greenColor,
    fontSize: 15
  },
  cellView: {
    marginHorizontal: 11,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    paddingBottom: 9,
    marginTop: 24,
  },
  cellTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cellText: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '400'
  },
  nextImage: {
    width: 7,
    height: 13
  },
  cellViewDetail: {
    color: '#666666',
    marginTop: 16
  }

})
