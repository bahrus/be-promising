# be-promising

<a href="https://nodei.co/npm/be-promising/"><img src="https://nodei.co/npm/be-promising.png"></a>

Size of package, including custom element behavior framework (be-decorated):

[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-promising?style=for-the-badge)](https://bundlephobia.com/result?p=be-promising)

Size of new code in this package:

<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-promising?compression=gzip">

[be-decorated](https://github.com/bahrus/be-decorated) [be-hiviors](https://github.com/bahrus/be-hive) provide the ability to apply multiple cross-cutting behaviors to a single element.  Sometimes, though, we need to apply them in a particular order.

be-promising provides this capability.

```html
<input be-promising='{
    "be":[ "typed", "clonable", "delible"]
}'>
```

Idea influenced by [this discussion](https://twitter.com/dan_abramov/status/1563307506482696192).

For this to work, be-decorated adopts a convention of using property "resolved" / event "resolved-changed" to indicate when it has "done its thing", whatever that is.

## Specifying props / parallel applying

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

This "resolves" the "be-typed" behavior first, then launches be-clonable, be-delible in parallel.

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-promising';
</script>
```