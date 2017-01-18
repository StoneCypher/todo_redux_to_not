## Mapping the state to props
Next, `Redux` wants you to map its state to props.  Actually, we agree on this; it's the only part the Vanilla approach needs.  However, ours is a bit simpler.

### The Redux Way
So.  I actually have a very strong disagreement with this approach.  Whether or not to show `completed`s is a display issue, not a logic issue, and this should be handled in the `React` controls as a result, not in the control logic.  This is a misplacement of responsibility.

I will fix this in our Vanilla implementation *after* the comparison, because we're maintaining their presentational controls, for now.

```javascript
const getVisibleTodos = (todos, filter) => {

  switch (filter) {

    case 'SHOW_ALL':
      return todos

    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)

    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)

  }

};

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
};
```

### The Vanilla Way
Somewhat shorter.  It's another one-liner 😁

We fill out our `render` method from earlier.  We also add a parameter to the `constructor`, telling the `App` to where to render in the DOM.

This is where those top-level `props` that we keep passing down as `{...props}` actually originate: the `props` of the root control, as applied when `render`ed by `React`.  The default, standard way. 🙏

```javascript
render = () => {

  ReactDOM.render(
    <AppRoot hooks={this.hooks()} vfilter={this.app_state.vfilter} todos={this.app_state.todos} />,
    this.tgt
  );

}
```

We'll also decorate the methods that change state with a `.render` call, as well as the `constructor`.

We'll also set the `id` of the todo to the length of the `app_state.todos` list, so that it'll always be right (yay eliminating the unnecessary counter in the `Redux` tutorial!)  And, we'll bind that to `as_todos` to keep the code readable.

```javascript
constructor(tgt)  { this.app_state = { vfilter: 'SHOW_ALL', todos: [] }; this.tgt = tgt;    this.render(); }

add_todo = todo => {
  const as_todos = this.app_state.todos;
  as_todos.push({completed:false, id:as_todos.length, text:todo});
  this.render();
}

toggle_todo = i    => { this.app_state.todos[i].completed = !this.app_state.todos[i].completed; this.render(); }
set_vfilter = vfil => { this.app_state.vfilter = vfil;                                          this.render(); }
```

This means that the app now re-renders itself when its internal state changes.  Nice and tidy.  😊

This setup probably the most complex part of the Vanilla app.  (It is not complex.)

[Prev - Controls - App](20 - controls - app.md)

[Next - Controls - VisibleTodoList](22 - controls - visibletodolist.md)
