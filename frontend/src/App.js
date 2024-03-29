import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home.jsx';
import Editor from './Pages/Editor.jsx';
import InstructorDashboard from './Pages/InstructorDashboard.jsx';
import StudentDashboard from './Pages/StudentDashboard.jsx';
import NotFound from './Pages/NotFound.jsx';
import OrganizationDashboard from './Pages/OrganizationDashboard.jsx';
import CoursePage from './Pages/CoursePage.jsx';
import Signup from './Pages/Signup.jsx';
import EditorStudent from './Pages/EditorStudent.jsx';
import Routes from './utils/RouteConstants.js';
import GeneralConstants from './utils/GeneralConstants.js';
import PrivateRoute from './Components/PrivateRoute.jsx';
import SearchResults from './Pages/SearchResults.jsx';
import { HotKeys } from 'react-hotkeys';
import LessonPreview from './Pages/LessonPreview.jsx';

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
							path={Routes.INSTRUCTOR_EDITOR + ":lesson_id"} 
							component={withRouter(Editor)} 
							roles={[GeneralConstants.INSTRUCTOR]}/>
						<PrivateRoute exact
							path={Routes.INSTRUCTOR_PREVIEW + ":lesson_id"}
							component={withRouter(LessonPreview)}
							roles={[GeneralConstants.INSTRUCTOR, GeneralConstants.ORGANIZATION]}/>
						<PrivateRoute exact 
							path={Routes.STUDENT_EDITOR + ":course_id" + "/" + ":lesson_id"} 
							component={withRouter(EditorStudent)} 
							roles={[GeneralConstants.STUDENT]} />
						<PrivateRoute exact 
							path={Routes.INSTRUCTOR_DASHBOARD} 
							component={withRouter(InstructorDashboard)} 
							roles={[GeneralConstants.INSTRUCTOR]} />
						<PrivateRoute exact 
							path={Routes.STUDENT_DASHBOARD} 
							component={withRouter(StudentDashboard)} 
							roles={[GeneralConstants.STUDENT]}/>
						<PrivateRoute exact 
							path={Routes.ORGANIZATION_DASHBOARD} 
							component={withRouter(OrganizationDashboard)} 
							roles={[GeneralConstants.ORGANIZATION]}/>
						<PrivateRoute exact 
							path={Routes.COURSE + ":course_id"} 
							component={withRouter(CoursePage)} 
							roles={[GeneralConstants.NO_ROLE]}/>
						<PrivateRoute exact 
							path={Routes.SEARCH + ":query?"}
							component={withRouter(SearchResults)}
							roles={[GeneralConstants.INSTRUCTOR]}/>
						<Route exact path={Routes.SIGN_UP} component={Signup}/>
						<Route component={NotFound} />
					</Switch>
				</div>
			</Router>
		</HotKeys>
  );
}
export default App;
