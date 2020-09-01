const { Preset } = require('use-preset');

module.exports = Preset.make('Flynndustries Front-end')
	.setTemplateDirectory('/')
	.prompts()
		.confirm('Setup ESLint?', 'useEslint')
		.confirm('Setup Stylelint?', 'useStylelint')
		.chain()
	// Copy SASS
	.copyDirectory('sass')
		.title('Create SASS Files')
		.to('resources/styles')
		.chain()
	// Setup ESlint
	.copyFiles('.eslintrc.json')
		.title('Create ESlint Config')
		.to('/')
		.if((context => context.prompts.useEslint))
		.chain()
	.editJson('package.json')
		.title('Add ESlint Dependencies')
		.merge({
			"devDependencies": {
				"eslint": "^7.8.0",
				"eslint-config-standard": "^14.1.1",
				"eslint-plugin-import": "^2.22.0",
				"eslint-plugin-node": "^11.1.0",
				"eslint-plugin-promise": "^4.2.1",
				"eslint-plugin-standard": "^4.0.1",
				"standard-version": "^8.0.2",
			},
		})
		.if((context => context.prompts.useEslint))
		.chain()
	// Setup Stylelint
	.editJson('package.json')
		.title('Setup Stylelint')
		.merge({
			"devDependencies": {
				"prettier-stylelint-formatter": "^0.5.0",
				"stylelint": "^13.6.1",
				"stylelint-config-recess-order": "^2.1.0",
			},
			"stylelint": {
				"extends": "stylelint-config-recess-order"
			}
		})
		.if(context => context.prompts.useStylelint)
		.chain()
	// Install Node Dependencies
	.installDependencies()
		.for('node')
		.chain()
