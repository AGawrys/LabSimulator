import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import Routes from '../utils/RouteConstants.js';
import RemoveButton from './RemoveButton.jsx';

function LessonRow(props) {
	const {lesson, onClick, canDelete} = props;
	const {name, lessonId} = lesson;
	const deleteButton = canDelete ? (
			<RemoveButton onClick={onClick}/>
		) : null;

	return (
		<ListGroup.Item action onClick={() => {
			const newRoute = Routes.INSTRUCTOR_EDITOR + lessonId;
			props.history.push(newRoute);	
		}}>
			<div className="listRow">
				<p> {name} </p>
				{deleteButton}
			</div>
		</ListGroup.Item>
	);
}

export default LessonRow;

/*
	<li className="courseListing">
		<h5> Maple Pecan Latte </h5>
		<h6> 3/4 Students </h6>
		<button
			className="deleteCourseButton buttonRound btn-danger"
			onClick={() => {
				this.setState({ showConfirmDeleteModal: true });
			}}
		>
			-
		</button>
		<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
			<ol>
				<li> James Angeles (Completed) 5 Attempts </li>
				<li> Steven Kuang </li>
				<li> Agnieszka Gawrys (Completed) 2 Attempts</li>
				<li> Jason Dong (Completed) 3 Attempts</li>
			</ol>
		</Collapsible>
	</li>
*/

