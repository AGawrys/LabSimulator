import React from 'react';  
import Collapsible from 'react-collapsible';  
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

class CollapsibleRow extends React.Component {

    constructor(props) {
        super(props);
        this.listItems = props.items.map(item => {
            return (
                <li>
                    {item}
                </li>
            );
        });
    }


    render() {  
        return (
            <Nav className="justify-content-between">
                <li>
                    {this.props.title}
                    <Collapsible triggerWhenOpen="Collapse" trigger="expand">
                        <ol>
                            {this.listItems}
                        </ol>
                    </Collapsible>
                </li>
            </Nav>
        );  
    }  
}  
export default CollapsibleRow;
