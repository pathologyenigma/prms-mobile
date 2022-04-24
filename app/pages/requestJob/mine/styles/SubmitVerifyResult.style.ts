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
  contentView: {
    marginTop: 19,
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
