import React from "react";
import ListItem from "./ListItem.jsx"
import {matrix_includes} from "../LilacArray.js"
import "../Styles/search.css"
import { placeholder } from "@babel/types";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            result: [],
        };

        this.clear = this.clear.bind(this)
        this.onChange = this.onChange.bind(this)

        this.add = props.add
    }

    clear() {
        this.setState({
            text: ""
        });
    }

    onChange(e) {
        const items = this.props.items;
        const text = e.currentTarget.value;

        let result = [];
        let candidates, index, matches;
        for (let i = 0; i < items[0].length; i++) {
            candidates = items;
            index = 0;
            while (candidates.length) {
                candidates = candidates.filter(candidate => {
                    return candidate[i].length >= index
                });
                matches = candidates.filter(candidate => {
                    return !matrix_includes(result,candidate) &&
                            candidate[i].toLowerCase().indexOf(text.toLowerCase()) === index
                });
                if (matches.length) {
                    result = result.concat(matches)
                }
                index++
            }
        }

        this.setState({
            text: text,
            result: result,
        });
    }

    render() {
        const {items, placeholder} = this.props
        const {onChange, state: {text, result}} = this;

        let ResultComponent;

        if (text && result.length) {
            ResultComponent = (
                <ul class="result">
                    {
                        result.map(item => {
                            return (
                                <li key={item}>
                                    <ListItem item={item} add={this.add} clear={this.clear}/>
                                </li>
                            );
                        })
                    }
                </ul>
            );
        } else if (text && !result.length) {
            ResultComponent = (
                <div className="no_result">
                    <em>No Result</em>
                </div>
            );
        }

        return (
            <div class="search">
                <input type="text"
                    onChange={onChange}
                    value={text}
                    placeholder={placeholder}
                />
                {ResultComponent}
            </div>
        )
    }
}

export default Search;