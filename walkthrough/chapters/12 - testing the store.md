## Testing Action Dispatch

Admirably, the Flux tutorial stops here, and works with the existing data store from the console, to give people an intuitive sense of how it works, instead of charging ahead to make a user interface.

### The Redux Way

Here's how they work with their current setup:

```javascript
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './actions';

// Log the initial state
console.log( store.getState() );

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe( () =>
  console.log( store.getState() );
)

// Dispatch some actions
store.dispatch( addTodo('Learn about actions') );
store.dispatch( addTodo('Learn about reducers') );
store.dispatch( addTodo('Learn about store') );
store.dispatch( toggleTodo(0) );
store.dispatch( toggleTodo(1) );
store.dispatch( setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED) );

// Stop listening to state updates
unsubscribe();
```

### The Vanilla Way

Here's the same thing in our Vanilla setup.

Note that our Vanilla setup has a significant advantage at this point: you can run two of them in parallel without any extra work to have them know about one another.  At this time, the `Redux` setup is a singleton, whether you like it or not.  😲

It's also revealing simpler usage code, with no new concepts to learn:

```javascript
import { TodoApp } from 'TodoApp';

const App = new TodoApp();

App.add_todo('Learn about no actions!');
App.add_todo('Learn about skipping reducers!');
App.add_todo('Learn about no stores :D');

App.toggle_todo(0);
App.toggle_todo(1);

App.set_vfilter('SHOW_COMPLETED');
```

You'll note that the state, in the inspector, looks exactly the same.  Using Chrome as an example, since it varies by browser:

![](./inspector_screen.png)

Note that the time machine behavior is not declinable, and if not manually managed, is better known as a "severe memory leak."  😂

> Side note about packaging
>
> You'll notice that the Redux packaging is with respect to the local filesystem.  This is the first example from the Vanilla approach, and it is *not* filesystem local.
>
> This is because Babel will compile `import/export` down to CommonJS `require`, which can *and should* handle the packaging for us.  This will prevent duplicate module inclusion (because the packager can't guarantee the file doesn't change as a build side-effect,) make the resulting package smaller and faster, and remove reliance on the developer to know the local filesystem layout, also making the code easier to modify and restructure in the process, with less maintenance and fewer opportunities for defects.
>
> It is not clear why the tutorial chooses this hard-path approach.  It may be in the expectation that future browsers can consume directly, but by then, the module loader spec will offer name registration, and it will be both unnecessary and invoke counterproductive successive HTTP2 header hits in the stream.

[Prev - The Store](11 - the store.md)

[Next - Misunderstanding Unidirectional](13 - misunderstanding unidirectional.md)
