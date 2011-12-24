/**
 * Bogart Handlebars  View Engine Example.
 *
 * In order for this example to work, bogart-handlebars must be installed.
 * npm install bogart-handlebars
 */

var bogart = require('bogart'),
	path = require('path');

// This will register the 'handlebars' view engine behind the scenes.
var handlebars = require('../lib/bogart-handlebars');

// Construct a Bogart ViewEngine using Handlebars.
var viewEngine = bogart.viewEngine('handlebars');

var router = bogart.router();
router.get('/', function(req) {
	return viewEngine.respond('index.handlebars', {
		locals: {
			description: 'This is content'
		}
	});
});

router.get("/partial", function(req) {
	var people = [{
		name: "Davis Clark",
		email: "jdc0589@gmail.com"
	}, {
		name: "Nathan Stott",
		email: "nathan.stott@whiteboard-it.com"
	}];

	// rather than passing partials in the options every time, you could manually register all your
	// partials before all the router registrations via 'Handlebars.registerPartial'. However, this
	// requires you to read and compile your partial template files manually. There is not much 
	// extra overhead incurred by passing the partials each time; partials are compiled and cached
	return viewEngine.respond("people.handlebars", {
		locals: {
			people: people
		},
		partials: {
			mailto: "mailto.handlebars"
		}
	});
});

var app = bogart.app();

// Add middleware to trap and display errors.
app.use(bogart.middleware.error);

// Add our router to the application stack. It is important that this be done after 
// adding bogart.batteries so that batteries is ahead of router in the middleware 
// chain.
app.use(router);
app.start(8085);