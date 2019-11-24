import React from "react"
import "../Styles/collapsible_trigger.css"

function CollapsibleTrigger(props) {
    const {text, image, alt} = props
    return (
        <div class="collapsable-trigger">
            <div>{text}</div>
            <div className="icon"><img src={image} alt={alt} width="15" height="15" /></div>
        </div>
    );
}

export default CollapsibleTrigger;