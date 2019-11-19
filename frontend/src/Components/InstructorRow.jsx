import React, { Component } from 'react';
import { Button, Modal, Form, Row, ListGroup } from 'react-bootstrap';

function InstructorRow(props) {
	const {instructor, onClick} = props;
	return (
		<ListGroup.Item>
			<div className="listRow">
				<p> {instructor.name}</p>
				<button className="buttonRound btn-danger" onClick={onClick}>
					-
				</button>
			</div>
		</ListGroup.Item>
	);
}

export default InstructorRow;