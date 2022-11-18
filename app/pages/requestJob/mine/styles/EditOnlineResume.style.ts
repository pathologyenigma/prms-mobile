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
  },
  iconView: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 11
  },
  nameView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gender: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 18,
    height: 18
  },
  editNameIcon: {
    marginLeft: 11,
    width: 13,
    height: 14
  },
  cellView: {
    marginTop: 12,
    paddingTop: 12,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 11
  },
  titleText: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold'
  },
  expectJobsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 11
  },
  expectJobsText: {
    color: '#333333',
    fontSize: 15
  },
  expectJobsLocation: {
    marginTop: 8,
    color: '#666666',
    fontSize: 13
  },
  userInfo: {
    color: '#666666',
    fontSize: 13
  },
  addIcon: {
    width: 19,
    height: 19
  },
  iconText: {
    fontSize: 17,
    color: '#333333',
    fontWeight: 'bold'
  },
  iconStyle: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2.0,
  },
  cell: {
    minHeight: 80,
    paddingHorizontal: 11,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  cellText: {
    fontSize: 13,
    color: '#666',
  },
  valueView: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cellDetail: {
    color: '#333333',
    fontSize: 15,
  },
  nextIcon: {
    width: 7,
    height: 13,
  },
  genderView: {
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 11,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 1,
  },
  genderText: {
    color: '#666666',
    fontSize: 13
  },
  genderDetail: {
    flexDirection: 'row'
  },
  genderDetailBtn: {
    width: 56,
    height: 27,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#BEBEBE',
    borderWidth: 1,
    marginLeft: 15
  },
  genderDetailText: {
    color: '#333333',
    fontSize: 13
  },
  editIcon: {
    width: 17,
    height: 17,
  },
  editPersonalView: {
    flexDirection: 'row',
  },
  editPersonalText: {
    color: '#FF8F4F',
    fontSize: 13,
    marginRight: 10
  },
  editPersonalDetail: {
    marginTop: 20,
    color: '#666666',
    fontSize: 13,
    paddingHorizontal: 11
  },
  workExperienceView: {
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    paddingBottom: 30,
    paddingHorizontal: 11
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  workExperienceCompany: {
    flex: 1,
    color: '#333333',
    fontSize: 15
  },
  workExperienceTime: {
    color: '#888888',
    fontSize: 13,
    marginRight: 10
  },
  workExperienceText: {
    marginTop: 10,
    color: '#666666',
    fontSize: 13
  },
  workExperienceLocation: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#666666',
    marginTop: 10
  },
  jobInfoTagView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 11,
  },
  editPersonalSkills: {
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    paddingHorizontal: 9,
    lineHeight: 18,
    color: '#888888',
    fontSize: 11,
    marginRight: 9,
    marginTop: 8
  }
})
