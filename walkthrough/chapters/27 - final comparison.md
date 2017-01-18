## Complete!

We have now completed the Redux vs Vanilla tutorial.  We will, like the Redux tutorial, finish up with a complete source code listing.

I will switch to listing Vanilla first, for dramatic impact.

<img src="../Cropped Comparison.png" style="height:705px"/>

Just before I do, I'd like to point out that there is overhead at *literally every step* of the `Redux` process.  That means that the delta will actually get worse, as your application grows.  This is not something that starts "paying out as the software gets large;" rather, it gets rapidly worse.

In particular, please review the `combined reducers` section.  This means that each reducer needs to consider every single other reducer while being written.  The contrast is trivial throw-away one-liners on a JS object, like you're already used to.

Whereas most of the conceptual overhead is linear overhead (that is, the same amount of extra work at each step, eg adding an action, an action creator, a dispatch, and a reducer for a method call,) the reducer conflict issue is at least quadratic (each of N reducers must consider every other N reducer,) and once you consider that you need to interleave the timing expectations by re-diving the switch over and over, because without understanding that order you have to think non-deterministically, it's arguably exponential (each of N reducers must consider every other N reducer at every point in the timeline where it edits intermediate state.)

And then they tell you to use *middlewares* in the advanced tutorial, meaning state change reasoning becomes hyper-exponential 😱 😭 😂 😅 😰

Weirdly, while mutating state through their entire tutorial, they also advise the use of `immutable.js`, when simply not doing this means everything is default-immutable on its own.

Of particular note is that using these external stores means that every test you want to do for your controls that either are or contain `container control`s must now be in an E2E browser setup (as opposed to fast-running pure testers,) block an entire browser thread to run (instead of mass parallel,) and the test itself must set up and tear down `redux state`s for each test, as opposed to just passing a piece of plain data in and string testing the result.  ***This makes the workload of testing brain-wallopingly higher***.

Please note that these two apps are both complete, and both do approximately the same thing.

### The Vanilla Way

The vanilla way, including container HTML, clocks in at 128 lines with vertical padding, and including the `React Starter Kit` as a toy build system.  Since the `Redux` version doesn't include these, I'll use 87 as the number instead, since that's just the Javascript part.

We can break these up into a bunch of files if we want to, and it'd be smart to run this through a static Babel build, but, this is fine for making an example.

The vanilla way ends up with
  * five controls,
  * one class,
  * one instance,
  * and one library (`React`.)

`todo.html` - 87 lines (128 lines with framing), self-contained

```html
<!doctype html>
<html>

  <head>

    <script charset="utf-8" src="https://unpkg.com/react@latest/dist/react.js"></script>
    <script charset="utf-8" src="https://unpkg.com/react-dom@latest/dist/react-dom.js"></script>
    <script charset="utf-8" src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>

    <style type="text/css">

      ul                 { margin: 1em 0 0 0; padding: 0; }

      li                 { list-style-type: none; height: 1.2em; line-height: 100%; padding: 0.25em 1em;
                           margin: 0 0 1px 0; background-color: #fbfbfb; border: 1px solid #eee; border-radius: 0.5em; }

      li:before          { content: '✗'; display: inline-block; width: 1.2em; vertical-align: text-bottom; }
      li.complete:before { content: '✔'; }

      .show_link         { color: #04b; text-decoration: none; pointer: cursor; background-color: #f0f8ff;
                           border-radius: 0.5em; padding: 0 0.5em; border: 1px solid #def; }

      .show_link.active  { color: white; text-decoration: none; background-color: #004488; border-color: black; }

      .todo              { text-decoration: none;         color: black; }
      .todo.complete     { text-decoration: line-through; color: #a00;  background-color: #fdd; border-color: #fbb; }

      li, .show_link     { transition: 0.5s all; }

    </style>

    <script charset="utf-8" type="text/babel">

        const isVisible = (props) => {
                switch (props.vfilter) {
                  case 'SHOW_ALL'       : return true;
                  case 'SHOW_COMPLETED' : return props.todos[props.which].completed;
                  case 'SHOW_ACTIVE'    : return !props.todos[props.which].completed;
                  default               : throw `no such visibility - ${props.vfilter}`;
                }
              };

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

        const Todo = (props) => {
                const thisTodo = props.todos[props.which],
                      toggler  = () => props.hooks.toggle_todo(props.which);

                return ( isVisible(props)?
                  ( <li onClick={toggler} className={`todo${thisTodo.completed? ' complete':''}`}>{thisTodo.text}</li> )
                  : null
                );
              };

        const TodoList = (props) => (
                <ul>
                  {props.todos.map(todo => <Todo key={todo.id} which={todo.id} {...props} onClick={() => hooks.onTodoClick(todo.id)}/>)}
                </ul>
              );

        const AppRoot = (props) => (
                <div>
                  <AddTodo  {...props} />
                  <TodoList {...props} />
                  <Footer   {...props} />
                </div>
              )

        const ShowLink      = (myHook, myText) => <a href="#" className="show_link" onClick={myHook}>{myText}</a>,

              ShowAll       = (props)          => ShowLink( () => props.hooks.set_vfilter('SHOW_ALL'),       'All'       ),
              ShowActive    = (props)          => ShowLink( () => props.hooks.set_vfilter('SHOW_ACTIVE'),    'Active'    ),
              ShowCompleted = (props)          => ShowLink( () => props.hooks.set_vfilter('SHOW_COMPLETED'), 'Completed' ),

              Footer        = (props)          => <p>Show: {<ShowAll {...props}/>}, {<ShowActive {...props}/>}, {<ShowCompleted {...props}/>}</p>;


        class TodoApp {

                constructor(tgt)        { this.app_state = { vfilter: 'SHOW_ALL', todos: [] }; this.tgt = tgt; }

                current_state = ()   => { return this.app_state; }

                add_todo      = todo => {
                  const as_todos = this.app_state.todos;
                  as_todos.push({completed:false, id:as_todos.length, text:todo});
                  this.render();
                }

                toggle_todo   = i    => { this.app_state.todos[i].completed = !this.app_state.todos[i].completed; this.render(); }
                set_vfilter   = vfil => { this.app_state.vfilter = vfil;                                          this.render(); }

                hooks         = ()   => { return { add_todo: this.add_todo, toggle_todo: this.toggle_todo, set_vfilter: this.set_vfilter }; }

                render        = ()   => {

                  ReactDOM.render(
                    <AppRoot hooks={this.hooks()} vfilter={this.app_state.vfilter} todos={this.app_state.todos} />,
                    this.tgt
                  );

                }

              }

        const TheApp = new TodoApp(document.getElementById('tgt'));
              TheApp.render();

    </script>

  </head>

  <body><div id="tgt"></div></body>

</html>
```

### The Redux Way

And, the official `Redux` approach clocks in at a whopping 293 lines.  This does not include HTML, a packager, or a build script; this code does not run out of the box, and needs to have at least `Babel` and either `webpack` or `browserify` added to it.

***This means that the Vanilla version is only 29% the size***.

This also requires the introduction of a minimum of two new packages from `npm`, and encourages the use of two others.

The `Redux` way ends up with
  * eight internal controls,
  * one inherited control (`<Provider>`,)
  * one class,
  * five reducer functions,
    * a reducer condenser function,
  * three action creator functions,
  * two dispatch functions,
  * two state mapping to props functions,
  * a state filter predicate,
  * a state matcher function,
  * three libraries (`React`, `Redux`, and `redux-react`,)
    * suggests two more (`immutable.js` and `reselect`,)
  * six sets of bindings,
  * a `store` class instance,
  * creates both `module` and `function instance` scoped state in five places outside the `store`,
  * modifies the `state` on the way through the controls (becomes a maintenance nightmare,)

`index.js` - 15 lines

```javascript
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

`actions/index.js` - 22 lines

```javascript
let nextTodoId = 0
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}
```

`reducers/todos.js` - 39 lines

```javascript
const todo = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        completed: !state.completed
      })

    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}

export default todos
```

`reducers/visibilityFilter.js` - 10 lines

```javascript
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter
```

`reducers/index.js` - 10 lines

```javascript
import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

export default todoApp
```

`components/Todo.js` - 20 lines

```javascript
import React, { PropTypes } from 'react'

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
```

`components/TodoList.js` - 25 lines

```javascript
import React, { PropTypes } from 'react'
import Todo from './Todo'

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
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

export default TodoList
```

`components/Link.js` - 26 lines

```javascript
import React, { PropTypes } from 'react'

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link
```

`components/Footer.js` - 22 lines

```javascript
import React from 'react'
import FilterLink from '../containers/FilterLink'

const Footer = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">
      Completed
    </FilterLink>
  </p>
)

export default Footer
```

`components/App.js` - 14 lines

```javascript
import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App
```

`containers/VisibleTodoList.js` - 35 lines

```javascript
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

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

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
```

`containers/FilterLink.js` - 24 lines

```javascript
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink
```

`containers/AddTodo.js` - 31 lines

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

[Prev - CSS](26 - css.md)

[Back to start - Intro](01 - intro.md)
