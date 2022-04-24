import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  saveBtn: {
    color: greenColor,
    fontSize: 15
  },
  contentView: {
    flex: 1,
  },
  detailView: {
    flex: 1,
    width: SystemHelper.width,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  detailSecondView: {
    backgroundColor: '#FAFAFA',
    width: SystemHelper.width * 0.5,
    paddingTop: 25,
  },
  detailSecondBtn: {
    marginBottom: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#EEEEEE'
  },
  detailSecondText: {
    color: '#666666'
  },
  detailThirdView: {
    backgroundColor: '#EEEEEE',
    // width: SystemHelper.width * 0.5,
    paddingTop: 25,
  },
  detailThirdBtn: {
    paddingLeft: 20,
    marginBottom: 45,
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#EEEEEE',
    flexDirection: 'row'
  },
  selectTag: {
    width: 15,
    height: 11,
    marginLeft: 11
  },
  selectedText: {
    color: '#888888',
    fontSize: 12,
    marginTop: 10,
    marginHorizontal: 21,
  },
  selectIndustryView: {
    height: 21,
    marginHorizontal: 21,
    marginTop: 4
  },
  selectIndustryBtn: {
    backgroundColor: '#E2FFF0',
    height: 21,
    paddingHorizontal: 9,
    flexDirection: 'row',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  selectIndustryText: {
    color: '#54D693',
    fontSize: 12,
    fontWeight: 'bold'
  },
  deleteImage: {
    marginLeft: 6,
    height: 9,
    width: 9
  }
})
