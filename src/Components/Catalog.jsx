import React from "react";
import Collapsible from 'react-collapsible';
import {Draggable} from "react-drag-and-drop";
import CollapsibleTrigger from "./CollapsibleTrigger.jsx"
import TaperedCupTool from "./TaperedCupTool.jsx"
import up from "../Styles/Images/sort-up.svg"
import down from "../Styles/Images/sort-down.svg"
import "../Styles/editor.css"

const CATEGORIES = ["Cups", "Measurements", "Utensils"] 

class Catalog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listings: {
                Cups: [<TaperedCupTool/>]
            }
        }
    }


    render() {
        const categories = Object.keys(this.state.listings)
        const listings = categories.map(category => {
            let tools = this.state.listings[category].map(tool => {
                return (
                    <Draggable type="tool"
                               data={tool.tooltype}>
                        <div>
                            {tool}
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
                            {tools}
                        </div>
                    </Collapsible>
                </li>);
        })

        return (
            <div class="catalog">
                <ul class="catalog-listing">
                    {listings}
                </ul>
            </div>    
        );
    }
}

export default Catalog;