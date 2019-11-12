import React from "react";
import Search from "./Search.jsx"
import ListItem from "./ListItem.jsx";
import "../Styles/listbuilder.css"

class ListBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    render() {
        const {items, placeholder} = this.props
        const {state: {list}} = this

        let List = (
            <ul class="list">
                {list.map(item => {
                    return (
                        <li key={item}>
                            <ListItem item={item}/>
                            <button>-</button>
                        </li>
                    )
                })}
            </ul>
        )

        return (
            <div class={"listbuilder"}>
                <Search items={items}
                        placeholder={placeholder}
                />
                {List}
            </div>
        )
    }
}

export default ListBuilder;