### `TodoList`
This represents a list of `Todo` items.

#### `TodoList` the Redux Way
Also a fairly straightforward presentational control.

```javascript
import React, { PropTypes } from 'react';
import Todo from './Todo';

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
};

export default TodoList;
```

#### `TodoList` the Vanilla Way
In Vanilla, we would write

```javascript
import React from 'react';
import Todo  from 'Todo';

const TodoList = (props) => (
  <ul>
    {props.todos.map(todo => <Todo key={todo.id} which={todo.id} {...props} onClick={() => hooks.onTodoClick(todo.id)}/>)}
  </ul>
);

export { TodoList };
```

[Prev - Controls - Todo](16 - controls - todo.md)

[Next - Controls - Link](18 - controls - link.md)
