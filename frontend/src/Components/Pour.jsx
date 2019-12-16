import React from 'react';
import { Spring } from 'react-spring/renderprops';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import '../Styles/Pour.css';
import Tool from '../Objects/Tool.js';
import { IMAGES, createImage } from './Tools.jsx';
import { Tool as ToolComponent } from './Tool.jsx';
import { Draggable } from 'react-drag-and-drop';
import ClickNHold from 'react-click-n-hold';
import { isArrayEqual } from '../LilacArray';
import { connectMenu } from 'react-contextmenu';

const statics = [ 'Milk', 'Kettle', 'CoffeePot', 'CoffeeBean'];

class Pour extends React.Component {
	constructor(props) {
		super(props);
		const { source, target, goal, instructor, show } = this.props;
		this.state = {
			startFill: source.image.properties.Fill,
			fill: target.image.properties.Fill,
			fillSrc: this.setSourceFill(),
			defaultFill: target.image.properties.Fill,
			defaultFillSrc: this.setSourceFill(),
			color: target.image.properties.Color,
			oldColor: target.image.properties.Color,
			colorSrc: this.setSourceColor(),
			transform: 'translate3d(0, 0px, 0) scale(1) rotate(0deg)',
			start: 100,
			instruction: 'Add ' + goal + '% to the cup',
			goalMin: goal / 100 - 0.05 + target.image.properties.Fill,
			goalMax: goal / 100 + 0.05 + target.image.properties.Fill,
			done: false,
			overpoured: false
		};
		this.start = 100;
	}
	animateCupUp = () => {
		this.setState({ transform: 'translate3d(0, -75px, 0) scale(1) rotate(90deg)' });
	};
	setSourceColor = () => {
		const { source } = this.props;
		let sourceColor = source;
		if (statics.indexOf(source.type) !== -1) {
			sourceColor = source.getImage().animation.Color;
		} else {
			sourceColor = source.getImage().properties.Color;
		}
		return sourceColor;
	};
	setSourceFill = () => {
		const { source } = this.props;
		let srcFill = source;
		if (statics.indexOf(source.type) !== -1) {
			srcFill = source.getImage().animation.Fill;
		} else {
			srcFill = source.getImage().properties.Fill;
		}
		return srcFill;
	};
	repeat = () => {
		this.pour();
		this.t = setTimeout(this.repeat, this.start);
		this.start /= 2;
	};

	colorChange = () => {
		const { colorSrc, oldColor } = this.state;
		const srcColor = colorSrc.slice(1);
		const tarColor = oldColor.slice(1);
		const srcArray = srcColor.match(/.{1,2}/g);
		const tarArray = tarColor.match(/.{1,2}/g);
		var ans = '#';
		for (var i = 0; i < srcArray.length; i++) {
			const srcInt = parseInt(srcArray[i], 16);
			const tarInt = parseInt(tarArray[i], 16);
			srcArray[i] = srcInt;
			tarArray[i] = tarInt;
			var newColor = Math.floor((srcInt + tarInt) / 2).toString(16);
			if (newColor.length == 1) {
				newColor = '0' + newColor;
			}
			ans = ans + newColor;
		}
		this.setState({ color: ans });
	};

	onMouseDown = () => {
		this.animateCupUp();
		this.repeat();
	};

	onMouseUp = () => {
		const { fill, goalMax, goalMin } = this.state;
		clearTimeout(this.t);
		this.start = 100;
		this.setState({ transform: 'translate3d(0, 0px, 0) scale(1) rotate(0deg)' });
		if (fill <= goalMax && fill >= goalMin) {
			this.setState({ done: true });
		}
		if (fill > goalMax) {
			this.setState({ overpoured: true });
		}
	};

	pour = (e) => {
		const { fill, fillSrc, defaultFill } = this.state;
		if (fillSrc > 0) {
			const n = fill + 0.01;
			const nSrc = Number((fillSrc - 0.01).toFixed(2));
			this.setState({ fill: n, fillSrc: nSrc });
			if (defaultFill != 0) {
				this.colorChange();
			}
		}
	};
	reset = () => {
		const { defaultFill, defaultFillSrc, color, oldColor } = this.state;
		const defaultTarget = defaultFill;
		const defaultSource = defaultFillSrc;
		this.setState({
			color: oldColor,
			fill: defaultTarget,
			fillSrc: defaultSource,
			overpoured: false,
			done: false
		});
	};

	closeAndFinish = () => {
		this.reset();
		this.props.onHide();
		if (!this.props.instructor) {
			this.props.onNextStep();
		}
	};

	render() {
		const { instruction, done, fill, color, overpoured, fillSrc, colorSrc } = this.state;
		const { show, onHide, source, target } = this.props;
		const overpourHeader = overpoured ? <h3 style={overpourStyle}> You overpoured! Try again. </h3> : null;

		target.amount = fill;
		target.image.properties.Fill = fill;
		if (this.state.defaultFill === 0) {
			target.image.properties.Color = colorSrc;
		} else {
			target.image.properties.Color = color;
		}
		source.amount = fillSrc;
		source.image.properties.Fill = fillSrc;
		source.image.properties.Color = colorSrc;

		return (
			<Modal onHide={onHide} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
				<h2 style={style1}>{instruction}</h2>
				{overpourHeader}
				<Row style={{ width: '70vh' }}>
					<div style={style2}>
						<Spring
							from={{
								opacity: 1,
								marginTop: 0,
								transform: 'translate3d(0, 0px, 0) scale(2) rotate(0deg)'
							}}
							to={{
								opacity: 1,
								marginTop: 0,
								transform: this.state.transform
							}}
						>
							{(props) => (
								//pass in a tool after clicking pour
								<div style={{ paddingTop: '50px', alignSelf: 'center', justifyContent: 'center' }}>
									<Row>
										<div style={props}>
											<ToolComponent tool={source} />
										</div>
										<ToolComponent tool={target} />
									</Row>
								</div>
							)}
						</Spring>
					</div>
					<Col>
						<Button
							style={{ backgroundColor: 'steelblue', alignSelf: 'center', width: '20vh' }}
							block
							disabled={overpoured}
							onMouseUp={this.onMouseUp}
							onMouseDown={this.onMouseDown}
						>
							POUR
						</Button>
						<Button
							style={{ backgroundColor: 'steelblue', alignSelf: 'center', width: '20vh' }}
							block
							onClick={this.reset}
						>
							RESET
						</Button>
						{done ? (
							<Button
								style={{ backgroundColor: 'steelblue', alignSelf: 'center', width: '20vh' }}
								block
								onClick={this.closeAndFinish}
							>
								DONE
							</Button>
						) : null}
					</Col>
				</Row>
			</Modal>
		);
	}
}

const style1 = {
	alignSelf: 'center',
	paddingLeft: '5vh',
	paddingRight: '5vh',
	paddingTop: '5vh'
};

const style2 = {
	height: '30vh',
	width: '75vh',
	paddingLeft: '200px',
	paddingBottom: '100px',
	justifyContent: 'center',
	alignItems: 'center'
};

const overpourStyle = {
	color: 'red',
	textAlign: 'center'
};

export default Pour;
