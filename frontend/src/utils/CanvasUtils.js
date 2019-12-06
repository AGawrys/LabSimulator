function determineToolPosition(size) {
	const canvas = document.getElementById('canvas');
	const { left, top, width, height } = canvas.getBoundingClientRect();
	const { pageX, pageY } = window.event;

	let x,y;
	if (pageX - size / 2 < left) {
		x = 0;
	} else if (pageX + size / 2 > width + left) {
		x = width - size;
	} else {
		x = pageX - left - size / 2;
	}

	if (pageY - size / 2 < top) {
		y = 0;
	} else if (pageY + size / 2 > height + top) {
		y = height - size;
	} else {
		y = pageY - top - size / 2;
	}

	return {x,y};
}

export {determineToolPosition};