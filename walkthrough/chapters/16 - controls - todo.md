### `Todo`
Let's do the controls one by one, like their tutorial does.  `Todo` is a control representing a single to-do item.

#### `Todo` the Redux Way

```javascript
import React, { PropTypes } from 'react';

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default Todo
```

#### `Todo` the Vanilla Way

This could just as easily be

```javascript
import React, { PropTypes } from 'react';

const Todo = ({ onClick, completed, text }) =>
  (<li onClick={onClick} className={`todo ${props.completed? 'complete':null}`}>{text}</li>);

Todo.propTypes = {
  onClick   : PropTypes.func.isRequired,
  completed : PropTypes.bool.isRequired,
  text      : PropTypes.string.isRequired
};

export { Todo };
```

Or honestly, with a control this simple, you could simply drop proptypes, whose value is mostly in vetting the complex data going into larger widgets, and instead write

```javascript
import React from 'react';

const Todo = ({ onClick, completed, text }) =>
  (<li onClick={onClick} className={`todo ${completed? 'complete':null}`}>{text}</li>);

export { Todo };
```

This also moves the styling issue to `CSS` where it belongs, allowing responsive and blah blah blah.  So we'll support that with

```css
.todo.complete { text-decoration: line-through; }
```

[Prev - Actual Presentational Controls](15 - actual presentational controls.md)

[Next - Controls - TodoList](17 - controls - todolist.md)
