import React from 'react';
import Timer from 'react-compound-timer';
import CountdownTimer from 'react-component-countdown-timer';

class TimerAction extends React.Component {

	render() {
		console.log("BACK");
		console.log(this.props);
		return (
			<Timer
				initialTime={this.props.seconds * 1000 + 999}
				direction="backward"
				checkpoints={[
					{
						time: 0,
						callback: () => {

						}
					}
				]}
			>
				{({ start, resume, pause, stop, reset, getTimerState, getTime }) =>  (
					<div>
						<Timer.Seconds /> seconds
					</div>
				)}
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
