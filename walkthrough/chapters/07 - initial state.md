## Initial state

Next the `Redux` path creates an initial state, and shows how to integrate that
with their reducer behavior step.

We'll just make a class member.

### The Redux way

```javascript
const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
}

function todoApp(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  return state
}
```

### The Vanilla Way

The Vanilla way is a one-liner in the constructor.

```javascript
// inside class TodoApp
constructor() { this.app_state = { vfilter: 'SHOW_ALL', todos: [] }; }
```

We'll also add a convenience one-liner to check the current state.

```javascript
// inside class TodoApp
current_state() { return this.app_state; }
```

[Prev - Data State](06 - data state.md)

[Next - Reducers](08 - reducers.md)
