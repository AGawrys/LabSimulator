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
import StirModal from './Components/StirModal.jsx';
import PourModal from './Components/PourModal.jsx';

function App() {
  return (
    <PourModal
    	progressNeeded={10}
    	show={true}
    	onComplete={() => console.log("complete")}
	/>
  );
}
export default App;
