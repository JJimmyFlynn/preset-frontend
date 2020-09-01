const { Preset } = require('use-preset');

module.exports = Preset.make('Flynndustries Front-end')
	.prompts()
		.confirm('Setup ESLint?', 'useEslint')
		.confirm('Setup Stylelint?', 'useStylelint')
		.chain()
	.copyDirectory('sass')
		.to('resources/styles')
		.chain()
