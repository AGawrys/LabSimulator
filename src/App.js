import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home.js';
import Editor from './Pages/Editor.js';
import TeacherDashboard from './Pages/TeacherDashboard.js';
import StudentDashboard from './Pages/StudentDashboard.js';
import NotFound from './Pages/NotFound';
import AccountSetting from './Pages/AccountSetting.js';

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/Editor" component={Editor} />
					<Route exact path="/TeacherDashboard" component={TeacherDashboard} />
					<Route exact path="/StudentDashboard" component={StudentDashboard} />
					<Route exact path="/AccountSetting" component={AccountSetting} />

					<Route component={NotFound} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
