import React from 'react';
import Timer from 'react-compound-timer';
import CountdownTimer from 'react-component-countdown-timer';

class TimerAction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			actionTime: 4999 // x times 1000 + 999
		};
	}

	render() {
		return (
			<Timer
				initialTime={this.state.actionTime}
				direction="backward"
				checkpoints={[
					{
						time: 0,
						callback: () => this.props.handleStateChange()
					}
				]}
			>
				<div>
					<Timer.Seconds /> seconds
				</div>
			</Timer>
		);
	}
}

export default TimerAction;

/*
<Countdown
				date={Date.now() + this.state.actionTime}
				onComplete={() => console.log('a')}
				controlled={false}
				renderer={(props) => <div>{props.seconds + ' seconds'}</div>}
			/>
*/
