export type Education =
  | 'LessThanPrime'
  | 'Primary'
  | 'Junior'
  | 'High'
  | 'JuniorCollege'
  | 'RegularCollege'
  | 'Postgraduate'
  | 'Doctor'

export type FullTime = 'Full' | 'Part' | 'InternShip'

export type JobStatus = 'NotPublishedYet' | 'InRecruitment' | 'OffLine'

export type ResumeJobStatus =
  | 'NoJobButNoJob'
  | 'NoJobButWantJob'
  | 'OnTheJob'
  | 'OnTheJobButLookingForAJob'
  | 'GraduatingStudent'

export type EnterpriseNature =
  | 'ForeignVentures'
  | 'ForeignFundedEnterprises'
  | 'PrivateEnterprise'
  | 'StateOwnedEnterprises'
  | 'Extra'

export type EnterpriseSize =
  | 'LessThanFifteen'
  | 'FifteenToFifty'
  | 'FiftyToOneHundredFifty'
  | 'OneHundredFiftyToFiveHundreds'
  | 'FiveHundredsToTwoThousands'
  | 'MoreThanTwoThousands'
