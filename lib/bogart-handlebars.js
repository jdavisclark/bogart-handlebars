var bogart = require('bogart'),
	handlebars = require('handlebars'),
	path = require("path"),
	q = require("q");

bogart.viewEngine.addEngine('handlebars', function(template, opts, cache, viewEngine) {
	var partialPromises = [1],
		// temporary fix until the empty array fix is published to npm (will be q v0.8.1)
		partials = {},
		fn, viewPath, pKeys = [];

	if (typeof template === "function") {
		fn = template;
	} else {
		fn = handlebars.compile(template);
		cache(fn);
	}

	if (opts.partials) {
		Object.keys(opts.partials).forEach(function(k) {
			viewPath = path.join(viewEngine.views, opts.partials[k]);

			var pPartial = q.when(viewEngine.viewCache[viewPath] || viewEngine.cacheView(viewPath), function(tpl) {
				var partFn;

				if (typeof tpl === "function") {
					partFn = tpl;
				} else {
					partFn = handlebars.compile(tpl);
					viewEngine.viewCache[viewPath] = partFn;
				}

				partials[k] = partFn;
			});
			partialPromises.push(pPartial);
		});
	}

	return q.all(partialPromises).then(function() {
		var ctx = {};

		// any partials/helpers passed in the options prevent using ANYTHING registered globally.
		if (opts.helpers) {
			ctx.helpers = opts.helpers;
		}
		if (opts.data) {
			ctx.data = opts.data;
		}
		if (opts.partials) {
			ctx.partials = partials;
		}
		
		return fn(opts.locals, ctx);
	});
});

// so users dont have to seperately require handlebars to register global partials or helpers
exports.handlebars = handlebars;