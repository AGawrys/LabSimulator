import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home.js';
import Editor from './Pages/Editor.js';
import EditorStudent from './Pages/EditorStudent.js';
import InstructorDashboard from './Pages/InstructorDashboard.js';
import StudentDashboard from './Pages/StudentDashboard.js';
import NotFound from './Pages/NotFound';
import AccountSetting from './Pages/AccountSetting.js';
import OrganizationDashboard from './Pages/OrganizationDashboard.js';
import CoursePage from './Pages/CoursePage.jsx';
import Signup from './Pages/Signup.js';

function App() {
  return (
    <Router>
				<div className="App">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/Home" component={Home} />
						<Route exact path="/Editor" component={Editor} />
						<Route exact path="/StudentEditor" component={EditorStudent} />
						<Route exact path="/InstructorDashboard" component={InstructorDashboard} />
						<Route exact path="/StudentDashboard" component={StudentDashboard} />
						<Route exact path="/AccountSetting" component={AccountSetting} />
						<Route exact path="/OrganizationDashboard" component={OrganizationDashboard}/>
						<Route exact path="/course/" component={CoursePage}/>
						<Route exact path="/signup/" component={Signup}/>
						<Route component={NotFound} />
					</Switch>
				</div>
			</Router>
  );
}
export default App;
