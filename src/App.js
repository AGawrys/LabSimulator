import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home.js';
import Editor from './Pages/Editor.js';
import EditorStudent from './Pages/EditorStudent.js';

function App() {
  return (
    <Router>
				<div className="App">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/Home" component={Home} />
						<Route exact path="/Editor" component={Editor} />
						<Route exact path="/StudentEditor" component={EditorStudent} />
					</Switch>
				</div>
			</Router>
  );
}

export default App;