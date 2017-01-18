## Reducers

A concept taken incorrectly from `clojure`, reducers are the way that messages
are to be interpreted by `Redux`.  State is described as an object passed in,
along with the state change message, and the new state passed back out is a
distinct derived state.

In some ways this is appealing.  However, you don't need redux for this in any
way.  We'll re-implement the vanilla app as reducers at the end, but for now
we're showing the no-nonsense approach, so, let's just be direct, the first
time; we can go for the fancy way later.

It's worth noting that while they talk a good game about this turning the
application into a no-state calculation, that isn't actually true; this sets up
extensive bindings throughout the application, imposes the `react` facility
called `state` (different, confusingly, from `Redux state`) on the controls
where it need not exist, and seems to take the position that somehow without its
imposition, you can't have pure functional `react`, when indeed it doesn't work
under `react`'s pure functional controls.

Note also that they immediately mention the need for involving side effects, but
also say that it's difficult and belongs in the advanced tutorial.  This is two
warnings at once: one, that they actually know this isn't a pure function at
all, since they have a direct tutorial on how to involve side effects, which are
the defining difference of pure functions; and two, that side effects, which are
literally the entire purpose of a function that takes a state and returns a new
state on application of a message, are difficult to interleave.  Sadly, this is
most of what a web application does in code, since everything else is
declarative.  Management structures which make common behaviors more difficult
are nearly always a net lose.

Note that they next switch into another long discussion of boilerplate, how
some people don't like `switch`, how they want you to use something that some
browsers don't implement, so you need a shim or a library, insist that code in
front of your face isn't real boilerplate and invoke their reducing boilerplate
document at the same time, et cetera.

### The Redux Way

We augment our reducer to add the ability to provide a new mutated state.

```javascript
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}
```

That switch grows by a case for every single message.  Anything you build in
another file needs to go through here.

### The Vanilla Way

We just set the member variable.

```javascript
// inside class TodoApp
set_vfilter = vfil => appstate.vfilter = vfil
```

[Prev - Initial State](07 - initial state.md)

[Next - Two More Actions](09 - two more actions.md)
