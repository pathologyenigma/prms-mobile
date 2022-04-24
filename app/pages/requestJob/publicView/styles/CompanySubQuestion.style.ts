import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',

  },
  bottomContainer: {
    width: SystemHelper.width,
    marginHorizontal: 22,
    paddingTop: 7,
    marginTop: 77,
  },
  btnContainer: {
    width: SystemHelper.width - 44,
    height: 40,
  },
  contentView: {
    flex: 1,
  },
  titleView: {
    marginTop: 17,
    paddingHorizontal: 11,
  },
  title: {
    color: '#666666',
    fontSize: 10,
  },
  detail: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 24
  },
  objectView: {
    flexDirection: 'row',
    marginTop: 15,
  },
  yuangongStyle: {
    marginRight: 15,
    height: 25,
    borderRadius: 13,
    width: 100
  },
  yuangongTextStyle: {
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: 14,
  },
  mianshiStyle: {
    marginRight: 15,
    height: 25,
    borderRadius: 13,
    width: 76
  },
  reviewerBtn: {
    height: 26,
    width: 76,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#dedede',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewerText: {
    color: '#666666',
    fontSize: 12,
    lineHeight: 14,
  },
  inputView: {
    borderRadius: 8,
    marginHorizontal: 11,
    width: SystemHelper.width - 22,
    marginTop: 25,
  },
  inputViewTitle: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 15
  },
  contentInput: {
    width: '100%',
    color: '#666666',
    fontSize: 12,
    borderRadius: 4,
    minHeight: 40,
    justifyContent: 'space-between',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 11,
    marginTop: 15,
  },
  descriptionView: {
    marginTop: 40,
    paddingHorizontal: 11,
  },
  descriptionInput: {
    width: '100%',
    color: '#666666',
    fontSize: 12,
    backgroundColor: '#F7F7F7',
    height: 108,
    textAlignVertical: 'top',
    marginTop: 15,
  },
  tipsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: SystemHelper.width - 44,
  },
  tipsTextView: {
    flexDirection: 'row',
  },
  tipsText: {
    color: '#666666',
    fontSize: 10,
  },
  tipsGuifan: {
    color: '#57DE9E',
    fontSize: 10,
    fontWeight: 'bold'
  },
  checkBtn: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkView: {
    width: 11,
    height: 11,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    width: 8
  },
  anonymousText: {
    marginLeft: 10,
    color: '#888888',
    fontSize: 10,
  }
})
