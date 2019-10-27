import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home.js';
import Editor from './Pages/Editor.js';

function App() {
  return (
    <Router>
				<div className="App">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/Editor" component={Editor} />
					</Switch>
				</div>
			</Router>
  );
}

export default App;