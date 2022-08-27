# be-promising

[be-decorated](https://github.com/bahrus/be-decorated) [be-hiviors](https://github.com/bahrus/be-hive) provide the ability to apply multiple cross-cutting behaviors to a single element.  Sometimes, though, we need to apply them in a particular order.

be-promising provides this capability.

```html
<input be-promising='[
    "beTyped": true,
    "beClonable": true,
    "beDelible": true,
]'>
```

Idea influenced by [this discussion](https://twitter.com/dan_abramov/status/1563307506482696192)

For this to work, be-decorated adopts a convention of using property "resolved" / event "resolved-changed" to indicate when it has "done its thing", whatever that is.