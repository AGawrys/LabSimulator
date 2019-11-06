import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import 'react-sticky-header/styles.css';
import coffeeProcess from '../Styles/Images/coffeeProcess.gif';
import { Redirect, Link } from 'react-router-dom';
import Popup from '../Components/Popup.jsx';
import HeaderBru from '../Components/Header.jsx';
import Routes from '../utils/RouteConstants.js';
import '../App.css';
import '../Styles/HomeStyle.css';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginPopup: false,
			loginbtn: 'Login'
		};
	}

    handleLogin() {
       return <Redirect exact to="/Editor" />;
    }

    togglePopup() {  
      let login = "Login";
      if(!this.state.showPopup) { login = "Cancel"; }
      this.setState({  
           showPopup: !this.state.showPopup, 
           loginbtn: login,
           errorLogin: "Invalid Credentials"
      });  
    } 
    
    render() {
      return (
        <>
          <HeaderBru home={Routes.DEFAULT}/>
          <section>
            {this.state.showPopup ?  
            <Popup  
              text='Click "Close Button" to hide popup'  
              closePopup={this.togglePopup.bind(this)}  
              errorMessage={this.state.errorLogin}
              handleSubmit={this.handleLogin.bind(this)}
            />  : null  } 
            <div className="Home-page">
            <div className="App">
            
              <header className="Home-header">
                <div className="Home-main-txt">
                <h2 className="Home-main-items">
                  Barista Labratory
                </h2>
                <h1 className="Home-main-items">
                  Your next orientation, online
                </h1>
                <p className="Home-main-items">
                Lorem ipsum dolor sit amet, sapien etiam, nunc amet dolor ac odio mauris justo. Luctus arcu, urna praesent at id quisque ac. Arcu es massa vestibulum malesuada, integer vivamus elit eu mauris eus, cum eros quis aliquam wisi..
                </p>
                <Link to="/Signup" className="link">
                <div className="Home-main-items">
                  Don't have an account? <code> Sign up!</code>
                </div>
                </Link>
                </div>
                <img src={coffeeProcess} className="App-logo" alt="logo" />
              </header>
            </div>
            <div className="Home-about">
              <h1> About something something</h1>
            </div>
            </div>
          </section>
        </>
      );
    }
}
export default Home;
