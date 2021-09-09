import { StyleSheet } from 'react-native'
import { greenColor } from '../../../utils/constant'

export default StyleSheet.create({
  contentView: {

  },
  image: {
    width: 34,
    height: 40,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    marginHorizontal: 40,
    lineHeight: 21,
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    fontWeight: 'bold'
  },
  detail: {
    marginHorizontal: 40,
    lineHeight: 21,
    fontSize: 15,
    textAlign: 'center',
    color: '#666666',
    marginTop: 20,
    fontWeight: 'bold'
  },
  contextChildrenStyle: {
    paddingBottom: 0,
    borderRadius: 16,
  },
  btnView: {
    flexDirection: 'row',
    marginTop: 30,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    justifyContent: 'space-evenly'
  },
  button: {
    paddingHorizontal: 1,
    height: 59,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%'
  },
  leftText: {
    lineHeight: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
  },
  rightText: {
    lineHeight: 20,
    fontSize: 16,
    textAlign: 'center',
    color: greenColor,
  },
  tips: {
    marginTop: 10,
    lineHeight: 18,
    opacity: 0.4,
    fontSize: 14,
    color: 'rgba(32,33,38,0.4)',
    alignSelf: 'center'
  },
})