import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { StatusBar, Image } from 'react-native'
import BackImage from './components/BackImage'

import Home from './Home'
import PostJob, { PostJobOptions } from './Job/PostJob'
import EditJobName, { EditJobNameOptions } from './Job/EditJboName'
import PostJobSuccess, { PostJobSuccessOptions } from './Job/PostJobSuccess'
import JobPostRule, { JobPostRuleOptions } from './Job/JobPostRule'
import EditJobDescription, {
  EditJobDescriptionOptions,
} from './Job/EditJobDescription'
import EditJobAddress, { EditJobAddressOptions } from './Job/EditJobAddress'
import SearchJobAddress, {
  SearchJobAddressOptions,
} from './Job/SearchJobAddress'
import EditJobWelfare, { EditJobWelfareOptions } from './Job/EditJobWelfare'
import RechargeExplain, { RechargeExplainOptions } from './Job/RechargeExplain'
import RechargeFeekback, {
  RechargeFeekbackOptions,
} from './Job/RechargeFeekback'
import TalentDetail, { TalentDetailOptions } from './Talent/TalentDetail'
import ComplaintCandidate, {
  ComplaintCandidateOptions,
} from './Talent/ComplaintCandidate'
import HrProfile, { HrProfileOptions } from './Hr/HrProfile'
import EditHrTitle, { EditHrTitleOptions } from './Hr/EditHrTitle'
import EditHrPhoneNumber, {
  EditHrPhoneNumberOptions,
} from './Hr/EditHrPhoneNumber'
import EditHrNameDisplay, {
  EditHrNameDisplayOptions,
} from './Hr/EditHrNameDisplay'
import EditCompanyEmail, {
  EditCompanyEmailOptions,
} from './Hr/EditCompanyEmail'
import TalentListWithTalks, {
  TalentListwithTalksOptions,
} from './Talent/TalentListWithTalks'
import TalentDetailWithJudgment, {
  TalentDetailWithJudgmentOptions,
} from './Talent/TalentDetailWithJudgment'
import InterviewSchedule, {
  InterviewScheduleOptions,
} from './Interview/InterviewSchedule'
import AllInterview, { AllInterviewOptions } from './Interview/AllInterview'
import InterviewDetail, {
  InterviewDetailOptions,
} from './Interview/InterviewDetail'
import JobAdmin, { JobAdminOptions } from './Job/JobAdmin'
import JobDescription, { JobDescriptionOptions } from './Job/JobDescription'
import RecruitCoordination, {
  RecruitCoordinationOptions,
} from './Job/RecruitCoordination'
import CandidateSearch, {
  CandidateSearchOptions,
} from './Talent/CandidateSearch'
import CandidateCity, { CandidateCityOptions } from './Talent/CandidateCity'
import CandidateFilter, {
  CandidateFilterOptions,
} from './Talent/CandidateFilter'
import JobCategory, {
  JobCategoryOptions,
} from './Talent/CandidateFilter/JobCategory'
import JobCity, { JobCityOptions } from './Talent/CandidateFilter/JobCity'
import JobTrade, { JobTradeOptions } from './Talent/CandidateFilter/JobTrade'
import HrAuthentication, {
  HrAuthenticationOptions,
} from './Company/HrAuthentication'
import CompanyAuthentication, {
  CompanyAuthenticationOptions,
} from './Company/CompanyAuthentication'
import CompanyFullName, {
  CompanyFullNameOptions,
} from './Company/CompanyFullName'
import CompanyAuthenticationMethod, {
  CompanyAuthenticationMethodOptions,
} from './Company/CompanyAuthenticationMethod'
import CompanyAuthenticationByColleague, {
  CompanyAuthenticationByColleagueOptions,
} from './Company/CompanyAuthenticationByColleague'
import CompanyAuthenticationByColleagueWithSmsInput, {
  CompanyAuthenticationByColleagueWithSmsInputOptions,
} from './Company/CompanyAuthenticationByColleagueWithSmsInput'
import CompanyAuthenticationByLicense, {
  CompanyAuthenticationByLicenseOptions,
} from './Company/CompanyAuthenticationByLicense'
import CompanyAuditResult, {
  CompanyAuditResultOptions,
} from './Company/CompanyAuditResult'
import JobFairList, { JobFairListOptions } from './JobFair/JobFairList'
import JobFairSearch, { JobFairSearchOptions } from './JobFair/JobFairSearch'
import JobFairDetail, { JobFairDetailOptions } from './JobFair/JobFairDetail'
import JobFairEnroll, { JobFairEnrollOptions } from './JobFair/JobFairEnroll'

import CompanyDetail, { CompanyDetailOptions } from './Company/CompanyDetail'

const Stack = createStackNavigator()

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <StatusBar translucent backgroundColor="transparent" animated />
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            key="CompanyDetail"
            name="CompanyDetail"
            component={CompanyDetail}
            options={CompanyDetailOptions}
          />
          <Stack.Screen
            key="JobFairDetail"
            name="JobFairDetail"
            component={JobFairDetail}
            options={JobFairDetailOptions}
          />
          <Stack.Screen
            key="JobFairEnroll"
            name="JobFairEnroll"
            component={JobFairEnroll}
            options={JobFairEnrollOptions}
          />
          <Stack.Screen
            key="JobFairSearch"
            name="JobFairSearch"
            component={JobFairSearch}
            options={JobFairSearchOptions}
          />

          <Stack.Screen
            key="JobFairList"
            name="JobFairList"
            component={JobFairList}
            options={JobFairListOptions}
          />
          <Stack.Screen
            key="CompanyAuditResult"
            name="CompanyAuditResult"
            component={CompanyAuditResult}
            options={CompanyAuditResultOptions}
          />
          <Stack.Screen
            key="CompanyAuthenticationByLicense"
            name="CompanyAuthenticationByLicense"
            component={CompanyAuthenticationByLicense}
            options={CompanyAuthenticationByLicenseOptions}
          />
          <Stack.Screen
            key="CompanyAuthenticationByColleagueWithSmsInput"
            name="CompanyAuthenticationByColleagueWithSmsInput"
            component={CompanyAuthenticationByColleagueWithSmsInput}
            options={CompanyAuthenticationByColleagueWithSmsInputOptions}
          />
          <Stack.Screen
            key="CompanyAuthenticationByColleague"
            name="CompanyAuthenticationByColleague"
            component={CompanyAuthenticationByColleague}
            options={CompanyAuthenticationByColleagueOptions}
          />
          <Stack.Screen
            key="CompanyAuthenticationMethod"
            name="CompanyAuthenticationMethod"
            component={CompanyAuthenticationMethod}
            options={CompanyAuthenticationMethodOptions}
          />

          <Stack.Screen
            key="CompanyAuthentication"
            name="CompanyAuthentication"
            component={CompanyAuthentication}
            options={CompanyAuthenticationOptions}
          />

          <Stack.Screen
            key="CompanyFullName"
            name="CompanyFullName"
            component={CompanyFullName}
            options={CompanyFullNameOptions}
          />

          <Stack.Screen
            key="HrAuthentication"
            name="HrAuthentication"
            component={HrAuthentication}
            options={HrAuthenticationOptions}
          />
          <Stack.Screen
            key="CandidateFilter"
            name="CandidateFilter"
            component={CandidateFilter}
            options={CandidateFilterOptions}
          />
          <Stack.Screen
            key="CandidateSearch"
            name="CandidateSearch"
            component={CandidateSearch}
            options={CandidateSearchOptions}
          />

          <Stack.Screen
            key="JobTrade"
            name="JobTrade"
            component={JobTrade}
            options={JobTradeOptions}
          />
          <Stack.Screen
            key="JobCity"
            name="JobCity"
            component={JobCity}
            options={JobCityOptions}
          />
          <Stack.Screen
            key="JobCategory"
            name="JobCategory"
            component={JobCategory}
            options={JobCategoryOptions}
          />

          <Stack.Screen
            key="CandidateCity"
            name="CandidateCity"
            component={CandidateCity}
            options={CandidateCityOptions}
          />

          <Stack.Screen
            key="RecruitCoordination"
            name="RecruitCoordination"
            component={RecruitCoordination}
            options={RecruitCoordinationOptions}
          />
          <Stack.Screen
            key="JobDescription"
            name="JobDescription"
            component={JobDescription}
            options={JobDescriptionOptions}
          />
          <Stack.Screen
            key="JobAdmin"
            name="JobAdmin"
            component={JobAdmin}
            options={JobAdminOptions}
          />
          <Stack.Screen
            key="InterviewDetail"
            name="InterviewDetail"
            component={InterviewDetail}
            options={InterviewDetailOptions}
          />
          <Stack.Screen
            key="InterviewSchedule"
            name="InterviewSchedule"
            component={InterviewSchedule}
            options={InterviewScheduleOptions}
          />
          <Stack.Screen
            key="AllInterview"
            name="AllInterview"
            component={AllInterview}
            options={AllInterviewOptions}
          />

          <Stack.Screen
            key="TalentDetailWithJudgment"
            name="TalentDetailWithJudgment"
            component={TalentDetailWithJudgment}
            options={TalentDetailWithJudgmentOptions}
          />
          <Stack.Screen
            key="TalentDetail"
            name="TalentDetail"
            component={TalentDetail}
            options={TalentDetailOptions}
          />
          <Stack.Screen
            key="TalentListWithTalks"
            name="TalentListWithTalks"
            component={TalentListWithTalks}
            options={TalentListwithTalksOptions}
          />
          <Stack.Screen
            key="Home"
            name="Home"
            component={Home}
            options={{
              header: () => null,
            }}
          />
          <Stack.Screen
            key="EditCompanyEmail"
            name="EditCompanyEmail"
            component={EditCompanyEmail}
            options={EditCompanyEmailOptions}
          />
          <Stack.Screen
            key="EditHrNameDisplay"
            name="EditHrNameDisplay"
            component={EditHrNameDisplay}
            options={EditHrNameDisplayOptions}
          />
          <Stack.Screen
            key="EditHrPhoneNumber"
            name="EditHrPhoneNumber"
            component={EditHrPhoneNumber}
            options={EditHrPhoneNumberOptions}
          />
          <Stack.Screen
            key="EditHrTitle"
            name="EditHrTitle"
            component={EditHrTitle}
            options={EditHrTitleOptions}
          />
          <Stack.Screen
            key="HrProfile"
            name="HrProfile"
            component={HrProfile}
            options={HrProfileOptions}
          />

          <Stack.Screen
            key="ComplaintCandidate"
            name="ComplaintCandidate"
            component={ComplaintCandidate}
            options={ComplaintCandidateOptions}
          />

          <Stack.Screen
            key="PostJob"
            name="PostJob"
            component={PostJob}
            options={PostJobOptions}
          />
          <Stack.Screen
            key="RechargeFeekback"
            name="RechargeFeekback"
            component={RechargeFeekback}
            options={RechargeFeekbackOptions}
          />
          <Stack.Screen
            key="EditJobWelfare"
            name="EditJobWelfare"
            component={EditJobWelfare}
            options={EditJobWelfareOptions}
          />
          <Stack.Screen
            key="RechargeExplain"
            name="RechargeExplain"
            component={RechargeExplain}
            options={RechargeExplainOptions}
          />

          <Stack.Screen
            key="EditJobAddress"
            name="EditJobAddress"
            component={EditJobAddress}
            options={EditJobAddressOptions}
          />
          <Stack.Screen
            key="SearchJobAddress"
            name="SearchJobAddress"
            component={SearchJobAddress}
            options={SearchJobAddressOptions}
          />

          <Stack.Screen
            key="EditJobDescription"
            name="EditJobDescription"
            component={EditJobDescription}
            options={EditJobDescriptionOptions}
          />
          <Stack.Screen
            key="JobPostRule"
            name="JobPostRule"
            component={JobPostRule}
            options={JobPostRuleOptions}
          />
          <Stack.Screen
            key="PostJobSuccess"
            name="PostJobSuccess"
            component={PostJobSuccess}
            options={PostJobSuccessOptions}
          />
          <Stack.Screen
            key="EditJobName"
            name="EditJobName"
            component={EditJobName}
            options={EditJobNameOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const screenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#FFFFFF',
  },
  headerTitleStyle: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerBackImage: () => <BackImage barStyle="dark-content" />,
  headerPressColorAndroid: '#00000000',
}

const screens: {
  [key: string]: () => JSX.Element
} = {
  Home,
  PostJob,
}

export default App
