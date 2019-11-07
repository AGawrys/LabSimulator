import React from "react"
import "../Styles/search.css"

class ListItem extends React.Component{
    constructor(props) {
        super(props)

        this.item = props.item
        this.add = props.add
        this.clear = props.clear

        this.handleAdd = this.handleAdd.bind(this)
    }

    handleAdd() {
        this.add(this.item);
        this.clear();
    }

    render() {
        let listItem = []

        listItem.push(
            <div>
                {this.item[0]}
            </div>
        );

        for (let i = 1; i < this.item.length; i++) {
            listItem.push(
                <div class="subtext">
                    {this.item[i]}
                </div>
            );
        }

        if (this.add) {
            listItem.push(<button onClick={this.handleAdd} >+</button>)
            console.log(this.add)
        }

        return <div>{listItem}</div>
    }
}

export default ListItem;