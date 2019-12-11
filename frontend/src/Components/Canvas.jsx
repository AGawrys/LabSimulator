import React from "react";
import {Droppable} from "react-drag-and-drop";
import { Form } from 'react-bootstrap';
import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';
import {CONTEXT_MENU_ID} from '../utils/EditorConstants.js';
import {determineToolPosition} from '../utils/CanvasUtils.js';
import Position from '../Objects/Position.js';
import Tool from "./Tool.jsx"
import ToolEditor from "./ToolEditor.jsx";

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTool: null,
            isEditingTool: false,
            copiedTool: null,
        }

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

    onDrop = (tool) => {
        const {tools } = this.props;
        let dist = null;
        console.log(tool);
        let onTopTool = null;
        for (let i = 0; i < tools.length; i++) {
            const t = tools[i];
            if(t.name != tool.name) {
                const x1 = t.position.x;
                const y1 = t.position.y;

                const x2 = tool.position.x;
                const y2= tool.position.y;

                dist = Math.sqrt(Math.pow((x2 - x1), 2) +  Math.pow((y2 - y1), 2));
                console.log(dist);
                if(dist < 25){
                    onTopTool = tools[i];
                }  
            }          
        }
        if(onTopTool){
            this.props.onDrop(tool, onTopTool);
        }
    }

    onDeleteTool = () => {
        const {tools, onUpdateTools} = this.props;
        const index = tools.indexOf(this.state.currentTool);
        tools.splice(index, 1);
        for (let i = 0; i < tools.length; i++) {
            tools[i].layer = i;
        }
        onUpdateTools(tools);
        this.setState({currentTool: null});
    }

    onCopyTool = () => {
        this.props.setCopiedTool(this.state.currentTool.clone());
    }

    onPasteTool = () => {
        const {copiedTool, tools, setCopiedTool} = this.props;
        const newCopy = copiedTool.clone();         // must deep copy again so subsequential pastes will not have properties effected

        const {x,y} = determineToolPosition(copiedTool.height);
        const position = new Position(x,y);
        copiedTool.layer = tools.length;
        copiedTool.position = position;
        tools.push(copiedTool);

        setCopiedTool(newCopy);
    }
    openStudentActions = () => {
        console.log(" Open menu from Canvas");
        const {currentTool} = this.state;
        this.props.openActionMenu(currentTool);
    }

    render() {
        const {currentTool, isEditingTool} = this.state;
        const {copiedTool, tools, instructor, onDrop} = this.props;
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
                        />
                    </ContextMenuTrigger>
                )
            } else if (!instructor) {
                ToolComponent = (
                    <ContextMenuTrigger id={CONTEXT_MENU_ID} holdToDisplay={-1}>
                <Tool
                        draggable
                        tool={tool}
                        setCurrentTool={this.setCurrentTool}
                        onDrop={this.onDrop}
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
                    />
                );
            }

            return (
                <div key={index}>
                    {ToolComponent}
                </div>
            );
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
                <ContextMenuTrigger id={CONTEXT_MENU_ID + "-2"} holdToDisplay={-1}>
                    <div
                        id={"canvas"} 
                        style={{width: "100%", height: '90vh', position: 'relative'}}
                        ref={this.ref}
                        onClick={this.resetCurrentTool}
                    >
                        {ToolComponents}         
                    </div>
                </ContextMenuTrigger>  
            );
        }
        else {
            canvasComponent = (
                <div
                    id={"canvas"} 
                    style={{width: "100%", height: '90vh', position: 'relative'}}
                    ref={this.ref}
                    onClick={this.resetCurrentTool}
                >
                    {ToolComponents}
                    
                </div>
            );
        }

        return (
            <React.Fragment>
                <Droppable 
                    types={["tool"]}
                    onDrop={onDrop}
                >
                    {canvasComponent} 
                </Droppable>

                {!instructor ? (<ContextMenu
                    id={CONTEXT_MENU_ID}
                >
                    <MenuItem
                        onClick={this.props.changeActStir}
                    >
                        Stir With {currentTool ? currentTool.getName() : null}
                    </MenuItem>
                    <MenuItem
                        onClick={this.props.shake}
                    >
                        Shake
                    </MenuItem>
                    <MenuItem
                        onClick={this.props.changeActPour}
                    >
                        Pour From 
                    </MenuItem>
                    <MenuItem
                        onClick={this.props.changeActBlend}
                    >
                        Blend
                    </MenuItem>
                </ContextMenu>) : null}
                {instructor ? (<ContextMenu
                    id={CONTEXT_MENU_ID}
                >
                    <MenuItem
                        onClick={this.onClickEdit}
                    >
                        Edit {currentTool ? currentTool.getName() : null}
                    </MenuItem>
                    <MenuItem
                        onClick={this.onCopyTool}
                    >
                        Copy Tool
                    </MenuItem>
                    <MenuItem
                        onClick={this.onDeleteTool}
                    >
                        Delete Tool 
                    </MenuItem>
                    <MenuItem
                        onClick={this.onClickMoveUp}
                    >
                        Move Up
                    </MenuItem>
                    <MenuItem
                        onClick={this.onClickMoveDown}
                    >
                        Move Down
                    </MenuItem>
                </ContextMenu>) : null}
                {instructor ? (
                <ContextMenu id={CONTEXT_MENU_ID + "-2"}>
                    <MenuItem disabled={!copiedTool} onClick={this.onPasteTool}>
                        Paste Tool
                    </MenuItem>
                </ContextMenu> ) : null}
                <div>
                    {ToolEditorComponent}
                </div>
            </React.Fragment>
        )
    }
}

export default Canvas;