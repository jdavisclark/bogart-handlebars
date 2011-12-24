var bogart = require('bogart'),
    path = require('path'),
    q = require("q"),
    when = q.when,
    test = require('tap').test,
    plan = require('tap').plan,
    fixturesPath = path.join(__dirname, 'fixtures');


var handlebars = require("../lib/bogart-handlebars").handlebars;

test('test render handlebars', function(t) {
  var viewEngine = bogart.viewEngine('handlebars', fixturesPath);

  when(viewEngine.render('index.handlebars', {
    layout: false
  }), function(str) {
    t.equal(str, '<h1>Hello World from Handlebars</h1>');;
    t.end();
  }, function(err) {
    t.fail(err);
  });
});

test('test render handlebars with passed partials', function(t) {
  var viewEngine = bogart.viewEngine('handlebars', fixturesPath);

  when(viewEngine.render('partial-test.handlebars', {
    layout: false,
    locals: {
      greeting: {}
    },
    partials: {
      greeting: 'greeting.handlebars'
    }
  }), function(str) {
    t.equal(str, "<h1>Hello World from Handlebars</h1><p>With Partial</p>");
    t.end();
  }, function(err) {
    t.fail(err);
  });
});


test('test render handlebars with registered partials', function(t) {
  var viewEngine = bogart.viewEngine('handlebars', fixturesPath);
  handlebars.registerPartial("greeting", "<p>With Partial</p>");
  
  when(viewEngine.render('partial-test.handlebars', {
    layout: false,
    locals: {
      greeting: {}
    }
  }), function(str) {
    t.equal(str, "<h1>Hello World from Handlebars</h1><p>With Partial</p>");
    t.end();
  }, function(err) {
    t.fail(err);
  });
});