const STUDENT = 'student';
const INSTRUCTOR = 'instructor';
const EDITOR = 'editor';
const DASHBOARD = 'dashboard';
const ORGANIZATION = 'organization';

const Routes = {
	DEFAULT: '/',
	INSTRUCTOR_EDITOR: '/' + INSTRUCTOR + '/' + EDITOR + '/',
	STUDENT_EDITOR: '/' + STUDENT + '/' + EDITOR + '/',
	INSTRUCTOR_DASHBOARD: '/' + INSTRUCTOR + '/' + DASHBOARD,
	INSTRUCTOR_PREVIEW: '/' + INSTRUCTOR + '/' + 'preview/',
	STUDENT_DASHBOARD: '/' + STUDENT + '/' + DASHBOARD,
	ACCOUNT: '/account',
	ORGANIZATION_DASHBOARD: '/' + ORGANIZATION + '/' + DASHBOARD,
	COURSE: '/course/',
	SIGN_UP: '/signup',
	SEARCH: '/search/',
	SERVER: 'http://ec2-18-220-246-194.us-east-2.compute.amazonaws.com:8080/',
	NOT_FOUND: '/404'
};

export default Routes;
