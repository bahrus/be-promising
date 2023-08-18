# be-promising

[![NPM version](https://badge.fury.io/js/be-promising.png)](http://badge.fury.io/js/be-promising)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-promising?style=for-the-badge)](https://bundlephobia.com/result?p=be-promising)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-promising?compression=gzip">
[![Playwright Tests](https://github.com/bahrus/be-promising/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-promising/actions/workflows/CI.yml)

[be-enhanced](https://github.com/bahrus/be-enhanced) [be-hiviors](https://github.com/bahrus/be-hive) provide the ability to apply multiple cross-cutting enhancements to a single element.  Sometimes, though, we need to apply them in a particular order.

be-promising provides this capability.

```html
<input be-promising='{
    "be":[ "typed", "clonable", "delible"]
}'>
```

Idea influenced by [this discussion](https://twitter.com/dan_abramov/status/1563307506482696192).

For this to work, be-decorated adopts a convention of using property "resolved" / event "resolved" to indicate when it has "done its thing", whatever that is.

## Applying settings

```html
<input be-promising='{
    "be":[ "typed", 
        {
            "clonable": {
                "clonableSettings": "..."
            },
        },
        {
            "delible": {
                "delibleSettings": "..."
            }
        }
    ]
}'>
```

## Apply promises in parallel [TODO]

```html
<input be-promising='{
    "be":[ "typed", {
            "clonable": {
                "clonableSettings": "..."
            },
            "delible": {
                "delibleSettings": "..."
            }
    }]
}'>
```

This "resolves" the "be-typed" behavior first, then launches be-clonable, then be-delible.

## Running locally

Any web server than can serve static files will do, but...

1.  Install git.
2.  Do a git clone or a git fork of repository https://github.com/bahrus/be-promising
3.  Install node.js
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo in a modern browser.

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-promising';
</script>
```

## Referencing via ESM Modules:

```JavaScript
import 'be-promising/be-promising.js';
```