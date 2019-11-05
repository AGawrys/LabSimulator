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

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/Editor" component={Editor} />
					<Route exact path="/InstructorDashboard" component={InstructorDashboard} />
					<Route exact path="/StudentDashboard" component={StudentDashboard} />
					<Route exact path="/AccountSetting" component={AccountSetting} />
					<Route exact path="/OrganizationDashboard" component={OrganizationDashboard}/>
					<Route exact path="/course/" component={CoursePage}/>
					<Route component={NotFound} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
