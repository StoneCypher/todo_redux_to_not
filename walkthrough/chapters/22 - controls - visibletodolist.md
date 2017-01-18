## First container component's boilerplate: `VisibleTodoList`

`Redux` wants a control to govern the data going into the other control from the store, which is bound and `connect`ed to the `Redux` store.

### The Redux Way
So, the `Redux` system uses a control called `VisibleTodoList` to implement a `Redux` filter over `TodoList`, to remove the things that should not fix the `Redux` filter, giving a layer of data indirection and hidden magic.

```javascript
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}
```

Note that this isn't even the control implementation of `VisibleTodoList`; this is just its communications boilerplate. 😱

This also comes with a discussion of what `Redux.connect()` is, whether `shouldComponentUpdate` is necessary (it's literally never necessary with pure controls,) when and how to dispatch actions *as a result of reading data*, and computing derived data with `reselect`.

This is communicated as the basics of reading state with the `Redux API`.

### The Vanilla Way

None of this needs to exist.  Instead, we just implement a one-liner on the `Todo` itself, and a function that governs visibility.  A major upside of this approach is that *the data state is not transformed on its way down the tree*.  This eliminates many, many classes of bug that have to do with state manipulation within controls, and makes the manipulators pure functions that are **radically easier to test**.

The alteration to the `Todo` control is easy: add a `?:` *ternary select* to the result of a call to a new function we'll make, `isVisible`, and if it gets a true, return the previous control; if not, return `null`, which is how `React` expresses "nothing."

Then, the function to say whether a given visibility state is pretty similar, but it's a pure Javascript function - just a switch - with no side effects, no dispatching, and which is trivially easy to test (without e2e) and maintain.

```javascript
const Todo = (props) =>
  ( isVisible(props)?
      (<li onClick={props.onClick} className={`todo ${props.completed? 'complete':null}`}>{props.text}</li>)
    : null
  );

const isVisible = (props) => {
  switch (props.vfilter) {
    case 'SHOW_ALL'       : return true;
    case 'SHOW_COMPLETED' : return props.todos[props.which].completed;
    case 'SHOW_ACTIVE'    : return !props.todos[props.which].completed;
    default               : throw `no such visibility - ${props.vfilter}`;
  }
};
```

[Prev - Mapping State To Props](21 - mapping state to props.md)

[Next - Controls - FilterLink](23 - controls - filterlink.md)
