import React from 'react';  
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import title from '../Styles/Images/brü.svg';
import '../Styles/HeaderBruStyle.css';

class HeaderBru extends React.Component {
    render() {  
        return ( 
    <div className="Header-root">
            <div className="Home-navbar" style={{ backgroundColor:this.props.color }}>
              <img src={title} className="Home-header-logo" style={{ height: '50px', }} alt="logo" />
              <Link to={this.props.link1} className="link">
              <div className="Home-header-txt">
              {this.props.first}
              </div>
			</Link>
            <Link to={this.props.link2} className="link">
              <div className="Home-header-txt">
              {this.props.second}
              </div>
              </Link>
              <Link to={this.props.link3} className="link">
              <div className="Home-header-txt">
              {this.props.third}
              </div>
              </Link>
              <Button style={{ backgroundColor: 'black', width: '90px', height: '40px'}} onClick={this.props.clickHeaderBtn} block bsSize="small" type="button">
                    {this.props.btn}
                  </Button>
            </div>
            </div>
        );
    }
}

export default HeaderBru;