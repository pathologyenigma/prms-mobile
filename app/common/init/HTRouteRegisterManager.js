import React from 'react'
import { HTRouteManager } from 'react-native-route'

import HTGlobalModalPage from '~/common/modal/HTGlobalModalPage'
import HTDebugPage from '~/common/debug/HTDebugPage'
import HTServerPage from '~/common/debug/HTServerPage'
import HTServerAppendPage from '~/common/debug/HTServerAppendPage'

// 登录
import LoginScreen from '~/pages/loginInfo/Login'
import ChooseRole from '~/pages/loginInfo/ChooseRole'
import InputVerifyCode from '~/pages/loginInfo/InputVerifyCode'
import SetPassword from '~/pages/loginInfo/SetPassword'

// 求职者
import Find from '~/pages/requestJob/find/Find'
import Jobs from '~/pages/requestJob/jobs/Jobs'
import HTCompanyPage from '~/pages/requestJob/company/common/page/HTCompanyPage'
import Learn from '~/pages/requestJob/learn/Learn'
import News from '~/pages/requestJob/news/News'
import Mine from '~/pages/requestJob/mine/Mine'

// 招聘者
import Talent from '~/recruitment/Talent/TalentList'
import Me from '~/recruitment/Hr/Me'


// 所有详情页面
import HTCompanyInvestPage from '~/pages/requestJob/company/invest/common/page/HTCompanyInvestPage'
import HTInvestEnterprisePage from '~/pages/requestJob/company/invest/enterprise/common/page/HTInvestEnterprisePage'
import HTInvestEnterpriseDetailPage from '~/pages/requestJob/company/invest/enterprise/detail/page/HTInvestEnterpriseDetailPage'
import HTInvestPersonPage from '~/pages/requestJob/company/invest/person/common/page/HTInvestPersonPage'
import HTInvestPersonDetailPage from '~/pages/requestJob/company/invest/person/detail/page/HTInvestPersonDetailPage'
import HTCompanyProjectPage from '~/pages/requestJob/company/project/common/page/HTCompanyProjectPage'
import HTCompanyProjectDetailPage from '~/pages/requestJob/company/project/detail/page/HTCompanyProjectDetailPage'
import JobExpectations from '~/pages/requestJob/jobs/JobExpectations'
import JobExpectDetail from '~/pages/requestJob/jobs/JobExpectDetail'
import JobSelectZhiwei from '~/pages/requestJob/jobs/JobSelectZhiwei'
import JobSelectIndustry from '~/pages/requestJob/jobs/JobSelectIndustry'
import JobSelectCity from '~/pages/requestJob/jobs/JobSelectCity'
import JobSelectSalary from '~/pages/requestJob/jobs/JobSelectSalary'
import JobSearch from '~/pages/requestJob/jobs/JobSearch'
import JobSearchResult from '~/pages/requestJob/jobs/JobSearchResult'
import FilterView from '~/pages/requestJob/publicView/FilterView'
import JobDetail from '~/pages/requestJob/publicView/JobDetail'
import CompanyDetail from '~/pages/requestJob/publicView/CompanyDetail'
import ReportComplaints from '~/pages/requestJob/publicView/ReportComplaints'
import ReportComplaintsDetail from '~/pages/requestJob/publicView/ReportComplaintsDetail'
import MapNavigation from '~/pages/requestJob/publicView/MapNavigation'
import OnlineRequestJobs from '~/pages/requestJob/publicView/OnlineRequestJobs'
import CompanyAsk from '~/pages/requestJob/publicView/CompanyAsk'
import SubmitCompanyQuestion from '~/pages/requestJob/publicView/SubmitCompanyQuestion'
import CompanyResponse from '~/pages/requestJob/publicView/CompanyResponse'
import CompanySubQuestion from '~/pages/requestJob/publicView/CompanySubQuestion'
import UserInfo from '~/pages/requestJob/mine/UserInfo'
import UserInfoEdit from '~/pages/requestJob/mine/UserInfoEdit'
import EditOnlineResume from '~/pages/requestJob/mine/EditOnlineResume'
import EditPersonalGoods from '~/pages/requestJob/mine/EditPersonalGoods'
import EditPersonalSkills from '~/pages/requestJob/mine/EditPersonalSkills'
import EditWorkExperience from '~/pages/requestJob/mine/EditWorkExperience'
import EditProjectExperience from '~/pages/requestJob/mine/EditProjectExperience'
import EditEducation from '~/pages/requestJob/mine/EditEducation'
import InterviewEvaluation from '~/pages/requestJob/publicView/InterviewEvaluation'
import Interview from '~/pages/requestJob/mine/Interview'
import InterviewAll from '~/pages/requestJob/mine/InterviewAll'
import InterviewDetail from '~/pages/requestJob/mine/InterviewDetail'
import Delivery from '~/pages/requestJob/mine/Delivery'
import MyCollection from '~/pages/requestJob/mine/MyCollection'
import MyFocus from '~/pages/requestJob/mine/MyFocus'
import AttachedResume from '~/pages/requestJob/mine/AttachedResume'
import AttachedResumeRename from '~/pages/requestJob/mine/AttachedResumeRename'
import AttachedResumeUpload from '~/pages/requestJob/mine/AttachedResumeUpload'
import AttachedResumeUploadType from '~/pages/requestJob/mine/AttachedResumeUploadType'
import AttachedResumeComputer from '~/pages/requestJob/mine/AttachedResumeComputer'
import AttachedResumeWeixin from '~/pages/requestJob/mine/AttachedResumeWeixin'
import PrivacySetting from '~/pages/requestJob/mine/PrivacySetting'
import PrivacyName from '~/pages/requestJob/mine/PrivacyName'
import BanCompany from '~/pages/requestJob/mine/BanCompany'
import BanCompanySearch from '~/pages/requestJob/mine/BanCompanySearch'
import MyWallet from '~/pages/requestJob/mine/MyWallet'
import BalanceWithdrawal from '~/pages/requestJob/mine/BalanceWithdrawal'
import WithdrawalResult from '~/pages/requestJob/mine/WithdrawalResult'
import IncomeDetail from '~/pages/requestJob/mine/IncomeDetail'
import JinbiRecharge from '~/pages/requestJob/mine/JinbiRecharge'
import JinbiSignin from '~/pages/requestJob/mine/JinbiSignin'
import JinbiSigninRules from '~/pages/requestJob/mine/JinbiSigninRules'
import JinbiTradeRecord from '~/pages/requestJob/mine/JinbiTradeRecord'
import JinbiTradeRecordDetail from '~/pages/requestJob/mine/JinbiTradeRecordDetail'
import FeedbackAndHelp from '~/pages/requestJob/mine/FeedbackAndHelp'
import FeedbackAndHelpAnswer from '~/pages/requestJob/mine/FeedbackAndHelpAnswer'
import FeedbackAndHelpSubmit from '~/pages/requestJob/mine/FeedbackAndHelpSubmit'
import About from '~/pages/requestJob/mine/About'
import Setting from '~/pages/requestJob/mine/Setting'
import AgreementPrivacy from '~/pages/requestJob/mine/AgreementPrivacy'
import AuthoritySetting from '~/pages/requestJob/mine/AuthoritySetting'
import AccountSetting from '~/pages/requestJob/mine/AccountSetting'
import EmailBinding from '~/pages/requestJob/mine/EmailBinding'
import ChangePassword from '~/pages/requestJob/mine/ChangePassword'
import NotificationSetting from '~/pages/requestJob/mine/NotificationSetting'
import VerifySetting from '~/pages/requestJob/mine/VerifySetting'
import SubmitVerifyResult from '~/pages/requestJob/mine/SubmitVerifyResult'
import GreetSetting from '~/pages/requestJob/mine/GreetSetting'
import GreetEdit from '~/pages/requestJob/mine/GreetEdit'
import HomeLocation from '~/pages/requestJob/mine/HomeLocation'
import MapLocate from '~/pages/requestJob/mine/MapLocate'
import HrPersonalInfo from '~/pages/requestJob/publicView/HrPersonalInfo'
import FindSearch from '~/pages/requestJob/find/FindSearch'
import FindSearchResult from '~/pages/requestJob/find/FindSearchResult'
import JobfairDetail from '~/pages/requestJob/find/JobfairDetail'
import JobfairQuestion from '~/pages/requestJob/find/JobfairQuestion'
import JobfairSubmitSuccess from '~/pages/requestJob/find/JobfairSubmitSuccess'
import NewsSearch from '~/pages/requestJob/news/NewsSearch'
import NewsDetailList from '~/pages/requestJob/news/NewsDetailList'
import NotificationNewJob from '~/pages/requestJob/news/NotificationNewJob'
import AllMessages from '~/pages/requestJob/news/AllMessages'
import VideoComponent from '~/pages/components/VideoComponent'
import MessagePage from '~/pages/requestJob/news/MessagePage'

import companyScreens from '~/recruitment/Company'
import hrScreens from '~/recruitment/Hr'
import interviewScreens from '~/recruitment/Interview'
import jobScreens from '~/recruitment/Job'
import jobFairScreens from '~/recruitment/JobFair'
import talentScreens from '~/recruitment/Talent'
import settingScreens from '~/recruitment/Settings'

var ITEM_LIST = {
	HTGlobalModalPage,
	HTDebugPage,
	HTServerPage,
	HTServerAppendPage,

	
	LoginScreen,
	ChooseRole,
	AgreementPrivacy,
	InputVerifyCode,
	SetPassword,

	
	Find,
	HTCompanyPage,
	Jobs,
	Learn,
	News,
	Mine,

	Talent,
	Me,



	JobExpectations,
	JobExpectDetail,
	JobSelectZhiwei,
	JobSelectIndustry,
	JobSelectCity,
	JobSelectSalary,
	JobSearch,
	JobSearchResult,
	FilterView,
	JobDetail,
	CompanyDetail,
	ReportComplaints,
	ReportComplaintsDetail,
	MapNavigation,
	OnlineRequestJobs,
	CompanyAsk,
	SubmitCompanyQuestion,
	CompanyResponse,
	CompanySubQuestion,
	UserInfo,
	UserInfoEdit,
	EditOnlineResume,
	EditPersonalGoods,
	EditWorkExperience,
	EditProjectExperience,
	EditEducation,
	InterviewEvaluation,
	Interview,
	InterviewAll,
	InterviewDetail,
	Delivery,
	MyCollection,
	MyFocus,
	AttachedResume,
	AttachedResumeRename,
	AttachedResumeUpload,
	AttachedResumeUploadType,
	AttachedResumeComputer,
	AttachedResumeWeixin,
	PrivacySetting,
	PrivacyName,
	BanCompany,
	BanCompanySearch,
	MyWallet,
	BalanceWithdrawal,
	WithdrawalResult,
	IncomeDetail,
	JinbiRecharge,
	JinbiSignin,
	JinbiSigninRules,
	JinbiTradeRecord,
	JinbiTradeRecordDetail,
	FeedbackAndHelp,
	FeedbackAndHelpAnswer,
	FeedbackAndHelpSubmit,
	About,
	Setting,
	AgreementPrivacy,
	AuthoritySetting,
	AccountSetting,
	EmailBinding,
	ChangePassword,
	NotificationSetting,
	VerifySetting,
	SubmitVerifyResult,
	GreetSetting,
	GreetEdit,
	HomeLocation,
	MapLocate,
	HrPersonalInfo,
	FindSearch,
	FindSearchResult,
	JobfairDetail,
	JobfairQuestion,
	JobfairSubmitSuccess,
	NewsSearch,
	NewsDetailList,
	NotificationNewJob,
	AllMessages,
	ChooseRole,
	VideoComponent,
	MessagePage,
	EditPersonalSkills,
	HTCompanyInvestPage,
	HTInvestEnterprisePage,
	HTInvestEnterpriseDetailPage,
	HTInvestPersonPage,
	HTInvestPersonDetailPage,
	HTCompanyProjectPage,
	HTCompanyProjectDetailPage,
	...companyScreens,
	...hrScreens,
	...interviewScreens,
	...jobScreens,
	...jobFairScreens,
	...talentScreens,
	...settingScreens
}


export default class HTRouteRegisterManager {

	static init = () => {
		Object.keys(ITEM_LIST).map(key => {
			let value = ITEM_LIST[key]
			ITEM_LIST[key] = () => value
		})
		HTRouteManager.register(ITEM_LIST)
	}

}