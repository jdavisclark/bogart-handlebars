bogart-handlebars is a handlebars adapter for the bogart view engine.

## A note on partials and helpers
I strongly suggest you register partials and helpers globally with Handlebars rather than passing them in to the call to viewEngine.respond. Handlebars has a bug where if you pass ANY partials or helpers in to a compiled template function, your access to partials/helpers registered globally is COMPLETELY BLOCKED. So, either register all partials/helpers globally and never pass them to viewEngine.respond, or dont register them globally and pass them every time. bogart-handlebars exports handlebars (exports.handlebars) for convenience.

