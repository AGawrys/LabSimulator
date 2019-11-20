const STUDENT = 'student';
const INSTRUCTOR = 'instructor';
const EDITOR = 'editor';
const DASHBOARD = 'dashboard';
const ORGANIZATION = 'organization';

const Routes = {
	DEFAULT: '/',
	INSTRUCTOR_EDITOR: '/' + INSTRUCTOR + '/' + EDITOR,
	STUDENT_EDITOR: '/' + STUDENT + '/' + EDITOR,
	INSTRUCTOR_DASHBOARD: '/' + INSTRUCTOR + '/' + DASHBOARD,
	STUDENT_DASHBOARD: '/' + STUDENT + '/' + DASHBOARD,
	ACCOUNT: '/account',
	ORGANIZATION_DASHBOARD: '/' + ORGANIZATION + '/' + DASHBOARD,
	COURSE: '/course',
	SIGN_UP: '/signup',
	SERVER: 'http://localhost:8080/',
	NOT_FOUND: '/404',
};

export default Routes;
