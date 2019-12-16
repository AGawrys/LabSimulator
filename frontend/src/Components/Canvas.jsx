import React from 'react';
import { Droppable } from 'react-drag-and-drop';
import { Form } from 'react-bootstrap';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { CONTEXT_MENU_ID } from '../utils/EditorConstants.js';
import { swapElements } from '../LilacArray.js';
import { determineToolPosition } from '../utils/CanvasUtils.js';
import Position from '../Objects/Position.js';
import Tool from './Tool.jsx';
import ToolEditor from './ToolEditor.jsx';
import { isCollisionDetected } from '../utils/CanvasUtils.js';

class Canvas extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTool: null,
			isEditingTool: false,
			copiedTool: null
		};

		this.setCurrentTool = this.setCurrentTool.bind(this);
		this.resetCurrentTool = this.resetCurrentTool.bind(this);
		this.onClickEdit = this.onClickEdit.bind(this);
		this.onHide = this.onHide.bind(this);
	}

	setCurrentTool(tool) {
		this.setState({
			currentTool: tool
		});
	}

	resetCurrentTool() {
		if (this.state.currentTool) {
			this.setState({
				currentTool: null
			});
		}
	}

	onClickEdit() {
		this.setState({
			isEditingTool: true
		});
	}

	onHide() {
		this.setState({
			isEditingTool: false
		});
	}

	onDrop = (currentTool) => {
		const { tools } = this.props;
		const overlappingTools = tools.filter((tool) => isCollisionDetected(tool, currentTool));
		if (overlappingTools.length != 0) {
			this.props.onDrop(currentTool, overlappingTools);
		}
	};

	onDeleteTool = () => {
		const { tools, onUpdateTools } = this.props;
		const index = tools.indexOf(this.state.currentTool);
		tools.splice(index, 1);
		for (let i = 0; i < tools.length; i++) {
			tools[i].layer = i;
		}
		onUpdateTools(tools);
		this.setState({ currentTool: null });
	};

	onCopyTool = () => {
		this.props.setCopiedTool(this.state.currentTool.clone());
	};

	onPasteTool = () => {
		const { copiedTool, tools, setCopiedTool, onUpdateTools } = this.props;
		const newCopy = copiedTool.clone(); // must deep copy again so subsequential pastes will not have properties effected

        const {x,y} = determineToolPosition(copiedTool.width,copiedTool.height);
        const position = new Position(x,y);
        copiedTool.layer = tools.length;
        copiedTool.position = position;
        tools.push(copiedTool);

		onUpdateTools(tools);
		setCopiedTool(newCopy);
	};
	openStudentActions = () => {
		console.log(' Open menu from Canvas');
		const { currentTool } = this.state;
		this.props.openActionMenu(currentTool);
	};

	onClickMoveUp = () => {
		const { currentTool } = this.state;
		const { tools, onUpdateTools } = this.props;
		const index = tools.indexOf(currentTool);
		const newTools = swapElements(tools, index, index + 1);
		newTools[index].layer += 1;
		newTools[index + 1].layer -= 1;
		onUpdateTools(newTools);
	};

	onClickMoveDown = () => {
		const { currentTool } = this.state;
		const { tools, onUpdateTools } = this.props;
		const index = tools.indexOf(currentTool);
		const newTools = swapElements(tools, index, index - 1);
		newTools[index].layer -= 1;
		newTools[index - 1].layer += 1;
		onUpdateTools(newTools);
	};

	updateTools = () => {
		const { tools, onUpdateTools } = this.props;
		onUpdateTools(tools);
	};

	render() {
		const { currentTool, isEditingTool } = this.state;
		const { copiedTool, tools, instructor, onDrop } = this.props;
		const ToolComponents = tools.map((tool, index) => {
			let ToolComponent;
			if (currentTool === tool && instructor) {
				ToolComponent = (
					<ContextMenuTrigger id={CONTEXT_MENU_ID} holdToDisplay={-1}>
						<Tool
							draggable
							selected
							tool={tool}
							setCurrentTool={this.setCurrentTool}
							updateTools={this.updateTools}
							instructor
						/>
					</ContextMenuTrigger>
				);
			} else if (!instructor) {
				ToolComponent = (
					<ContextMenuTrigger id={CONTEXT_MENU_ID} holdToDisplay={-1}>
						<Tool
							draggable
							tool={tool}
							setCurrentTool={this.setCurrentTool}
							onDrop={this.onDrop}
							instructor={false}
							//openActionMenu={this.openStudentActions}
						/>
					</ContextMenuTrigger>
				);
			} else {
				ToolComponent = (
					<Tool
						draggable
						tool={tool}
						setCurrentTool={this.setCurrentTool}
						updateTools={this.updateTools}
						instructor
					/>
				);
			}

			return <div key={index}>{ToolComponent}</div>;
		});

		let ToolEditorComponent;
		if (currentTool) {
			ToolEditorComponent = (
				<ToolEditor
					tool={currentTool}
					show={isEditingTool}
					onHide={this.onHide}
					updateTools={this.updateTools}
					setCurrentTool={this.setCurrentTool}
				/>
			);
		}

		let canvasComponent;
		if (instructor) {
			canvasComponent = (
				<ContextMenuTrigger id={CONTEXT_MENU_ID + '-2'} holdToDisplay={-1}>
					<div
						id={'canvas'}
						style={{ width: '100%', height: '90vh', position: 'relative' }}
						ref={this.ref}
						onClick={this.resetCurrentTool}
					>
						{ToolComponents}
					</div>
				</ContextMenuTrigger>
			);
		} else {
			canvasComponent = (
				<div
					id={'canvas'}
					style={{ width: '100%', height: '90vh', position: 'relative' }}
					ref={this.ref}
					onClick={this.resetCurrentTool}
				>
					{ToolComponents}
				</div>
			);
		}

		return (
			<React.Fragment>
				<Droppable types={[ 'tool' ]} onDrop={onDrop}>
					{canvasComponent}
				</Droppable>

				{!instructor ? (
					<ContextMenu id={CONTEXT_MENU_ID}>
						<MenuItem
							onClick={() => {
								this.props.setSource(currentTool, () => this.props.setCurrentAction('Stir'));
							}}
						>
							Stir With {currentTool ? currentTool.getName() : null}
						</MenuItem>
						<MenuItem
							onClick={() => {
								this.props.setSource(currentTool, () => this.props.setCurrentAction('Shake'));
							}}
						>
							Shake {currentTool ? currentTool.getName() : null}
						</MenuItem>
						<MenuItem
							onClick={() => {
								this.props.setSource(currentTool, () => this.props.setCurrentAction('Pour'));
							}}
						>
							Pour From {currentTool ? currentTool.getName() : null}
						</MenuItem>
						<MenuItem
							onClick={() => {
								this.props.setSource(currentTool, () => this.props.setCurrentAction('Blend'));
							}}
						>
							Blend {currentTool ? currentTool.getName() : null}
						</MenuItem>
						<MenuItem
							onClick={() => {
								this.props.setSource(currentTool, () => this.props.setCurrentAction('Pump'));
							}}
						>
							Pump {currentTool ? currentTool.getName() : null}
						</MenuItem>
						<MenuItem
							onClick={() => {
								this.props.setSource(currentTool, () => this.props.setCurrentAction('Grind'));
							}}
						>
							Grind {currentTool ? currentTool.getName() : null}
						</MenuItem>
						<MenuItem
							onClick={() => {
								this.props.setSource(currentTool, () => this.props.setCurrentAction('Brew'));
							}}
						>
							Brew {currentTool ? currentTool.getName() : null}
						</MenuItem>
					</ContextMenu>
				) : null}
				{instructor ? (
					<ContextMenu id={CONTEXT_MENU_ID}>
						<MenuItem onClick={this.onClickEdit}>
							Edit {currentTool ? currentTool.getName() : null}
						</MenuItem>
						<MenuItem onClick={this.onCopyTool}>Copy Tool</MenuItem>
						<MenuItem onClick={this.onDeleteTool}>Delete Tool</MenuItem>
						<MenuItem
							onClick={this.onClickMoveUp}
							disabled={tools.indexOf(currentTool) == tools.length - 1}
						>
							Move Up A Layer
						</MenuItem>
						<MenuItem onClick={this.onClickMoveDown} disabled={tools.indexOf(currentTool) == 0}>
							Move Down A Layer
						</MenuItem>
					</ContextMenu>
				) : null}
				{instructor ? (
					<ContextMenu id={CONTEXT_MENU_ID + '-2'}>
						<MenuItem disabled={!copiedTool} onClick={this.onPasteTool}>
							Paste Tool
						</MenuItem>
					</ContextMenu>
				) : null}
				<div>{ToolEditorComponent}</div>
			</React.Fragment>
		);
	}
}

export default Canvas;
