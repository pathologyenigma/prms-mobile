import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingHorizontal: 11,
  },
  typeTitle: {
    color: '#333333',
    marginTop: 10,
    fontSize: 15,
    fontWeight: '400'
  },
  tagView: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SystemHelper.width - 22,
  },
  selectBtnContainer: {
    height: 25,
    marginRight: 15,
  },
  selectBtn: {
    paddingHorizontal: 16,
    borderRadius: 13,
    height: 25,
    overflow: 'hidden',
  },
  selectTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 15,
  },
  normalBtn: {
    borderColor: '#DEDEDE',
    borderWidth: 1,
    height: 26,
    borderRadius: 13,
    paddingHorizontal: 16,
    marginRight: 15
  },
  normalText: {
    color: '#666666',
    fontSize: 12,
    lineHeight: 24,
  },
  contentView: {
    marginTop: 23,
  },
  contentInput: {
    marginTop: 15,
    borderRadius: 4,
    backgroundColor: '#F7F7F7',
    height: 80,
    width: '100%',
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 12,
    paddingLeft: 10,
    textAlignVertical: 'top'
  },
  contactInput: {
    marginTop: 15,
    borderRadius: 4,
    backgroundColor: '#F7F7F7',
    height: 40,
    width: '100%',
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 12,
    paddingLeft: 10,
  },
  submitBtn: {
    backgroundColor: greenColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 55,
    marginTop: 145,
    marginHorizontal: 10,
  },
  selectText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '400'
  }
})
