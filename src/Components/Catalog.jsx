import React from "react";
import Collapsible from 'react-collapsible';
import {Draggable} from "react-drag-and-drop";
import CollapsibleTrigger from "./CollapsibleTrigger.jsx"
import TOOLS from "./Tools.jsx"
import up from "../Styles/Images/sort-up.svg"
import down from "../Styles/Images/sort-down.svg"
import "../Styles/editor.css"

class Catalog extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        const categories = Object.keys(TOOLS)
        const sections = categories.map(category => {
            const tools = Object.keys(TOOLS[category])
            const items = tools.map(tool => {
                return (
                    <Draggable className="thumbnail"
                               type="tool"
                               data={tool}>
                        <div>
                            {TOOLS[category][tool]}
                        </div>
                    </Draggable>
                );
            });
            
            return (
                <li>                    
                    <Collapsible className={"collapsible"}
                                 openedClassName={"collapsible"}
                                 triggerClassName={"collapsible-trigger"}
                                 triggerOpenedClassName={"collapsible-trigger"}
                                 trigger={<CollapsibleTrigger text={category}
                                                              image={down}
                                                              alt="expand" />} 
                                 triggerWhenOpen={<CollapsibleTrigger text={category}
                                                                      image={up}
                                                                      alt="collapse" />}>
                        <div class="catalog-tools">
                            {items}
                        </div>
                    </Collapsible>
                </li>);
        })

        return (
            <div class="catalog">
                <ul class="catalog-listing">
                    {sections}
                </ul>
            </div>    
        );
    }
}

export default Catalog;