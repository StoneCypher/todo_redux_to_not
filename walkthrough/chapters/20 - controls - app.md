### `App`
For the `Redux` app, this is just a top level layout widget.

For the `Vanilla` app, this is where the data meets the road.  This turns out to be trivially simple, though.

#### `App` the Redux Way
At this time, they are using two components which have not yet been implemented: `AddTodo` and `VisibleTodoList`.

This is fine practice, but it can be confusing, because you can't check your work as you're working (since it relies on components that don't yet exist.)  It may be of use to write dummy controls along the way.  However, since we're doing their tut, we won't do it that way here.

Their top level render approach:

```javascript
import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;
```

Fairly straightforward.  No sign of the data anywhere, at the top level.  This can be confusing to new developers.

#### `App` the Vanilla Way
Our top level, data-down approach:

```javascript
import React           from 'react';
import Footer          from 'Footer';
import AddTodo         from 'AddTodo';
import VisibleTodoList from 'VisibleTodoList';

const AppRoot = (props) => (
  <div>
    <AddTodo  {...props} />
    <TodoList {...props} />
    <Footer   {...props} />
  </div>
);

export { AppRoot };
```

Literally the only changes are taking a `props` argument, and using the **spread operator** `...` inside of a **value statement** `{ }` to pass the props down to child controls.  (*Well, and the changed non-disk-local packaging paths, and non-default `export`, I guess, but that's not about `Vanilla`; that's just using `import/export` fully.  And I changed the name of `App` to `AppRoot`, to make it clearer what that was.*)

Unrelated, we're going to use `TodoList` directly, because `VisibleTodoList` is just a set of `Redux` bindings, which we don't need, as a result.

Either way, having the data come down from the outside and go through the flows in a concretely followable path makes it much easier to figure out where the data comes from, where it's going, and to debug the whole process.  Also, since it's now a piece of vanilla JS, just a flat datastructure that you preferably won't be changing, you generally know that the problem isn't coming from your controls.

Which, incidentally, since it always comes from the outside, nets you `immutability` for free.  No need for `immutable.js` (or whatever) or its learning/implementation overhead.  😁

[Prev - Controls - Footer](19 - controls - footer.md)

[Next - Mapping State To Props](21 - Mapping State To Props.md)
