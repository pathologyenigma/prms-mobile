import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 12,
  },
  closeIcon: {
    width: 14,
    height: 14
  },
  cell: {
    minHeight: 63,
    paddingHorizontal: 11,
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  title: {
    fontSize: 10,
    color: '#666666',
  },
  description: {
    marginTop: 5,
    fontSize: 15,
    color: '#333333',
    fontWeight: '400',
  },
  detailView: {
    marginTop: 37,
    marginLeft: 11
  },
  detailTitle: {
    flexDirection: 'row'
  },
  detailStar: {
    color: '#FF4A4A',
    fontSize: 20,
    fontWeight: '400',
    marginTop: 2,
  },
  detailText: {
    color: '#333333',
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 2
  },
  inputView: {
    backgroundColor: '#f7f7f7',
    borderRadius: 4,
    marginTop: 30,
    width: SystemHelper.width - 22,
    paddingHorizontal: 11,
    height: 103,
    justifyContent: 'space-between',
  },
  detailInput: {
    width: '100%',
    color: '#666666',
    fontSize: 12,
    textAlignVertical: 'top'
  },
  detailAmount: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 5
  },
  selectPhoto: {
    width: 101,
    height: 101,
    marginRight: 10,
    marginBottom: 10,
  },
  imageView: {
    marginTop: 23,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  submitStyle: {
    marginTop: 41,
    width: SystemHelper.width - 22,
    marginHorizontal: 11,
    height: 55
  },
  tipsView: {
    marginHorizontal: 22,
    marginTop: 15
  },
  userPrivacy: {
    flexDirection: 'row',
    width: SystemHelper.width - 44,
    overflow: 'scroll'
  },
  tipsText: {
    color: '#666666',
    fontSize: 10,
  },
  tipsPrivacy: {
    color: '#57DE9E',
    fontSize: 10,
    fontWeight: 'bold'
  }
})
