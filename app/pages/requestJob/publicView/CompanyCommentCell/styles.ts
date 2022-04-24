import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  cellView: {
    marginTop: 26,
    marginBottom: 4,
    marginHorizontal: 11,
  },
  cellTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconImage: {
    width: 44,
    height: 44
  },
  commentInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between'
  },
  cellTitle: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 15
  },
  cellJob: {
    color: '#DDDDDD',
    fontSize: 13,
  },
  cellCompanyView: {
    marginTop: 7,
    flexDirection: 'row',
  },
  cellCompany: {
    color: '#333',
    marginRight: 12,
    fontWeight: '200',
    fontSize: 12
  },
  jobInfoTagView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  jobInfoTagItem: {
    borderRadius: 3,
    paddingHorizontal: 9,
    lineHeight: 18,
    color: '#AAAAAA',
    fontSize: 11,
    marginRight: 9,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#AAAAAA',
  },
  cellContent: {
    fontSize: 13,
    color: '#CCCCCC',
    fontWeight: 'bold',
    marginTop: 14,
    lineHeight: 17,
  },
  cellDetail: {
    flexDirection: 'row',
    marginTop: 17,
    justifyContent: 'space-between'
  },
  cellTime: {
    fontSize: 10,
    color: '#AAAAAA',
  },
  likeView: {
    flexDirection: 'row',
  },
  dianzanIcon: {
    width: 13,
    height: 12,
    marginRight: 8
  }
})
