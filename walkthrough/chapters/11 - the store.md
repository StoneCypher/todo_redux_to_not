## The Store
In `Flux`es, the deal is that there are floating state objects called `store`s,
which contain your application's current state, bound to individual controls by
a messaging system and coupling.

### The Redux Way

One of the big improvements of `Redux` is that it only has one `store`.  That
reduces the complexity of knowing which `store` you're bound to, and so on.

Of course, you could just do it the `React` way and not bind to anything ever,
and use top-down pushing of vanilla data in unidirectional dataflow.  Then
there's no problem at all.

The `Redux` folk go on to explain how setting up `dispatch` and `subscribe`
cycles between your controls and a nebulous data brain, as well as managing
registration and unregistration, will make your life simpler, somehow, by
adding complexity.

Here you begin importing library code to implement expensive behind the scenes
magic for you, so that you don't have to &hellip; update a variable.

You are also encouraged to begin thinking about whether the data came from the
server and is ***attached to the window object*** in what's supposed to just be
a data storage object.  This is a sign of extreme responsibility creep.  Don't
think it stops here, folks.  (Note also that binding that to the window is a
significant security error.)

```javascript
import { createStore } from 'redux';
import todoApp from './reducers';

let store = createStore(todoApp, window.STATE_FROM_SERVER);
```

### The Vanilla Way

None of this needs to exist.

```javascript
/* nothing needs to be done here */
```

[Prev - Composer Reduction](10 - composer reduction.md)

[Next - Testing The Store](12 - testing the store.md)
