## `AddTodo`
Next we have the control that `Redux` called difficult earlier, since it might be a `container` and it might not.

### The Redux Way
Redux' implementation is a lot of work for a handler control.  It also involves an `HTML5 Form`, which causes some CORS problems in locked down contexts, for similar reasons to `iframe`s.

```javascript
import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo
```

It's a little weird that this is a `let` rather than a `const` naming.  However, note that `Redux` uses pure functional controls at every opportunity, and reminds you to do the same.

There's no reason for that to not be everywhere, and the benefits are dramatic.

Notice also that the `Redux` implementation has now silently added the use of `ref`s, which the official `React` docs tell you to stay away from.  `ref`s are a way to get a handle to an instance, which you're very much not supposed to do.  They're a hidden tool for testing, and they're likely to disappear in `React 2`, so a lot of code is going to have a huge overhaul cost.

### The Vanilla Way
Pretty much just standard JS, and a call to the hook.

```javascript
import React from 'react';

const AddTodo = (props) => {
  const clicker = () => {
    const AT = document.getElementById('add_todo');
    props.hooks.add_todo(AT.value);
    AT.value = '';
  }
  return (
    <div>
      <input id="add_todo" onKeyUp={event => { if (event.key === 'Enter') { clicker(); }}}/>
      <input type="button" onClick={clicker} value="Add todo"/>
    </div>
  );
};
```

[Prev - Controls - FilterLink](23 - controls - filterlink.md)

[Next - Controls - Provider](25 - controls - provider.md)
