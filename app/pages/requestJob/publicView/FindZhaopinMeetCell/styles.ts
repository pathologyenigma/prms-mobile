import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  cellView: {
    borderRadius: 8,
    minHeight: 125,
    paddingHorizontal: 17,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#FFF',
    marginTop: 10,
  },
  cellTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cellTitleTagView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusTextColor: {
    marginLeft: 7,
    paddingHorizontal: 7,
    borderRadius: 2,
    fontSize: 11,
    fontWeight: '400'
  },
  hotIcon: {
    width: 27,
    height: 12,
    marginLeft: 10
  },
  tagView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  tagItemView: {
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    marginRight: 6,
    color: '#888888',
    fontSize: 10,
    paddingHorizontal: 3
  },
  tagText: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    borderRadius: 2,
    marginHorizontal: 1,
    marginVertical: 1,
    paddingVertical: 1,
    paddingHorizontal: 4
  },
  cellTitle: {
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 15
  },
  cellCompanyView: {
    marginTop: 7,
    flexDirection: 'row',
  },
  cellCompany: {
    color: '#666',
    marginRight: 19,
    fontSize: 11
  },
  cellTimeView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  timeIcon: {
    width: 11,
    height: 11,
    marginRight: 5
  },
  cellTime: {
    lineHeight: 15,
    fontSize: 12,
    color: '#666',
  },
  cellLocationView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  locationIcon: {
    width: 11,
    height: 14,
    marginRight: 5
  },
})
