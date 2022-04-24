import { StyleSheet } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import SystemHelper from '../../../../utils/system'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  leftBtn: {
    position: 'absolute',
    top: SystemHelper.safeTop + 10,
    zIndex: 1,
    width: 32,
    height: 23,
    alignItems: 'flex-end',
  },
  leftIcon: {
    width: 12,
    height: 23
  },
  bottomContainer: {
    width: SystemHelper.width,
    height: 54,
    marginHorizontal: 22,
    paddingTop: 7,
    marginBottom: SystemHelper.safeBottom,
  },
  btnContainer: {
    width: SystemHelper.width - 44,
    height: 40,
    backgroundColor: '#F0F0F0',
  },
  mapMarkerBg: {
    minWidth: 50,
    minHeight: 35,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden'
  },
  mapMarkerText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  mapWrapper: {
    width: '100%',
    aspectRatio: SystemHelper.width / (SystemHelper.height - SystemHelper.safeBottom - 54),
  },
  map: {
    flex: 1,
  },
  mapMarkerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})
