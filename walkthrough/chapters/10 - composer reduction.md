## Composer reduction
Now, at three actions for the entire app, the `Redux` tutorial talks about
keeping things easier to comprehend, and starts advocating subdividing your
central function for updates, just previously held up as the reason this was
easy to understand.  They talk about `reducer composition` as a central behavior
of a `Redux` app.

Because if there's one thing you want in a data layer that's meant to keep
things simple with no boilerplate in a pure function, it's a tutorial that
starts showing complexity reduction strategies with three simple calls while
discussing that managing its complexity is a core behavior of downstream apps,
after referring to its impurity tactics as an advanced topic.

![](../tommy lee jones.jpg)

### The New Simpler Redux Way

After three simplifications, they come up with this longer, more complex code.

```javascript
import { combineReducers } from 'redux'
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
```

### The Vanilla Way

Those three one-liners we had before can stand, thanks.

```javascript
/* no changes */
```

[Prev - Two More Actions](09 - two more actions.md)

[Next - The Store](11 - the store.md)
