import React from 'react';  
import { Button} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';
import title from '../Styles/Images/brü.svg';
import '../Styles/HeaderBruStyle.css';

class HeaderBru extends React.Component {
    render() {
      const navLinks = this.renderLinks();
      return ( 
        <Navbar bg="#69CB9A" className="justify-content-between">
          <Navbar.Brand href={this.props.dashboard}>
            <img src={title} className="Home-header-logo" style={{ height: '50px', }} alt="logo" />
          </Navbar.Brand>
          <Nav>
            {navLinks}
            <Nav.Item>
              {this.props.isLoggedIn ? this.renderSignOutBtn() : this.renderLoginBtn()}
            </Nav.Item>
          </Nav>
        </Navbar>
      );
    }

    renderLinks() {
      if(!this.props.links) {
        return null;
      }
      const navLinks = Object.entries(this.props.links).map(
        link => {
          const [text, route] = link;
          return (
            <Nav.Item>
              <Nav.Link href={route}>{text}</Nav.Link>
            </Nav.Item>
          );
        },
      );
      return navLinks;
    }

    renderLoginBtn() {
      return (
        <Button variant="dark">Login</Button>
      );
    }

    renderSignOutBtn() {
      return (
        <Link to="/"> 
          <Button variant="dark">Sign Out</Button>
        </Link>
      );
    }
}

export default HeaderBru;