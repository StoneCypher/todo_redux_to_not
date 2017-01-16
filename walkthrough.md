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

### The Vanilla way

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
}
```

### The Vanilla way

In vanilla, we choose to have hooks (hooks are just callbacks under a
descriptive name which better indicates that their intent is to create a
callback API for the outside.)

So, we'll instead offer

```javascript
// inside class TodoApp
add_todo    = todo => this.todos.push(todo)
toggle_todo = todo => true // don't know what this does yet
set_vfilter = vfil => true // don't know what this does yet
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

### The Vanilla way

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

### The Vanilla way

The Vanilla way is a one-liner.

```javascript
// inside class TodoApp
app_state = { vfilter: 'SHOW_ALL', todos: [] }
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

### The Vanilla way

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

### The Vanilla way

It's just three simple member-setting one-liners

```javascript
add_todo    = todo => this.todos.push(todo)
toggle_todo = i    => this.app_state.todos[i].completed = !this.app_state.todos[i].completed
set_vfilter = vfil => appstate.vfilter = vfil
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

Here's our complete app that does the same thing, so far, rather than just the
reducers piece.

```javascript
class TodoApp {

    app_state   = { vfilter: 'SHOW_ALL', todos: [] }

    add_todo    = todo => this.todos.push(todo)
    toggle_todo = i    => this.app_state.todos[i].completed = !this.app_state.todos[i].completed
    set_vfilter = vfil => appstate.vfilter = vfil

    render()    { /* do nothing yet */ }
    hooks()     { return {}; }

}
```

<br/><br/><br/>
##
