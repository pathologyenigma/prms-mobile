import InterviewSchedule from './InterviewSchedule'
import AllInterview from './AllInterview'
import InterviewDetail from './InterviewDetail'
import InterviewGrading from './InterviewGrading'
import InterviewResume from './InterviewResume/InterviewResume'
import InterviewInvite from './InterviewInvite/InterviewInvite'
import InterviewJobList from './InterviewJobList/InterviewJobList'

const screens = {
	InterviewSchedule,
	AllInterview,
	EmployerInterviewDetail: InterviewDetail,
	InterviewGrading,
	InterviewResume,
	InterviewInvite,
	InterviewJobList,
}

export default screens
