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
  },
  listView: {
    flex: 1,
    paddingTop: 30,
  },
  saveBtn: {
    color: greenColor,
    fontSize: 15
  },
  cellView: {
    marginLeft: 46,
    marginBottom: 45,
    borderWidth: 5,
    borderColor: '#fff'
  },
  cellText: {
    color: '#666666',
    fontSize: 15,
    fontWeight: 'bold'
  },
  contentView: {
    flex: 1,
  },
  backBtn: {
    width: 60,
  },
  detailView: {
    position: 'absolute',
    left: 0,
    top: SystemHelper.safeTop + 100,
    width: SystemHelper.width,
    height: SystemHelper.height - SystemHelper.safeTop - 100,
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row'
  },
  detailSecondView: {
    backgroundColor: '#fff',
    width: 124,
    paddingTop: 25,
  },
  detailSecondBtn: {
    marginBottom: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailSecondText: {
    color: '#666666'
  },
  detailThirdView: {
    backgroundColor: '#EEEEEE',
    width: SystemHelper.width - 184,
    paddingTop: 25,
  },
})
