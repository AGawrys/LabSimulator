import React from 'react';
import { Droppable } from 'react-drag-and-drop';
import { Form } from 'react-bootstrap';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { CONTEXT_MENU_ID } from '../utils/EditorConstants.js';
import { determineToolPosition } from '../utils/CanvasUtils.js';
import Position from '../Objects/Position.js';
import Tool from './Tool.jsx';
import ToolEditor from './ToolEditor.jsx';

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

	onDeleteTool = () => {
		const { tools, onUpdateTools } = this.props;
		const index = tools.indexOf(this.state.currentTool);
		tools.splice(index, 1);
		console.log(tools);
		for (let i = 0; i < tools.length; i++) {
			tools[i].layer = i;
		}
		onUpdateTools(tools);
		this.setState({ tools });
	};

	onCopyTool = () => {
		this.props.setCopiedTool(this.state.currentTool.clone());
	};

	onPasteTool = () => {
		const { copiedTool, tools, setCopiedTool } = this.props;
		const newCopy = copiedTool.clone(); // must deep copy again so subsequential pastes will not have properties effected

		const { x, y } = determineToolPosition(copiedTool.height);
		const position = new Position(x, y);
		copiedTool.layer = tools.length;
		copiedTool.position = position;
		tools.push(copiedTool);

		setCopiedTool(newCopy);
	};

	render() {
		const { currentTool, isEditingTool } = this.state;
		const { copiedTool, tools, instructor, onDrop } = this.props;
		const ToolComponents = tools.map((tool, index) => {
			let ToolComponent;
			if (currentTool === tool && instructor) {
				ToolComponent = (
					<ContextMenuTrigger id={CONTEXT_MENU_ID} holdToDisplay={-1}>
						<Tool draggable selected tool={tool} setCurrentTool={this.setCurrentTool} />
					</ContextMenuTrigger>
				);
			} else {
				ToolComponent = <Tool draggable tool={tool} setCurrentTool={this.setCurrentTool} />;
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

				<ContextMenu id={CONTEXT_MENU_ID}>
					<MenuItem onClick={this.onClickEdit}>Edit {currentTool ? currentTool.getName() : null}</MenuItem>
					<MenuItem onClick={this.onCopyTool}>Copy Tool</MenuItem>
					<MenuItem onClick={this.onDeleteTool}>Delete Tool</MenuItem>
					<MenuItem onClick={this.onClickMoveUp}>Move Up</MenuItem>
					<MenuItem onClick={this.onClickMoveDown}>Move Down</MenuItem>
				</ContextMenu>
				<ContextMenu id={CONTEXT_MENU_ID + '-2'}>
					<MenuItem disabled={!copiedTool} onClick={this.onPasteTool}>
						Paste Tool
					</MenuItem>
				</ContextMenu>
				<div>{ToolEditorComponent}</div>
			</React.Fragment>
		);
	}
}

export default Canvas;
