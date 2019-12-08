import React from 'react';
import {ListGroup, Form, Dropdown, Button} from 'react-bootstrap';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';

const DragHandle = sortableHandle(() => <span className="step-drag" />);
const SortableContainer = sortableContainer(({ children }) => <ListGroup>{children}</ListGroup>);
const SortableStep = sortableElement((props) => {
	const { stepIndex, isActive, onStepClick, onStepNameChange, onCloneStep, onDeleteStep, onFieldBlur, value, isDisabled } = props;
	return (
		<ListGroup.Item active={isActive} key={stepIndex} index={stepIndex} onClick={onStepClick} as="li">
			<DragHandle />
			<div index={stepIndex} className="divider" />
			<Form.Control
				index={stepIndex}
				className="step-name-form"
				onBlur={(e) => onFieldBlur(e, value)}
				onChange={onStepNameChange}
				value={value.toString()}
			/>
			<Dropdown drop={"left"} key={stepIndex} index={stepIndex} className="ellipsis-menu">
			  	<Dropdown.Toggle as={StepMenu}>
			  	</Dropdown.Toggle>
			  	<Dropdown.Menu index={stepIndex}> 
			      	<Dropdown.Item key={stepIndex +"id"} onClick={(e) => onCloneStep(e,value)}>
			      		<i className="fa fa-clone" />&nbsp; Duplicate Step
		      		</Dropdown.Item>
			      	<Dropdown.Divider/>
			      	<Dropdown.Item key={stepIndex} disabled={isDisabled} onClick={(e) => onDeleteStep(e,value)}>
			      		<i className="fa fa-trash-alt" />&nbsp; Delete Step 
			     	</Dropdown.Item>
			    </Dropdown.Menu>
			</Dropdown>
		</ListGroup.Item>
	);
});

const StepMenu = React.forwardRef(({ children, onClick }, ref) => (
	  <i 
		className="fa fa-ellipsis-h fa-lg step-option" 
		aria-hidden="true"
		onClick={(e) => {
			e.cancelBubble = true;
			if (e.stopPropagation) {
				e.stopPropagation();
			}
			onClick(e);
		}}/>
));

export {SortableContainer, SortableStep}