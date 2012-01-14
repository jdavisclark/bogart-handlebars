bogart-handlebars is a handlebars adapter for the bogart view engine.

## Warning
You cant npm install bogart-handlebars yet, as it depends on the latest version of bogart (which is not on npm yet)

## A note on partials and helpers
I strongly suggest you register partials and helpers globally with Handlebars rather than passing them in to the call to viewEngine.respond. Handlebars has a bug where if you pass ANY partials or helpers in to a compiled template function, your access to partials/helpers registered globally is COMPLETELY BLOCKED. So, either register all partials/helpers globally and never pass them to viewEngine.respond, or dont register them globally and pass them every time.

