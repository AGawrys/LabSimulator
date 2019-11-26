import React from "react";
import Collapsible from 'react-collapsible';
import {Draggable} from "react-drag-and-drop";
import CollapsibleTrigger from "./CollapsibleTrigger.jsx"
import { Col } from 'react-grid-system';
import {CATEGORIES, IMAGES} from "./Tools.jsx"
import up from "../Styles/Images/sort-up.svg"
import down from "../Styles/Images/sort-down.svg"
import "../Styles/editor.css";
import '../Styles/EditorStyle.css';

import { Tool as ToolComponent } from "./Tool.jsx";
import Tool from "../Objects/Tool.js";


class Catalog extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const categories = Object.keys(CATEGORIES)
        const sections = categories.map(category => {
            const tools = CATEGORIES[category]
            const items = tools.map(tool => {
                const image = IMAGES[tool];
                return (
                    <Draggable type="tool"
                               data={tool}>
                        <ToolComponent tool={new Tool(tool, image, undefined, 75, 75, undefined)} />
                    </Draggable>
                    
                );
            });
            
            return (   
                <div  style={{ overflowY: 'scroll' }}>
				<Col style={{ width: '10vh', height: '40vh', margin: 0, padding: 0 }}>             
                <Collapsible trigger={<CollapsibleTrigger text={category}
                                                          image={down}
                                                          alt="expand" />} 
                             triggerWhenOpen={<CollapsibleTrigger text={category}
                                                                  image={up}
                                                                  alt="collapse" />}>
                    <div>
                        {items}
                    </div>
                </Collapsible>
                </Col>
                </div>
            );
        })

        return (
            <div>
                {sections}
            </div>    
        );
    }
}

export default Catalog;