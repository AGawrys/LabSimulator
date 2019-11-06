import React from "react"
import "../Styles/search.css"

function ListItem(props) {
    let listItem = []

    listItem.push(
        <div>
            {props.item[0]}
        </div>
    );

    for (let i = 1; i < props.item.length; i++) {
        listItem.push(
            <div class="subtext">
                {props.item[i]}
            </div>
        );
    }

    return <div>{listItem}</div>
}

export default ListItem;