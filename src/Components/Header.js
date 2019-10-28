import React from 'react';  
import { Button} from 'react-bootstrap';
import title from '../Styles/Images/brü.svg';
import '../Styles/HeaderBruStyle.css';

class HeaderBru extends React.Component {
    render() {  
        return ( 
    <div className="Header-root">
            <div className="Home-navbar">
              <img src={title} className="Home-header-logo" style={{ height: '50px', }} alt="logo" />
              <div className="Home-header-txt">
              {this.props.first}
              </div>
              <div className="Home-header-txt">
              {this.props.second}
              </div>
              <div className="Home-header-txt">
              {this.props.third}
              </div>
              <Button style={{ backgroundColor: 'black', width: '90px', height: '40px'}} onClick={this.props.clickHeaderBtn} block bsSize="small" type="button">
                    {this.props.btn}
                  </Button>
            </div>
            </div>
        );
    }
}

export default HeaderBru;