## Two more actions

You can see how rapidly this boilerplate scales.

Notice that just to update a todo, they are now advocating that you involve data
management solutions like `immutability-helper`, `updeep`, or `immutable.js`.
Consider how quickly this will get out of control, if a simple data change means
you need data management libraries for your data management layer.

### The Redux Way

At three actions:

```javascript
function todoApp(state = initialState, action) {
  switch (action.type) {

    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })

    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })

    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        })
      })

    default:
      return state

  }
}
```

### The Vanilla Way

It's just three simple member-setting one-liners (filling out the empties from earlier)

```javascript
add_todo    = todo => { this.app_state.todos.push(todo); }
toggle_todo = i    => { this.app_state.todos[i].completed = !this.app_state.todos[i].completed; }
set_vfilter = vfil => { this.app_state.vfilter = vfil; }
```

[Prev - Reducers](08 - reducers.md)

[Next - Composer Reduction](10 - composer reduction.md)
