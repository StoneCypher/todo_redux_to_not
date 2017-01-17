# TODO

* reimplement as reducers at the end
* slide show version?

----

# Walkthrough

We're going to do the [Redux Basics tutorial](http://redux.js.org/docs/basics/)
in parallel with a vanilla implementation.



<br/><br/><br/>
## Getting started

So what we'll do is go through their tutorial's steps, quickly, in both
approaches in parallel, to show how the costs of each approach compare.

### The Redux Way

In `Redux`, you start from an empty page.

```javascript
/* empty */
```

### The Vanilla Way

In `vanilla`, we will choose to start with a class `TodoApp`, which has two
methods: one that triggers a visual re-render, and one that provides the list
of "hooks," which are functions my class offers for communications (essentially
an API contract.)

Render will be an empty function, since we haven't defined any behavior yet.
Hooks will return an empty object, which will eventually contain functions as
described.

```javascript
class TodoApp {
    render = () => { /* do nothing yet */ }
    hooks  = () => { return {}; }
}

export { TodoApp };
```



<br/><br/><br/>
## Actions

In `Redux`, you have `Actions`, which represent messages sent to the `Store` to
manipulate data within the store.  The official `Redux` tutorial starts with
three actions that do nothing but announce themselves, to keep steps admirably
small to make things make sense.

We will instead provide three callback hooks for announcements.

### Redux way

```javascript
export const ADD_TODO              = 'ADD_TODO'
export const TOGGLE_TODO           = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const VisibilityFilters = {
  SHOW_ALL       : 'SHOW_ALL',
  SHOW_COMPLETED : 'SHOW_COMPLETED',
  SHOW_ACTIVE    : 'SHOW_ACTIVE'
};
```

### The Vanilla Way

In vanilla, we choose to have hooks (hooks are just callbacks under a
descriptive name which better indicates that their intent is to create a
callback API for the outside.)

So, we'll instead offer

```javascript
// inside class TodoApp
add_todo(todo)    { /* not yet implemented */ }
toggle_todo(i)    { /* not yet implemented */ }
set_vfilter(vfil) { /* not yet implemented */ }
```

<br/><br/><br/>
## Action creators

In redux, every action comes with a factory function to make examples, called an
"action creator."  They take the time to point out that the phrasing can be
confusing.  Then they point out that theirs work differently than mainstream
Flux, and make still another term, "bound action creators," to refer to Flux
style action creators, which call dispatch once they're used.

Which gets into dispatch, which is later.

In Vanilla, they're just function calls, so there's no need to make anything
to create a function call.

### Redux way

```javascript
export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
```

### The Vanilla Way

```javascript
/* nothing is needed here */
```

<br/><br/><br/>
## Data state

The tutorial chooses the following data shape for the application.  To keep
things easy to compare, we will use the same data shape in our vanilla app. I
edited the text, though.

I actually would do this differently in the vanilla app if we weren't trying to
keep things simple to compare.  It's not particularly helpful to stuff all the
state into a single object, unless you're trying to pretend that functional
programming means routing the entire state through a handler for every single
call.

Note that the official tutorial nearly immediately gets into discouraging
heirarchy.  Heirarchy is important, and this reflects one of the many weaknesses
of pretending that your application state is always a key-value store.

```javascript
{
  visibilityFilter: 'SHOW_ALL',

  todos: [
    {
      text: 'Consider *not* using Redux',
      completed: true,
    },
    {
      text: 'You don\'t need libraries to use a tree for state; it\'s just a JS object',
      completed: false
    }
  ]
}
```

<br/><br/><br/>
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

<br/><br/><br/>
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

<br/><br/><br/>
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
add_todo(todo)    { this.app_state.todos.push(todo); }
toggle_todo(i)    { this.app_state.todos[i].completed = !this.app_state.todos[i].completed; }
set_vfilter(vfil) { this.app_state.vfilter = vfil; }
```

<br/><br/><br/>
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

![](./tommy lee jones.jpg)

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

<br/><br/><br/>
## The Store
In `Flux`es, the deal is that there are floating state objects called `store`s,
which contain your application's current state, bound to individual controls by
a messaging system and coupling.

### The Redux Way

One of the big improvements of `Redux` is that it only has one `store`.  That
reduces the complexity of knowing which `store` you're bound to, and so on.

Of course, you could just do it the `React` way and not bind to anything ever,
and use top-down pushing of vanilla data in unidirectional dataflow.  Then
there's no problem at all.

The `Redux` folk go on to explain how setting up `dispatch` and `subscribe`
cycles between your controls and a nebulous data brain, as well as managing
registration and unregistration, will make your life simpler, somehow, by
adding complexity.

Here you begin importing library code to implement expensive behind the scenes
magic for you, so that you don't have to &hellip; update a variable.

You are also encouraged to begin thinking about whether the data came from the
server and is ***attached to the window object*** in what's supposed to just be
a data storage object.  This is a sign of extreme responsibility creep.  Don't
think it stops here, folks.  (Note also that binding that to the window is a
significant security error.)

```javascript
import { createStore } from 'redux';
import todoApp from './reducers';

let store = createStore(todoApp, window.STATE_FROM_SERVER);
```

### The Vanilla Way

None of this needs to exist.

```javascript
/* nothing needs to be done here */
```

<br/><br/><br/>
## Testing Action Dispatch

Admirably, the Flux tutorial stops here, and works with the existing data store from the console, to give people an intuitive sense of how it works, instead of charging ahead to make a user interface.

### The Redux Way

Here's how they work with their current setup:

```javascript
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './actions';

// Log the initial state
console.log( store.getState() );

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe( () =>
  console.log( store.getState() );
)

// Dispatch some actions
store.dispatch( addTodo('Learn about actions') );
store.dispatch( addTodo('Learn about reducers') );
store.dispatch( addTodo('Learn about store') );
store.dispatch( toggleTodo(0) );
store.dispatch( toggleTodo(1) );
store.dispatch( setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED) );

// Stop listening to state updates
unsubscribe();
```

### The Vanilla Way

Here's the same thing in our Vanilla setup.

Note that our Vanilla setup has a significant advantage at this point: you can run two of them in parallel without any extra work to have them know about one another.  At this time, the `Redux` setup is a singleton, whether you like it or not.  😲

It's also revealing simpler usage code, with no new concepts to learn:

```javascript
import { TodoApp } from 'TodoApp';

const App = new TodoApp();

App.add_todo('Learn about no actions!');
App.add_todo('Learn about skipping reducers!');
App.add_todo('Learn about no stores :D');

App.toggle_todo(0);
App.toggle_todo(1);

App.set_vfilter('SHOW_COMPLETED');
```

You'll note that the state, in the inspector, looks exactly the same.  Using Chrome as an example, since it varies by browser:

![](./inspector_screen.png)

Note that the time machine behavior is not declinable, and if not manually managed, is better known as a "severe memory leak."  😂

> Side note about packaging
>
> You'll notice that the Redux packaging is with respect to the local filesystem.  This is the first example from the Vanilla approach, and it is *not* filesystem local.
>
> This is because Babel will compile `import/export` down to CommonJS `require`, which can *and should* handle the packaging for us.  This will prevent duplicate module inclusion (because the packager can't guarantee the file doesn't change as a build side-effect,) make the resulting package smaller and faster, and remove reliance on the developer to know the local filesystem layout, also making the code easier to modify and restructure in the process, with less maintenance and fewer opportunities for defects.
>
> It is not clear why the tutorial chooses this hard-path approach.  It may be in the expectation that future browsers can consume directly, but by then, the module loader spec will offer name registration, and it will be both unnecessary and invoke counterproductive successive HTTP2 header hits in the stream.

<br/><br/><br/>
## Misunderstanding unidirectional

One of the most unfortunate things about the `Flux` community is insisting on misunderstanding unidirectional dataflow.

In React, unidirectional dataflow means "data that only flows downwards from a single flat-data origin point at root."

In Flux, unidirectional dataflow somehow means "data that flows down from many points as bound to a store, then back upwards in a loop."

It's a fine alternate approach, but it makes it nearly impossible for `React` developers to explain one of `React`'s biggest advantages, because their chosen label has been co-opted for nearly the opposite: "unidirectional" meaning "data goes both ways, up and down, in a collection of loops."

The `Redux` tutorial proceeds to teach this idea.

The Vanilla app has `React`'s usage of this term instead.  I'll rephrase it as "top down no-cycle flat data rendering."  The advantage is that the controls never need state, and the controls never need knowledge of the providing application.  This second point has ***huge*** implications for easy, convenient testing: no need for mocks, spies, or injection; just provide test handlers as pure functions, and you're done.

### The Redux Way

A two printed page tutorial on what's actually happening when you update applicaton state, involving reinforcing the new concepts of `store`s, `dispatcher`s, `action`s, `action creator`s, `reducer function`s, computing the `next state`, `root reducer`s, the possibility of `combined reduction`s, making `single state tree`s, and what the `Redux Store` is doing with the `complete state tree`.

Also below the "next steps" link, there's a note for advanced users to check out `async flow` in the advanced tutorial, to learn how `middleware` transforms `async action`s before they reach the `reducer`s.

### The Vanilla Way

Setting a member variable in pure Javascript, with no new concepts, and moving on with life.

<br/><br/><br/>
## Connecting to a React App
Let's get our data connected to a `React` renderer.

### The Redux Way

Now you're expected to install *an entire extra package* to set up "React Redux Bindings."  Note that the entire purpose of React originally was to get away from bindings, as they don't scale conceptually or in browser performance, according to the original React team.

Next we're introduced to a Redux concept called "presentational components" and "container components."  The entire purpose of this new divide is to accomodate that Redux forces you to use the `React` facility called `state` (which is confusingly different than `Redux State`,) and a tacit admission that state in controls is `Very Bad`&trade; and should be kept to an absolute minimum.

We're exhorted to use "presentational component"s as much as possible.

Of course, the actual absolute minimum is zero, which the Vanilla approach achieves, which `Redux` cannot.  But, let's proceed.

```
npm install --save react-redux
```

Note that `container components` in their tutorial also require awareness of `Redux`.  This means that things made as container components in `Redux` will not be available without `Redux` - not only are you locked out of other `Flux`es like `Omniscient`, `Marty`, `Material Flux`, `Flux This`, and `Fluxible`, but also more exotic data managers like `mobx`, `GraphQL`, `Relay`, `Cortex`, `w3c web component`s, or pure Vanilla controls.

On the other hand, pure vanilla controls are just functions, and can be used by literally any other implementation.  It's a one-way requirement street, and a form of extreme lock-in.

Here's their comparison table, with Vanilla added:

|                | Vanilla components          | Presentational Components        | Container Components                           |
| -------------: | :-------------------------- | :------------------------------- | :--------------------------------------------- |
| Purpose        | Anything                    | How things look (markup, styles) | How things work (data fetching, state updates) |
| Aware of Redux | No                          | No                               | Yes                                            |
| To read data   | Read data from props        | Read data from props             | Subscribe to Redux state                       |
| To change data | Invoke callbacks from props | Invoke callbacks from props      | Dispatch Redux actions                         |
| Are written    | By hand                     | By hand                          | Usually generated by React Redux               |

Notice anything?

The "presentational components" are pretty close to just normal Vanilla `React` components.  And we're supposed to use them as much as we can.

The difference with `Redux` controls is we're to make them `Redux` aware, add a bunch of boilerplate, handle pub/sub, handle dispatch, and get our stuff generated by some tool for us.

And we're supposed to do that as little as possible.  (As little as possible is zero.  In `Redux` terminology, a Vanilla `React` app is just pure "presentational component"s.)

All we need to do is accept that the `Redux` bindings aren't actually necessary, and we can follow their advice and go pure "presentational," and drop three libraries, 14 concepts, ~40-50% of code, and huge CPU overhead, in the process.  😉

<br/><br/><br/>
## Designing components
Now we get into the divide of "presentational" and "container" components as a design issue.  In the Vanilla approach, there are only "presentational" controls, and this entire design step and planning step is eliminated.  Less non-product thinking, and fewer opportunities for mistakes.

The `Redux` tutorial even tips its hat that these decisions can be hard to make, even in tiny things like toy Todo apps such as this one.

> Sometimes it's hard to tell if some component should be a presentational component or a container. For example, sometimes form and function are really coupled together, such as in case of this tiny component:
>
> * AddTodo is an input field with an “Add” button
>
> Technically we could split it into two components but it might be too early at this stage. It's fine to mix presentation and logic in a component that is very small. As it grows, it will be more obvious how to split it, so we'll leave it mixed.

If decisions are difficult at this scale, imagine how difficult they can be in large single-page applications whose nature changes over time!

### The Redux Way

So, `Redux` wants to do "presentational" controls first.

### The Redux Presentational Way

  * `TodoList` is a list showing visible todos.
    * `todos`: Array is an array of todo items with { id, text, completed } shape.
    * `onTodoClick(id: number)` is a callback to invoke when a todo is clicked.
  * `Todo` is a single todo item.
    * `text`: string is the text to show.
    * `completed`: boolean is whether todo should appear crossed out.
    * `onClick()` is a callback to invoke when a todo is clicked.
  * `Link` is a link with a callback.
    * `onClick()` is a callback to invoke when link is clicked.
  * `Footer` is where we let the user change currently visible todos.
  * `App` is the root component that renders everything else.

Notice that `Redux` is even paying lip service to that some of its controls are locked to `Redux` forever, by pointing out that the others aren't, as if that's an advantage rather than a partially escaped severe limitation:

> If you migrate from Redux to something else, you'll be able to keep all these components exactly the same. They have no dependency on Redux.

This is a ***🚩severe red flag🚩***.  Components are not locked to data layers in most of the non-Fluxes.

#### The Redux Container Way

Now we define the rest of it.  They've done a pretty good job of containing the library infiltration, though of course, it could be total (which would eliminate the need for `Redux`, so, they won't.)

  * `VisibleTodoList` filters the todos according to the current visibility filter and renders a `TodoList`.
  * `FilterLink` gets the current visibility filter and renders a `Link`.
    * `filter`: string is the visibility filter it represents.

### The Vanilla Way

We can run with near relatives of their controls for now.  I'd actually like a different, simpler structure, but for the sake of the comparison it's nice to keep it this way.  (I can make the other structure after the fact, too.  😀)

Note that we will use the same control structure, ***but they will all be "presentational control"s***.

<br/><br/><br/>
## Actual presentational controls

So, we can use their presentational controls in a fairly similar way.  I will slightly rewrite them to support passing data down, and reduce their size a bit in the process.

There are some very strange splittings of responsibilities in this code, some of which justify a `Store` existing; they lead to more complex controls than are necessary. We will eliminate some of these splits in the process, but not all of them up front, because it would lead to difficult to compare code, once some of the structural noise was removed; we'll do that at the end, instead.

<br/>
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
.todo.completed { text-decoration: line-through; }
```

<br/>
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

const TodoList = ({hooks, todos, onTodoClick}) => (
  <ul>
    {todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => hooks.onTodoClick(todo.id)}/>)}
  </ul>
);

export { TodoList };
```

<br/>
### `Link`
This *really* shouldn't be called `Link` 😒  Not only does this not describe what it does, but it collides with the name of common controls, like the `Link` in `react-router`, which arguably also shouldn't be called `Link`.

But, it is what it is.

`Link` expresses the binding between a dispatch on an anchor and the action the anchor represents.

Vanilla doesn't need this object at all.

#### `Link` the Redux Way

```javascript
import React, { PropTypes } from 'react';

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
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Link;
```

#### `Link` the Vanilla Way
Vanilla does not want this control at all.  It serves only to express a convenience wrapping for `Redux` internals.

```javascript
/* this space intentionally left blank */
```

<br/>
### `Footer`
`Footer` represents (shocker!) the application's footer bar.

#### `Footer` the Redux Way
Their implementation of `Footer` relies on a control called `FilterLink` that they implement later.

```javascript
import React from 'react';
import FilterLink from '../containers/FilterLink';

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
);

export default Footer;
```

#### `Footer` the Vanilla Way
We don't need `FilterLink` in Vanilla because it's an expression of `Redux` binding, so we'll just skip using it in our own code.

`ShowLink` is essentially the same thing, but without the `Redux` bindings, and also folding in an expression convenience, for much shorter, less repetitive, more maintainable, and more testable code.  It also ends us up with less live overhead, since this is all computable as a one-time

We could choose to write this differently, as a result:

```javascript
import React      from 'react';

const ShowLink      = (myHook, myText) => <a className="clickable" onClick={myHook}>myText</FilterLink>,

      ShowAll       = (props)          => ShowLink(props.hooks.set_vfilter('SHOW_ALL')},       'All'),
      ShowActive    = (props)          => ShowLink(props.hooks.set_vfilter('SHOW_ACTIVE')},    'Active'),
      ShowCompleted = (props)          => ShowLink(props.hooks.set_vfilter('SHOW_COMPLETED')}, 'Completed'),

      Footer        = (props)          => <p>Show: {<ShowAll {...props}/>}, {<ShowActive {...props}/>}, {<ShowCompleted {...props}/>}</p>;

export { Footer };
```

One change to note is that we are manually passing the `props` down in `{...props}` a lot.  That's mildly annoying, but it allows us to ditch all of `Redux` as a result, and there's never anything to debug or understand, or any `Redux` lock-in, so it's a good trade.

These are all `React pure functional controls`.  `React` offers three mechanisms to create controls at the time of this writing:

* "Classic controls" with `React.createComponent`
* "ES6 controls" with `class Foo extends React.component`
* "Pure functional controls" with `const Foo = (props) => <div>lol</div>`;

We'll discuss why being `pure functional` is good later in the tutorial, but for now, please take note of that basically everything we write is a `React pure functional control` in the Vanilla approach.

In brief, they're much faster, much easier to test, much easier to understand, and force you to discard a lot of dangerous facilities, like `React state` and (not force but make easier) manual management of the `React lifecycle`.  Plus, they *always* aggressively get `shouldComponentUpdate` right, by definition.

Explanations later.  Let's not get distracted, for now. 😊

### `App`
For the `Redux` app, this is just a top level layout widget.

For the `Vanilla` app, this is where the data meets the road.  This turns out to be trivially simple, though.

#### `App` the Redux Way
At this time, they are using two components which have not yet been implemented: `AddTodo` and `VisibleTodoList`.

This is fine practice, but it can be confusing, because you can't check your work as you're working (since it relies on components that don't yet exist.)  It may be of use to write dummy controls along the way.  However, since we're doing their tut, we won't do it that way here.

Their top level render approach:

```javascript
import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;
```

Fairly straightforward.  No sign of the data anywhere, at the top level.  This can be confusing to new developers.

#### `App` the Vanilla Way
Our top level, data-down approach:

```javascript
import React           from 'react';
import Footer          from 'Footer';
import AddTodo         from 'AddTodo';
import VisibleTodoList from 'VisibleTodoList';

const App = (props) => (
  <div>
    <AddTodo  {...props} />
    <TodoList {...props} />
    <Footer   {...props} />
  </div>
)

export { App };  // honestly I'd like a more descriptive control name
```

Literally the only changes are taking a `props` argument, and using the **spread operator** `...` inside of a **value statement** `{ }` to pass the props down to child controls.  (*Well, and the changed non-disk-local packaging paths, and non-default `export`, I guess, but that's not about `Vanilla`; that's just using `import/export` fully.*)

Unrelated, we're going to use `TodoList` directly, because `VisibleTodoList` is just a set of `Redux` bindings, which we don't need, as a result.

Either way, having the data come down from the outside and go through the flows in a concretely followable path makes it much easier to figure out where the data comes from, where it's going, and to debug the whole process.  Also, since it's now a piece of vanilla JS, just a flat datastructure that you preferably won't be changing, you generally know that the problem isn't coming from your controls.

Which, incidentally, since it always comes from the outside, nets you `immutability` for free.  No need for `immutable.js` (or whatever) or its learning/implementation overhead.  😁



<br/><br/><br/>
%% COMEBACK

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
render() {

    ReactDOM.render(
        <App hooks={this.hooks()} vfilter={this.app_state.vfilter} todos={this.app_state.todos} />,
        this.dom_target
    );

}
```

We'll also decorate the methods that change state with a `.render` call, as well as the `constructor`.

```javascript
constructor(tgt)  { this.app_state = { vfilter: 'SHOW_ALL', todos: [] }; this.tgt = tgt;    this.render(); }

add_todo(todo)    { this.app_state.todos.push({completed:false, text:todo});                this.render(); }
toggle_todo(i)    { this.app_state.todos[i].completed = !this.app_state.todos[i].completed; this.render(); }
set_vfilter(vfil) { this.app_state.vfilter = vfil;                                          this.render(); }
```

This means that the app now re-renders itself when its internal state changes.  Nice and tidy.  😊

This setup probably the most complex part of the Vanilla app.  (It is not complex.)

<br/>
## First container component's boilerplate: `VisibleTodoList`

`Redux` wants a control to govern the data going into the other control from the store, which is bound and `connect`ed to the `Redux` store.

### The Redux Way
So, the `Redux` system uses a control called `VisibleTodoList` to implement a `Redux` filter over `TodoList`, to remove the things that should not fix the `Redux` filter, giving a layer of data indirection and hidden magic.  Because this determines whether the nodes exist *at all*, you can no longer use CSS animations to handle visual transitions, and you'll get a fair amount of DOM thrash and render thrash any time a very large list is rendered, quickly leading to yet another layer of indirection when someone needs to implement a windowing function.

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

const isVisible(props) => {
  switch (props.vfilter) {
    case 'SHOW_ALL'       : return true;
    case 'SHOW_COMPLETED' : return props.todos[props.key].completed;
    case 'SHOW_ACTIVE'    : return !props.todos[props.key].completed;
    default               : throw 'no such visibility';
  }
}
```



<br/><br/><br/>
## `FilterLink`

This control is a convenience method to make `Redux` bindings and handle dispatching.  It does not need to exist in the Vanilla approach.

### The Redux Way

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

### The Vanilla Way
We already did the JS part for this, earlier.  As a result, this is another no-op.

```javascript
/* let's see what's in the box?  nothing! */
```



<br/><br/><br/>
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

const AddTodo = (props) =>
  (
    <div>
      <input id="add_todo"/>
      <input type="button" onClick={() => props.hooks.add_todo(document.getElementById('add_todo').value)}/>
    </div>
  );
```

<br/><br/><br/>
## `Provider`

Next, a `Redux` app needs for its `store` to be made available to all the `container control`s.

Since the Vanilla way doesn't have such a thing, this is unnecessary for us.

### The Redux Way

The `Redux` tutorial advises us to use - their words - a "magical" control called `Provider` which "makes the Store available to all your containers."

This magic has had four sets of breaking API changes that required overhauls; `Redux` and `react-router` are community-famous for this.

This is a particularly steep learning curve because you need to go on a source dive to learn how this actually works under the hood.

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

### The Vanilla Way

This doesn't need to exist.

```
/* Look at all the nothing (sound_of_music.jpg) */
```



<br/><br/><br/>
## Complete!

We have now completed the Redux vs Vanilla tutorial.  We will, like the Redux tutorial, finish up with a complete source code listing.

I will switch to listing Vanilla first, for dramatic impact.

Just before I do, I'd like to point out that there is overhead at *literally every step* of the `Redux` process.  That means that the delta will actually get worse, as your application grows.  This is not something that starts "paying out as the software gets large;" rather, it gets rapidly worse.

In particular, please review the `combined reducers` section.  This means that each reducer needs to consider every single other reducer while being written.  The contrast is trivial throw-away one-liners on a JS object, like you're already used to.

Whereas most of the conceptual overhead is linear overhead (that is, the same amount of extra work at each step, eg adding an action, an action creator, a dispatch, and a reducer for a method call,) the reducer conflict issue is at least quadratic (each of N reducers must consider every other N reducer,) and once you consider that you need to interleave the timing expectations by re-diving the switch over and over, because without understanding that order you have to think non-deterministically, it's arguably exponential (each of N reducers must consider every other N reducer at every point in the timeline where it edits intermediate state.)

And then they tell you to use *middlewares* in the advanced tutorial, meaning state change reasoning becomes hyper-exponential 😱 😭 😂 😅 😰

Weirdly, while mutating state through their entire tutorial, they also advise the use of `immutable.js`, when simply not doing this means everything is default-immutable on its own.

Of particular note is that using these external stores means that every test you want to do for your controls that either are or contain `container control`s must now be in an E2E browser setup (as opposed to fast-running pure testers,) block an entire browser thread to run (instead of mass parallel,) and the test itself must set up and tear down `redux state`s for each test, as opposed to just passing a piece of plain data in and string testing the result.  ***This makes the workload of testing brain-wallopingly higher***.

Please note that these two apps are both complete, and both do approximately the same thing.

### The Vanilla Way

```html
```

```javascript
```

### The Redux Way

And, the official