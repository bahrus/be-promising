# be-promising

be-decorated be-hiviors provide the ability to apply multiple cross-cutting behaviors to a single element.  Sometimes, though, we need to apply them in a particular order.

be-promising provides this capability.

```html
<input be-promising='[
    "beTyped": true,
    "beClonable": true,
    "beDelible": true,
]'>
```