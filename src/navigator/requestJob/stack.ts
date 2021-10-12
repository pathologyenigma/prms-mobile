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
import Search from '../../pages/requestJob/find/Search'
import SearchResult from '../../pages/requestJob/find/SearchResult'
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
  Search: any
  SearchResult: any
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
  IncomeDetail: any
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
      Search,
      SearchResult,
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
      IncomeDetail
    }
}
