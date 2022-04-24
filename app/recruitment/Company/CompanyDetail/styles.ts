import { Platform, StyleSheet } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#222222',
  },
  navbar: {
    backgroundColor: '#222222',
  },
  companyBasic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 11,
    marginRight: 21,
    marginTop: 17,
  },
  companyMeta: {
    color: '#DEDEDE',
    fontSize: 13,
    marginTop: 12,
  },
  companyLogo: {
    width: 68,
    height: 68,
  },
  companyName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyNameText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  companyNameAccessary: {
    marginLeft: 14,
  },
  companyWorkTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 11,
    marginRight: 21,
    marginTop: 20,
    height: 28,
  },
  companyWorkTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  companyWorkTimeItemIcon: {
    marginRight: 7,
  },
  companyWorkTimeItemLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  companyWorkTimeIndicator: {
    position: 'absolute',
    right: 0,
  },
  companyWelfareScrollBar: {
    height: 56,
    width: '100%',
    flex: 1,
  },
  companyWelfareScrollBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 11,
    paddingRight: 11,
    paddingVertical: 8,
  },
  companyWelfareItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 102,
    height: 40,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#AAAAAA',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  companyWelfareLabel: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 11,
  },
  companyIntro: {
    color: '#DEDEDE',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 20,
    marginHorizontal: 11,
  },
  companyIntroMore: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  companyAddressSection: {
    marginTop: 20,
    marginBottom: 8,
    marginHorizontal: 11,
    backgroundColor: '#3C3B3D',
    borderRadius: 14,
  },
  companyAddressSectionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: 11,
  },
  companyAddressSectionBody: {
    flexDirection: 'row',
    marginTop: 13,
    marginBottom: 17,
    alignItems: 'center',
    marginHorizontal: 11,
  },
  companyAddress: {
    marginLeft: 14,
    marginRight: 24,
    color: '#DDDDDD',
    fontSize: 13,
    lineHeight: 17,
  },
  companyAddressIndicator: {
    position: 'absolute',
    right: 0,
  },
  companyMedias: {
    height: 150,
    width: '100%',
    flex: 1,
    marginTop: 24,
    marginBottom: 8,
  },
  companyMediasContent: {
    flexDirection: 'row',
    paddingHorizontal: 11,
  },
  companyMediaItem: {
    height: 150,
    width: 270,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyMediaItemThumbnail: {
    height: 150,
    width: 270,
  },
  companyMediaItemButton: {
    width: 48,
    height: 48,
    position: 'absolute',
  },
  recruiters: {
    height: 100,
    flex: 1,
    marginTop: 16,
  },
  recruitersContent: {
    paddingHorizontal: 11,
    flexDirection: 'row',
  },
  recruiter: {
    alignItems: 'center',
    maxWidth: 88,
  },
  recruiterAvatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    overflow: 'hidden',
  },
  recruiterName: {
    marginTop: 6,
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
  },
  recruiterTitle: {
    lineHeight: 18,
    color: '#EDEDED',
    fontSize: 12,
  },
  interviewOverview: {
    flexDirection: 'row',
    marginTop: 18,
    alignItems: 'center',
  },
  interviewRatingContainer: {
    marginLeft: 11,
  },
  interviewScore: {
    color: '#FF6F6F',
    fontSize: 30,
  },
  interviewScoreUnit: {
    color: '#DDDDDD',
    fontSize: 15,
    marginBottom: Platform.OS === 'ios' ? 6 : 0,
  },
  interviewRating: {
    marginTop: 0,
  },
  interviewDivider: {
    width: StyleSheet.hairlineWidth,
    height: 45,
    backgroundColor: '#DDDDDD',
    marginHorizontal: 16,
  },
  interviewGradings: {
    marginRight: 11,
    flex: 1,
    justifyContent: 'space-between',
  },
  interviewAssessmentButton: {
    marginTop: 24,
  },
  interviewAssessmentButtonText: {
    color: '#57DE9E',
    fontSize: 14,
    fontWeight: 'bold',
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: isIphoneX() ? 34 : 10,
  },
  hint: {
    color: '#AAAAAA',
    fontSize: 11,
    marginLeft: 6,
    lineHeight: 17,
  },
})

export default styles
