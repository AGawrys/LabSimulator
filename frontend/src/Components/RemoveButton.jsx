import React from 'react';
import {Button } from 'react-bootstrap';

function RemoveButton(props) {
	return (
		<Button style={{background: 'transparent', border: 'none'}} onClick={props.onClick}> 
			<i class="fa fa-times fa-lg remove-button" aria-hidden="true"></i>
		</Button>
	);
}

export default RemoveButton;