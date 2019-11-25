import React from "react";
import {Droppable} from "react-drag-and-drop";
import { Form } from 'react-bootstrap';
import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';
import EditorConstants from '../utils/EditorConstants.js';
import Tool from "./Tool.jsx"

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTool: null,
            editTool: false
        }

        this.tools = props.tools;

        this.setCurrentTool = this.setCurrentTool.bind(this);
        this.onClickName = this.onClickName.bind(this);

        this.inputName = null;
    }

    setCurrentTool(tool) {
        this.setState({
            currentTool: tool
        });
    }

    onClickEdit(event, data, collect) {
        this.setState({
            editTool: true
        });
    }

    render() {
        const tools = this.props.tools;
        const currentTool = this.state.currentTool;

        const ToolComponents = tools.map((tool, index) => {
            let ToolComponent;

            if (this.state.currentTool === tool) {
                ToolComponent = (
                    <ContextMenuTrigger
                        index={index} 
                        id={EditorConstants.CONTEXT_MENU_ID}
                    >
                        <Tool
                            draggable
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
                        Edit {currentTool? currentTool.getName() : null}
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
            </React.Fragment>
        )
    }
}

export default Canvas;