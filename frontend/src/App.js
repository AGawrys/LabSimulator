import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
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
import GeneralConstants from './utils/GeneralConstants.js';
import PrivateRoute from './Components/PrivateRoute.jsx';
import SearchResults from './Pages/SearchResults.jsx';
import { HotKeys } from 'react-hotkeys';

const keyMap = {
	UNDO: ["command+z", "ctrl+z"],
	REDO: ["command+z+shift", "ctrl+shift+z"],
};

function App() {
  return (
  		<HotKeys keyMap={keyMap}>
    		<Router>
				<div className="App">
					<Switch>
						<Route exact path={Routes.DEFAULT} component={Home} />
						<PrivateRoute exact 
							path={Routes.INSTRUCTOR_EDITOR} 
							component={withRouter(Editor)} 
							role={GeneralConstants.INSTRUCTOR}/>
						<PrivateRoute exact 
							path={Routes.INSTRUCTOR_EDITOR + ":lesson_id"} 
							component={withRouter(Editor)} 
							role={GeneralConstants.INSTRUCTOR}/>
						<PrivateRoute exact 
							path={Routes.STUDENT_EDITOR + ":course_id" + "/" + ":lesson_id"} 
							component={withRouter(EditorStudent)} 
							role={GeneralConstants.STUDENT} />
						<PrivateRoute exact 
							path={Routes.INSTRUCTOR_DASHBOARD} 
							component={withRouter(InstructorDashboard)} 
							role={GeneralConstants.INSTRUCTOR} />
						<PrivateRoute exact 
							path={Routes.STUDENT_DASHBOARD} 
							component={withRouter(StudentDashboard)} 
							role={GeneralConstants.STUDENT}/>
						<PrivateRoute exact 
							path={Routes.ACCOUNT} 
							component={withRouter(AccountSetting)} 
							role={GeneralConstants.NO_ROLE} />
						<PrivateRoute exact 
							path={Routes.ORGANIZATION_DASHBOARD} 
							component={withRouter(OrganizationDashboard)} 
							role={GeneralConstants.ORGANIZATION}/>
						<PrivateRoute exact 
							path={Routes.COURSE + ":course_id"} 
							component={withRouter(CoursePage)} 
							role={GeneralConstants.NO_ROLE}/>
						<PrivateRoute exact 
							path={Routes.SEARCH + ":query?"}
							component={withRouter(SearchResults)}
							role={GeneralConstants.INSTRUCTOR}/>
						<Route exact path={Routes.SIGN_UP} component={Signup}/>
						<Route component={NotFound} />
					</Switch>
				</div>
			</Router>
		</HotKeys>
  );
}
export default App;
