### `Footer`
`Footer` represents (shocker!) the application's footer bar.

#### `Footer` the Redux Way
Their implementation of `Footer` relies on a control called `FilterLink` that they implement later.

```javascript
import React from 'react';
import FilterLink from '../containers/FilterLink';

const Footer = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">
      Completed
    </FilterLink>
  </p>
);

export default Footer;
```

#### `Footer` the Vanilla Way
We don't need `FilterLink` in Vanilla because it's an expression of `Redux` binding, so we'll just skip using it in our own code.

`ShowLink` is essentially the same thing, but without the `Redux` bindings, and also folding in an expression convenience, for much shorter, less repetitive, more maintainable, and more testable code.  It also ends us up with less live overhead, since this is all computable as a one-time

We could choose to write this differently, as a result:

```javascript
const ShowLink      = (myHook, myText) => <a href="#" className="show_link" onClick={myHook}>{myText}</a>,

      ShowAll       = (props)          => ShowLink( () => props.hooks.set_vfilter('SHOW_ALL'),       'All'       ),
      ShowActive    = (props)          => ShowLink( () => props.hooks.set_vfilter('SHOW_ACTIVE'),    'Active'    ),
      ShowCompleted = (props)          => ShowLink( () => props.hooks.set_vfilter('SHOW_COMPLETED'), 'Completed' ),

      Footer        = (props)          => <p>Show: {<ShowAll {...props}/>}, {<ShowActive {...props}/>}, {<ShowCompleted {...props}/>}</p>;

export { Footer };
```

One change to note is that we are manually passing the `props` down in `{...props}` a lot.  That's mildly annoying, but it allows us to ditch all of `Redux` as a result, and there's never anything to debug or understand, or any `Redux` lock-in, so it's a good trade.

These are all `React pure functional controls`.  `React` offers three mechanisms to create controls at the time of this writing:

* "Classic controls" with `React.createComponent`
* "ES6 controls" with `class Foo extends React.component`
* "Pure functional controls" with `const Foo = (props) => <div>lol</div>`;

We'll discuss why being `pure functional` is good later in the tutorial, but for now, please take note of that basically everything we write is a `React pure functional control` in the Vanilla approach.

In brief, they're much faster, much easier to test, much easier to understand, and force you to discard a lot of dangerous facilities, like `React state` and (not force but make easier) manual management of the `React lifecycle`.  Plus, they *always* aggressively get `shouldComponentUpdate` right, by definition.

Explanations later.  Let's not get distracted, for now. 😊

[Prev - Controls - Link](18 - controls - link.md)

[Next - Controls - App](20 - controls - app.md)
