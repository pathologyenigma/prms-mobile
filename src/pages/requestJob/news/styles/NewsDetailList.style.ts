import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  listView: {
    flex: 1,
  },
  cellTime: {
    color: '#888888',
    fontSize: 13,
    marginVertical: 20,
    alignSelf: 'center'
  },
  officialMessageItem: {
    flexDirection: 'row',
    paddingHorizontal: 11,
  },
  officialMessageItemIcon: {
    width: 54,
    height: 54
  },
  officiaMessagelItemText: {
    marginTop: 8,
    marginLeft: 9,
    marginRight: 40,
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    color: '#888888',
    fontSize: 13,
    fontWeight: 'bold',
    borderRadius: 8,
    borderTopLeftRadius: 2,
  },
  officialLinkItem: {
    marginHorizontal: 11,
    borderRadius: 2,
    backgroundColor: '#fff',
    padding: 12,
  },
  officialLinkItemTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  officialLinkItemImage: {
    borderRadius: 2,
    marginTop: 13,
    height: 130
  },
  officialLinkItemMore: {
    color: '#666666',
    fontSize: 13,
    marginTop: 14,
  },
  learnItem: {
    marginHorizontal: 11,
    backgroundColor: '#fff',
    borderRadius: 2,
    paddingVertical: 12,
  },
  learnItemTitle: {
    marginHorizontal: 12,
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold'
  },
  learnItemDescription: {
    marginHorizontal: 12,
    color: '#666666',
    fontSize: 12,
    marginTop: 13,
    marginBottom: 5,
  },
  learnItemCourseName: {
    marginHorizontal: 12,
    color: '#666666',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 16,
  },
  learnItemCourseNameValue: {
    color: '#333333'
  },
  learnItemCourseMore: {
    marginTop: 20,
    color: '#6297F1',
    fontSize: 13,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 15,
    paddingLeft: 13,
  },
  consumeItem: {
    marginHorizontal: 11,
    backgroundColor: '#fff',
    borderRadius: 2,
    paddingVertical: 12,
  },
  consumeItemHeader: {
    flexDirection: 'row'
  },
  consumeItemImage: {
    height: 21,
    marginRight: 15,
  },
  consumeItemTitle: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold'
  },
  consumeItemAmoutTitle: {
    color: '#333333',
    marginTop: 23,
    alignSelf: 'center',
    fontSize: 12
  },
  consumeCourseName: {
    color: '#333333',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 5
  },
  consumeCourseNameValue: {
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold'
  },
})
