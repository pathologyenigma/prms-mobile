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
    marginTop: 120,
  },
  btnContainer: {
    width: SystemHelper.width - 44,
    height: 50,
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
    minHeight: 74,
    justifyContent: 'space-between',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 11,
    marginTop: 15,
    textAlignVertical: 'top'
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
    paddingHorizontal: 11,
  },
})
