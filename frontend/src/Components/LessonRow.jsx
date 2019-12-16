import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import Routes from '../utils/RouteConstants.js';
import RemoveButton from './RemoveButton.jsx';

function LessonRow(props) {
	const {lesson, onDelete, canDelete, onLessonClick} = props;
	const {name, lessonId} = lesson;
	const deleteButton = canDelete ? (
			<RemoveButton onClick={onDelete}/>
		) : null; 

	return (
		<ListGroup.Item action onClick={onLessonClick}>
			<div className="listRow">
				<p> {name} </p>
				{deleteButton}
			</div>
		</ListGroup.Item>
	);
}

export default LessonRow;
