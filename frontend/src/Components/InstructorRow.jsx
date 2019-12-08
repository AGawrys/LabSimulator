import React from 'react';
import { Button, ListGroup, OverlayTrigger, Tooltip} from 'react-bootstrap';
import GeneralConstants from '../utils/GeneralConstants.js';
import RemoveButton from './RemoveButton.jsx';

function InstructorRow(props) {
	const {instructor, onClick, disabled} = props;
	const button = disabled ? <CannotDeleteButton/> : <RemoveButton onClick={onClick}/>;
	return (
		<ListGroup.Item>
			<div className="listRow">
				<p> {instructor.name}</p>
				{button}
			</div>
		</ListGroup.Item>
	);
}

function CannotDeleteButton(props) {
	return (
		<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{GeneralConstants.CANNOT_REMOVE_INSTRUCTOR_MESSAGE}</Tooltip>}>
		  <span className="d-inline-block">
		    <Button className="buttonRound btn-danger" disabled style={{ pointerEvents: 'none' }}>
		      -
		    </Button>
		  </span>
		</OverlayTrigger>
	);
}
export default InstructorRow;