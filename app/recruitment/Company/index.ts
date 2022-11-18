import HrAuthentication from './HrAuthentication'
import CompanyAuthentication from './CompanyAuthentication'
import CompanyFullName from './CompanyFullName'
import CompanyAuthenticationMethod from './CompanyAuthenticationMethod'
import CompanyAuthenticationByColleague from './CompanyAuthenticationByColleague'
import CompanyAuthenticationByColleagueWithSmsInput from './CompanyAuthenticationByColleagueWithSmsInput'
import CompanyAuthenticationByLicense from './CompanyAuthenticationByLicense'
import CompanyAuditResult from './CompanyAuditResult'
import CompanyDetail from './CompanyDetail'
import ChangeCompany from './ChangeCompany'

const screens = {
  HrAuthentication,
  CompanyAuthentication,
  CompanyFullName,
  CompanyAuthenticationMethod,
  CompanyAuthenticationByColleague,
  CompanyAuthenticationByColleagueWithSmsInput,
  CompanyAuthenticationByLicense,
  CompanyAuditResult,
  EmployerCompanyDetail: CompanyDetail,
  ChangeCompany,
}

export default screens
