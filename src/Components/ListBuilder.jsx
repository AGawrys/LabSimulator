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

        this.add = this.add.bind(this)
    }

    add(item) {
        let list = this.state.list;

        list.push(item);

        this.setState({
            list: list
        });
    }

    render() {
        const {items, placeholder} = this.props
        const {state: {list}} = this

        let List = (
            <div class="list">
                <ul>
                    {list.map(item => {
                        return (
                            <li key={item}>
                                <ListItem item={item}/>
                                <button>-</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )

        return (
            <div class={"listbuilder"}>
                <Search items={items}
                        placeholder={placeholder}
                        add={this.add}
                />
                {List}
            </div>
        )
    }
}

export default ListBuilder;