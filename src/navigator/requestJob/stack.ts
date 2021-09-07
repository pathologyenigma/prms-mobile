import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import Find from '../../pages/requestJob/find/Find'
import Jobs from '../../pages/requestJob/jobs/Jobs'
import Learn from '../../pages/requestJob/learn/Learn'
import News from '../../pages/requestJob/news/News'
import Mine from '../../pages/requestJob/mine/Mine'
import LoginScreen from '../../pages/loginInfo/Login'
import ForgetPassword from '../../pages/loginInfo/ForgetPassword'
import ChooseRole from '../../pages/loginInfo/ChooseRole'
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

type TRouterParams = {
  Find: any,
  Jobs: any,
  Learn: any,
  LoginScreen: any,
  ForgetPassword: any,
  ChooseRole: any,
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
      LoginScreen,
      ForgetPassword,
      ChooseRole,
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
      ReportComplaintsDetail
    }
}
