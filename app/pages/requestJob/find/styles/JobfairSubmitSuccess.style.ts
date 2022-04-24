import { StyleSheet } from 'react-native'
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
    marginTop: 33,
  },
  btnContainer: {
    width: SystemHelper.width - 44,
    height: 40,
  },
  contentView: {
    flex: 1,
  },
  titleView: {
    marginTop: 38,
    paddingHorizontal: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    width: 75,
    height: 75
  },
  title: {
    marginTop: 23,
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  detail: {
    color: '#888888',
    marginTop: 16,
    marginHorizontal: 58,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 17
  },
  
  descriptionView: {
    marginTop: 20,
    paddingHorizontal: 11,
  },
  descriptionInput: {
    width: '100%',
    color: '#666666',
    fontSize: 12,
    backgroundColor: '#F7F7F7',
    height: 40,
    textAlignVertical: 'top',
    marginTop: 15,
  },
})
