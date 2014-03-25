# Bogart Handlebars

Bogart Middleware to load a directory hierarchy of views.

    npm install bogart-handlebars --save

In your app:

```javascript
var bogartHandlebars = require('bogart-handlebars');

var app = bogart.app();
app.use(bogartHandlebars(Path.join(__dirname, 'views')));
```

Middleware executed after bogartHandlebars will have `views` and
`respond` services available. The views service is an object whose
property hierarchy matches the directory hierarchy of the views.

Directory contents starting with underscore e.g. *_layout.html* are
registered as partials with their full path name.

Example:

Figure A, Directory Hierarchy

    views
      |-layouts
        |-_main.hbt
      |-public
        |-index.hbt

**_main.hbt** will be registered as the partial 'layouts/main'.

**index.hbt** will be available from `views.public.index`.

## `respond` service

Middleware executed after bogart-handlebars will have `respond` available
as a service.

    /**
     * Create a Bogart response with a body of a handlebars view.
     * @param {Function} view  The handlebars view from the `view` service.
     * @param {Object} locals  Template variables for the handlebars template.
     * @param {Object} options Overrides for the response. Common values: status, headers.
     * @returns {Object} A Bogart response.
     */
    respond(view, locals, options)

Example:

```javascript
var bogartHandlebars = require('bogart-handlebars');

var router = bogart.router();
router.get('/', function (views, respond) {
  return respond(views.public.index, { title: 'Hello World' });
});

var app = bogart.app();
app.use(bogartHandlebars(path.join(__dirname, 'views')));
app.use(router);
```

## Cross-cutting locals

It is possible to add to the locals passed to the view by `respond` in
a cross-cutting manner with the `onCreateLocals` event. Register a callback
to this event:

```javascript
bogartHandlebars(path.join(__dirname, 'views'))
  .onCreateLocals(function (session) {
    return { user: session('user') }
  });
```

This example adds a `user` parameter from `session` to the locals
of every view that `respond` renders.

`onCreateLocals` is chainable.