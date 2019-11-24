import tool1 from '../Styles/Images/jar.svg';
import tool2 from '../Styles/Images/measuredPitcher.svg';
import tool3 from '../Styles/Images/coffee-mug.svg';
import tool4 from '../Styles/Images/cup.svg';
import tool5 from '../Styles/Images/teabag-black.svg';
import tool6 from '../Styles/Images/water.svg';
import spoon from '../Styles/Images/spoon.svg';
import machine from '../Styles/Images/coffee-machine.svg';

export const getLessons = () => {
	// should be getting this from backend
	const jar_tool = {
		name: 'jar',
		src: tool1,
		height: '100px',
		x: 60,
		y: 0
	};
	const pitcher_tool = {
		name: 'pitcher',
		src: tool2,
		height: '30px',
		x: 0,
		y: 0
	};
	const emptycup_tool = {
		name: 'empty cup',
		src: tool3,
		height: '100px',
		x: 0,
		y: 0
	};
	const cup_tool = {
		name: 'cup',
		src: tool4,
		height: '60px',
		x: 0,
		y: 0
	};
	const teabag_tool = {
		name: 'teabag',
		src: tool5,
		height: '30px',
		x: 0,
		y: 0
	};
	const water_tool = {
		name: 'water',
		src: tool6,
		height: '60px',
		x: 0,
		y: 0
	};

	const machine_tool = {
		name: 'coffee machine',
		src: machine,
		height: '100px',
		x: 0,
		y: 0
	};
	const spoon_tool = {
		name: 'spoon',
		src: spoon,
		height: '30px',
		x: 0,
		y: 0
	};
	const step1 = {
		name: 'Click the teabag',
		tools: [ teabag_tool, jar_tool ],
		source: teabag_tool,
		goalX: { min: 0, max: 2000 }, //a range for the correct position x
		goalY: { min: 0, max: 2000 }
	};

	const step2 = {
		name: 'Click the cup',
		tools: [ emptycup_tool, teabag_tool ],
		source: emptycup_tool,
		goalX: { min: 0, max: 2000 }, //a range for the correct position x
		goalY: { min: 0, max: 2000 }
	};
	const step3 = {
		name: 'Click on the water',
		tools: [ emptycup_tool, teabag_tool, water_tool ],
		source: water_tool,
		goalX: { min: 0, max: 2000 }, //a range for the correct position x
		goalY: { min: 0, max: 2000 }
	};
	const step4 = {
		name: 'Done! Hit exit to return to the dashboard',
		tools: []
	};
	const lesson2 = {
		name: 'Hot Tea',
		steps: [ step1, step2, step3, step4 ],
		status: 'Not Attempted',
	};

	const step1L2 = {
		name: 'Move the jar to the right side',
		tools: [ emptycup_tool, jar_tool ],
		source: jar_tool,
		x: 0,
		y: 0,
		goalX: { min: 1000, max: 2000 }, //a range for the correct position x
		goalY: { min: 0, max: 2000 }
	};
	const step2L2 = {
		name: 'Place the cup in front of you (at the bottom of the screen)',
		tools: [ emptycup_tool, teabag_tool, pitcher_tool ],
		source: emptycup_tool,
		goalX: { min: 0, max: 2000 }, //a range for the correct position x
		goalY: { min: 400, max: 2000 }
	};
	const step3L2 = {
		name: 'Place the espresso machine on the bottom right corner',
		tools: [ machine_tool, teabag_tool ],
		source: machine_tool,
		goalX: { min: 1000, max: 2000 }, //a range for the correct position x
		goalY: { min: 400, max: 2000 }
	};
	const step4L2 = {
		name: 'Place the drink in front of you (on the bottom of the screen)',
		tools: [ cup_tool, emptycup_tool ],
		source: cup_tool,
		goalX: { min: 0, max: 2000 }, //a range for the correct position x
		goalY: { min: 400, max: 2000 }
	};
	const step5L2 = {
		name: 'Find the tablespoon and bring it down',
		tools: [ spoon_tool, teabag_tool ],
		source: spoon_tool,
		goalX: { min: 0, max: 2000 }, //a range for the correct position x
		goalY: { min: 400, max: 2000 }
	};

	const lesson1 = {
		name: 'Station set up',
		steps: [ step1L2, step2L2, step3L2, step4L2, step5L2 ],
		toolsPerStep: [ jar_tool, teabag_tool, cup_tool ],
		status: 'Incomplete'
	};

	const lessons = [ lesson1, lesson2 ];

	return lessons;
};

export const getCourses = () => {
	const lesson2_1 = {
		name: 'Cafe Mocha',
		status: 'Complete'
	}
	const lesson2_2 = {
		name: 'Peppermint Mocha',
		status: 'Complete'
	}
	const lesson2_3 = {
		name: 'Strawberry refresher',
		status: 'Complete'
	}
	const lesson3_1 = {
		name: 'Acai refresher',
		status: 'Complete'
	}
	const lesson3_2 = {
		name: 'Strawberry green tea lemonade',
		status: 'Complete'
	}
	const lesson3_3 = {
		name: 'White Chocolate Mocha',
		status: 'Complete'
	}
	const lessons2 = [lesson2_1, lesson2_2, lesson2_3];
	const lessons3 = [lesson3_1, lesson3_2, lesson3_3];
	const lessons1 = getLessons();
	const Course1 = {
		lessons: lessons1,
		instructor: 'John Ham',
		courseStatus: 'Completed'
	}
	const Course2 = {
		lessons: lessons2,
		instructor: 'Mindy St Clair',
		courseStatus: 'Completed'
	} 
	const Course3 = {
		lessons: lessons3,
		instructor: 'Mr Bean',
		courseStatus: 'Completed'
	}

	const courses = [Course1, Course2, Course3];
	return courses;
};
export const isMoveCorrect = () => {};
