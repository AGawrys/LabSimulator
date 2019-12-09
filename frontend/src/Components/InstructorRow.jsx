import React from 'react';
import { Button, ListGroup, OverlayTrigger, Tooltip} from 'react-bootstrap';
import GeneralConstants from '../utils/GeneralConstants.js';
import RemoveButton from './RemoveButton.jsx';

function InstructorRow(props) {
	const {instructor, onClick, disabled} = props;
	const button = disabled ? null : <RemoveButton onClick={onClick}/>;
	return (
		<ListGroup.Item>
			<div className="listRow">
				<p> {instructor.name}</p>
				{button}
			</div>
		</ListGroup.Item>
	);
}

export default InstructorRow;