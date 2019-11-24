import React, { Component } from 'react';
import ShakeModal from '../Components/ShakeModal.jsx';

class ShakeModalPage extends Component {
	render() {
		return (
			<ShakeModal show={true} progressNeeded={250}/>
		);
	}
}

export default ShakeModalPage;
