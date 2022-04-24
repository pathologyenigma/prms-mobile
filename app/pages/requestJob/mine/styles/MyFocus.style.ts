import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  listView: {
    flex: 1,
    paddingHorizontal: 11,
  },
  cellStyle: {
    marginTop: 13,
    height: 88,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 11
  },
  cellIcon: {
    height: 44,
    width: 44,
  },
  cellInfo: {
    marginLeft: 10,
    flex: 1
  },
  cellCompany: {
    color: '#666666',
    fontSize: 12,
    marginTop: 5
  },
  statusView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cellName: {
    color: '#333333',
    fontSize: 13,
    fontWeight: 'bold'
  },
  dotIcon: {
    marginLeft: 18,
    width: 6,
    height: 6,
    backgroundColor: '#AAAAAA',
    borderRadius: 3,
    marginRight: 5
  },
  cellStatus: {
    color: '#AAAAAA',
    fontSize: 10,
    fontWeight: 'bold'
  },
  nextIcon: {
    width: 7,
    height: 12
  }
})
