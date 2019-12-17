const DEFAULT_LESSON_NAME = 'Untitled Lesson';
const DEFAULT_STEP_NAME = 'Untitled Step';
const CONTEXT_MENU_ID = 'tool-context-menu';
const DEFAULT_TOOL_SIZE = 125;
const ACTIONS = [
	{ value: 'Shake', label: 'Shake' },
	{ value: 'Pour', label: 'Pour' },
	{ value: 'Stir', label: 'Stir' },
	{ value: 'Blend', label: 'Blend' },
	{ value: 'Pump', label: 'Pump' },
	{ value: 'Brew', label: 'Brew' },
	{ value: 'Grind', label: 'Grind' }
];
const ACTIONS_LABEL = {
	Shake: 'Shake Intensity',
	Pour: 'Pour Percent',
	Stir: 'Rotations',
	Blend: 'Action Measurement',
	Pump: 'Number of Pump',
	Brew: 'Action Measurement',
	Grind: 'Action Measurement'
};
export { DEFAULT_LESSON_NAME, DEFAULT_STEP_NAME, CONTEXT_MENU_ID, DEFAULT_TOOL_SIZE, ACTIONS, ACTIONS_LABEL };
