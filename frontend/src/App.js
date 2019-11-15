import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home.jsx';
import Editor from './Pages/Editor.jsx';
import InstructorDashboard from './Pages/InstructorDashboard.jsx';
import StudentDashboard from './Pages/StudentDashboard.jsx';
import NotFound from './Pages/NotFound.jsx';
import AccountSetting from './Pages/AccountSetting.jsx';
import OrganizationDashboard from './Pages/OrganizationDashboard.jsx';
import CoursePage from './Pages/CoursePage.jsx';
import Signup from './Pages/Signup.jsx';
import EditorStudent from './Pages/EditorStudent.jsx';
import Routes from './utils/RouteConstants.js';
import ShakeModalPage from './Pages/ShakeModalPage.jsx';

function App() {
  return (
    <Router>
				<div className="App">
					<Switch>
						<Route exact path={Routes.DEFAULT} component={Home} />
						<Route exact path={Routes.INSTRUCTOR_EDITOR} component={Editor} />
						<Route exact path={Routes.STUDENT_EDITOR} component={EditorStudent} />
						<Route exact path={Routes.INSTRUCTOR_DASHBOARD} component={InstructorDashboard} />
						<Route exact path={Routes.STUDENT_DASHBOARD} component={StudentDashboard} />
						<Route exact path={Routes.ACCOUNT} component={AccountSetting} />
						<Route exact path={Routes.ORGANIZATION_DASHBOARD} component={OrganizationDashboard}/>
						<Route exact path={Routes.COURSE} component={CoursePage}/>
						<Route exact path={Routes.SIGN_UP} component={Signup}/>
						<Route exact path={"/shake"} component={ShakeModalPage}/>
						<Route component={NotFound} />
					</Switch>
				</div>
			</Router>
  );
}
export default App;
