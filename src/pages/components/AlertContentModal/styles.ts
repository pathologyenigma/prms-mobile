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
    marginHorizontal: 37,
    lineHeight: 21,
    fontSize: 16,
    textAlign: 'center',
    color: '#323338',
  },
  detail: {
    marginHorizontal: 37,
    lineHeight: 21,
    fontSize: 16,
    textAlign: 'center',
    color: '#323338',
    marginTop: 20,
  },
  btnView: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-around',
  },
  button: {
    width: 110,
    height: 46,
    borderRadius: 8,
    backgroundColor: greenColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 11,
  },
  buttonText: {
    lineHeight: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
  },
  tips: {
    marginTop: 10,
    lineHeight: 18,
    opacity: 0.4,
    fontSize: 14,
    color: 'rgba(32,33,38,0.4)',
    alignSelf: 'center'
  },
  modalBtn: {
    borderRadius: 8,
    width: 193,
    height: 52,
  },
  modalBtn_aboveStyle: {
    width: 193,
    height: 44,
  },
  modalBtnText: {
    height: 20,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  bottomStyle: {
    backgroundColor: '#77C931',
    height: 30,
  },
})