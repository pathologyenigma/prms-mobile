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
    marginTop: 50,
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
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  inputView: {
    borderRadius: 8,
    marginHorizontal: 11,
    width: SystemHelper.width - 22,
    paddingHorizontal: 11,
    height: 145,
    justifyContent: 'space-between',
    backgroundColor: '#F4F4F4',
    marginTop: 25,
  },
  contentInput: {
    width: '100%',
    color: '#666666',
    fontSize: 12,
    textAlignVertical: 'top'
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
