import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Routes from '../utils/RouteConstants.js';

function InstructorRow(props) {
	const {course} = props;
	const {courseId, name} = course;
	return (
		<ListGroup.Item action onClick={() => {
			const newRoute = Routes.COURSE + courseId;
			props.history.push(newRoute);	
		}}>
			<div className="listRow">
				<p> {name}</p>
			</div>
		</ListGroup.Item>
	);
}

export default InstructorRow;