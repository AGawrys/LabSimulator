import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home.js';
import Editor from './Pages/Editor.js';
import TeacherDashboard from './Pages/TeacherDashboard.js';

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/Editor" component={Editor} />
					<Route exact path="/TeacherDashboard" component={TeacherDashboard} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
