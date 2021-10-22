import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import Find from '../../pages/requestJob/find/Find'
import Jobs from '../../pages/requestJob/jobs/Jobs'
import Learn from '../../pages/requestJob/learn/Learn'
import News from '../../pages/requestJob/news/News'
import Mine from '../../pages/requestJob/mine/Mine'
import Tabs from './tabs/index'
import JobExpectations from '../../pages/requestJob/jobs/JobExpectations'
import JobExpectDetail from '../../pages/requestJob/jobs/JobExpectDetail'
import JobSelectZhiwei from '../../pages/requestJob/jobs/JobSelectZhiwei'
import JobSelectIndustry from '../../pages/requestJob/jobs/JobSelectIndustry'
import JobSelectCity from '../../pages/requestJob/jobs/JobSelectCity'
import JobSelectSalary from '../../pages/requestJob/jobs/JobSelectSalary'
import JobSearch from '../../pages/requestJob/jobs/JobSearch'
import JobSearchResult from '../../pages/requestJob/jobs/JobSearchResult'
import FilterView from '../../pages/requestJob/publicView/FilterView'
import JobDetail from '../../pages/requestJob/publicView/JobDetail'
import CompanyDetail from '../../pages/requestJob/publicView/CompanyDetail'
import ReportComplaints from '../../pages/requestJob/publicView/ReportComplaints'
import ReportComplaintsDetail from '../../pages/requestJob/publicView/ReportComplaintsDetail'
import MapNavigation from '../../pages/requestJob/publicView/MapNavigation'
import OnlineRequestJobs from '../../pages/requestJob/publicView/OnlineRequestJobs'
import CompanyAsk from '../../pages/requestJob/publicView/CompanyAsk'
import SubmitCompanyQuestion from '../../pages/requestJob/publicView/SubmitCompanyQuestion'
import CompanyResponse from '../../pages/requestJob/publicView/CompanyResponse'
import CompanySubQuestion from '../../pages/requestJob/publicView/CompanySubQuestion'
import UserInfo from '../../pages/requestJob/mine/UserInfo'
import EditOnlineResume from '../../pages/requestJob/mine/EditOnlineResume'
import EditPersonalGoods from '../../pages/requestJob/mine/EditPersonalGoods'
import EditWorkExperience from '../../pages/requestJob/mine/EditWorkExperience'
import EditProjectExperience from '../../pages/requestJob/mine/EditProjectExperience'
import EditEducation from '../../pages/requestJob/mine/EditEducation'
import InterviewEvaluation from '../../pages/requestJob/publicView/InterviewEvaluation'
import Interview from '../../pages/requestJob/mine/Interview'
import InterviewAll from '../../pages/requestJob/mine/InterviewAll'
import InterviewDetail from '../../pages/requestJob/mine/InterviewDetail'
import Delivery from '../../pages/requestJob/mine/Delivery'
import MyCollection from '../../pages/requestJob/mine/MyCollection'
import MyFocus from '../../pages/requestJob/mine/MyFocus'
import AttachedResume from '../../pages/requestJob/mine/AttachedResume'
import AttachedResumeRename from '../../pages/requestJob/mine/AttachedResumeRename'
import AttachedResumeUpload from '../../pages/requestJob/mine/AttachedResumeUpload'
import AttachedResumeUploadType from '../../pages/requestJob/mine/AttachedResumeUploadType'
import AttachedResumeComputer from '../../pages/requestJob/mine/AttachedResumeComputer'
import AttachedResumeWeixin from '../../pages/requestJob/mine/AttachedResumeWeixin'
import PrivacySetting from '../../pages/requestJob/mine/PrivacySetting'
import PrivacyName from '../../pages/requestJob/mine/PrivacyName'
import BanCompany from '../../pages/requestJob/mine/BanCompany'
import BanCompanySearch from '../../pages/requestJob/mine/BanCompanySearch'
import MyWallet from '../../pages/requestJob/mine/MyWallet'
import BalanceWithdrawal from '../../pages/requestJob/mine/BalanceWithdrawal'
import WithdrawalResult from '../../pages/requestJob/mine/WithdrawalResult'
import IncomeDetail from '../../pages/requestJob/mine/IncomeDetail'
import JinbiRecharge from '../../pages/requestJob/mine/JinbiRecharge'
import JinbiSignin from '../../pages/requestJob/mine/JinbiSignin'
import JinbiSigninRules from '../../pages/requestJob/mine/JinbiSigninRules'
import JinbiTradeRecord from '../../pages/requestJob/mine/JinbiTradeRecord'
import JinbiTradeRecordDetail from '../../pages/requestJob/mine/JinbiTradeRecordDetail'
import FeedbackAndHelp from '../../pages/requestJob/mine/FeedbackAndHelp'
import FeedbackAndHelpAnswer from '../../pages/requestJob/mine/FeedbackAndHelpAnswer'
import FeedbackAndHelpSubmit from '../../pages/requestJob/mine/FeedbackAndHelpSubmit'
import About from '../../pages/requestJob/mine/About'
import Setting from '../../pages/requestJob/mine/Setting'
import AgreementPrivacy from '../../pages/requestJob/mine/AgreementPrivacy'
import AuthoritySetting from '../../pages/requestJob/mine/AuthoritySetting'
import AccountSetting from '../../pages/requestJob/mine/AccountSetting'
import ChangePhone from '../../pages/requestJob/mine/ChangePhone'
import EmailBinding from '../../pages/requestJob/mine/EmailBinding'
import ChangePassword from '../../pages/requestJob/mine/ChangePassword'
import NotificationSetting from '../../pages/requestJob/mine/NotificationSetting'
import VerifySetting from '../../pages/requestJob/mine/VerifySetting'
import SubmitVerifyResult from '../../pages/requestJob/mine/SubmitVerifyResult'
import GreetSetting from '../../pages/requestJob/mine/GreetSetting'
import GreetEdit from '../../pages/requestJob/mine/GreetEdit'
import HomeLocation from '../../pages/requestJob/mine/HomeLocation'
import MapLocate from '../../pages/requestJob/mine/MapLocate'
import HrPersonalInfo from '../../pages/requestJob/publicView/HrPersonalInfo'
import FindSearch from '../../pages/requestJob/find/FindSearch'
import FindSearchResult from '../../pages/requestJob/find/FindSearchResult'
import JobfairDetail from '../../pages/requestJob/find/JobfairDetail'
import JobfairQuestion from '../../pages/requestJob/find/JobfairQuestion'
import JobfairSubmitSuccess from '../../pages/requestJob/find/JobfairSubmitSuccess'

type TRouterParams = {
  Find: any,
  Jobs: any,
  Learn: any,
  News: any,
  Mine: any,
  JobExpectations: any,
  JobExpectDetail: any,
  JobSelectZhiwei: { selectJobTypeCallback: (selectJobType: any) => void }
  JobSelectIndustry: { selectJobIndustryCallback: (selectJobIndustry: any) => void }
  JobSelectCity: { selectJobCityCallback: (selectJobIndustry: any) => void }
  JobSelectSalary: { selectJobSalaryCallback: (selectJobSalary: any) => void }
  JobSearch: any
  JobSearchResult: any
  FilterView: { filterMode: number, filterResultCallback: (res: any) => void }
  JobDetail: any,
  CompanyDetail: any,
  ReportComplaints: any,
  ReportComplaintsDetail: { type: string },
  MapNavigation: any,
  OnlineRequestJobs: { title: string },
  CompanyAsk: any,
  SubmitCompanyQuestion: any,
  CompanyResponse: any,
  CompanySubQuestion: any,
  UserInfo: any,
  EditOnlineResume: any,
  EditPersonalGoods: { personalGoods: string, personalGoodsCallback: (editContents: string) => void },
  EditWorkExperience: { workItemCallback: (workItem: any) => void, workItem?: any, }
  EditProjectExperience: { projectItemCallback: (projectItem: any) => void, projectItem?: any, }
  EditEducation: { educationItemCallback: (educationItem: any) => void, educationItem?: any, },
  InterviewEvaluation: any,
  Interview: any,
  InterviewAll: any,
  InterviewDetail: any,
  Delivery: { pageType: number },
  MyCollection: any,
  MyFocus: any,
  AttachedResume: any,
  AttachedResumeRename: any,
  AttachedResumeUpload: any,
  AttachedResumeUploadType: any,
  AttachedResumeComputer: any,
  AttachedResumeWeixin: any,
  PrivacySetting: any,
  PrivacyName: any,
  BanCompany: any,
  BanCompanySearch: any,
  MyWallet: any,
  BalanceWithdrawal: any,
  WithdrawalResult: any,
  IncomeDetail: any,
  JinbiRecharge: any,
  JinbiSignin: any,
  JinbiSigninRules: any,
  JinbiTradeRecord: any,
  JinbiTradeRecordDetail: { recordeDetail: any },
  FeedbackAndHelp: any,
  FeedbackAndHelpAnswer: { feedbackItem: any },
  FeedbackAndHelpSubmit: any,
  About: any,
  Setting: any,
  AgreementPrivacy: { pageType: number } // 1: 用户协议 2: 隐私政策
  AuthoritySetting: any,
  AccountSetting: any,
  ChangePhone: any,
  EmailBinding: { email: string },
  ChangePassword: any,
  NotificationSetting: any,
  VerifySetting: { name: string, idNumber: string }
  SubmitVerifyResult: any
  GreetSetting: any
  GreetEdit: { greetItem: any }
  HomeLocation: any
  MapLocate: any
  HrPersonalInfo: any
  FindSearch: { searchType: number } // 0-找公司; 1-找招聘会
  FindSearchResult: any
  JobfairDetail: any
  JobfairQuestion: any
  JobfairSubmitSuccess: any
}

export type GenProps<RouteName extends keyof TRouterParams> = {
  route: RouteProp<TRouterParams, RouteName>
  navigation: StackNavigationProp<TRouterParams, RouteName>
}

export default class RouterStacks {
  /**
   * 路由栈
   */

  public static readonly stacks: {
    [key: string]: any
  } = {
      Tabs,
      Find,
      Jobs,
      Learn,
      News,
      Mine,
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
      ChangePhone,
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
    }
}
