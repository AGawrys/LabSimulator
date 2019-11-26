import React from "react";
import {Droppable} from "react-drag-and-drop";
import { Form } from 'react-bootstrap';
import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';
import EditorConstants from '../utils/EditorConstants.js';
import Tool from "./Tool.jsx"
import ToolEditor from "./ToolEditor.jsx";

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTool: null,
            isEditingTool: false
        }

        this.tools = props.tools;

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
        this.setState({
            currentTool: null
        })
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

    render() {
        const ToolComponents = this.tools.map((tool) => {
            let ToolComponent;
            if (this.state.currentTool === tool) {
                ToolComponent = (
                    <ContextMenuTrigger
                        id={EditorConstants.CONTEXT_MENU_ID}
                    >
                        <Tool
                            draggable
                            selected
                            tool={tool}
                            setCurrentTool={this.setCurrentTool}
                        />
                    </ContextMenuTrigger>
                )
            } else {
                ToolComponent = (
                    <Tool
                        draggable
                        tool={tool}
                        setCurrentTool={this.setCurrentTool}
                    />
                )
            }

            return (
                <div>
                    {ToolComponent}
                </div>
            )
        });

        let ToolEditorComponent;
        if (this.state.currentTool) {
            ToolEditorComponent = (
                <ToolEditor
                    tool={this.state.currentTool}
                    show={this.state.isEditingTool}
                    onHide={this.onHide}
                    setCurrentTool={this.setCurrentTool}
                />
            );
        }

        return (
            <React.Fragment>
                <Droppable 
                    style={{width: "100%", height: "100%"}}
                    types={["tool"]}
                    onDrop={this.props.onDrop}
                >
                    <div
                        id={"canvas"} 
                        style={{
                            width: "100%",
                            height: "100%",
                            position: "relative"
                        }}
                        onClick={this.resetCurrentTool}
                    >
                        {ToolComponents}
                        
                    </div>  
                </Droppable>

                <ContextMenu
                    id={EditorConstants.CONTEXT_MENU_ID}
                >
                    <MenuItem
                        onClick={this.onClickEdit}
                    >
                        Edit {this.state.currentTool? this.state.currentTool.getName() : null}
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
                </ContextMenu>
                <div>
                    {ToolEditorComponent}
                </div>
            </React.Fragment>
        )
    }
}

export default Canvas;