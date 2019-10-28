import React from 'react';  
import '../Styles/popupStyle.css';  
import { Button, FormGroup, FormControl, FormLabel, ControlLabel } from 'react-bootstrap';

class Popup extends React.Component {  
  render() {  
    return (  
    <div className='popup'>  
    <div className='popup\_inner'>  
    <form onSubmit={this.props.handleSubmit}>
            <FormGroup controlId="formBasicText" bsSize="large">
                <FormControl
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.904)", }}
                    type="text"
                    placeholder="Username"
                    onChange={(e) => this.handleCredentialChange(e, 'username')} /* NO METHOD YET */
                    required
                />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
                <FormControl
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.904)", }}
                    onChange={(e) => this.handleCredentialChange(e, 'password')} /* NO METHOD YET */
                    placeholder="Password"
                    required
                />
            </FormGroup>
            {/* <p style={{ color: 'red' }}> {this.props.errorMessage}</p> TODO ADD ERROR MSG*/}
            <Button style={{ backgroundColor: 'black' }} block bsSize="large" type="submit">
                Login
            </Button>
        </form> 
    </div>  
    </div>  
    );  
}  
}  
export default Popup;