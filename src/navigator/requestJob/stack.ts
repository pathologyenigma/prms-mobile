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

type TRouterParams = {
  Find: any,
  Jobs: any,
  Learn: any,
  News: any,
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
    }
}
