import React from 'react';
import Collapsible from 'react-collapsible';
import { Draggable } from 'react-drag-and-drop';
import CollapsibleTrigger from './CollapsibleTrigger.jsx';
import { Col } from 'react-grid-system';
import { CATEGORIES, IMAGES } from './Tools.jsx';
import up from '../Styles/Images/sort-up.svg';
import down from '../Styles/Images/sort-down.svg';
import '../Styles/editor.css';
import '../Styles/EditorStyle.css';

import { Tool as ToolComponent } from './Tool.jsx';
import Tool from '../Objects/Tool.js';

class Catalog extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const categories = Object.keys(CATEGORIES);
		const sections = categories.map((category,index) => {
			const tools = CATEGORIES[category];
			const items = tools.map((tool,index) => {
				const image = IMAGES[tool];
				const width = image.properties.Width, height = image.properties.Height
				return (
					<Draggable key={index} type="tool" data={tool} style={{width: "75px", height: "75px"}}>
						<ToolComponent style={{display: "inline-block"}} tool={new Tool(tool, image, undefined, 
													  (width >= height)? 75 : width * 75 / height, 
													  (width <= height)? 75 : height * 75 / width,
													  undefined)} />
					</Draggable>
				);
			});

			return (
				<div key={index} style={{ overflowY: 'auto', borderBottom: '1px solid black' }}>
					<Col style={{ margin: 0, padding: '10px' }}>
						<Collapsible
							trigger={<CollapsibleTrigger text={category} image={down} alt="expand" />}
							triggerWhenOpen={<CollapsibleTrigger text={category} image={up} alt="collapse" />}
						>
							<div>{items}</div>
						</Collapsible>
					</Col>
				</div>
			);
		});

		return <div>{sections}</div>;
	}
}

export default Catalog;
