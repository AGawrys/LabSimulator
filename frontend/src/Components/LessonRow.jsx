import React, { Component } from 'react';
import { Button, Modal, Form, Row, ListGroup } from 'react-bootstrap';

function LessonRow(props) {
	const {lesson, onClick} = props;
	return (
		<ListGroup.Item>
			<h5> {lesson.title} </h5>
			<button className="deleteCourseButton buttonRound btn-danger" onClick={onClick}>
				-
			</button>
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

