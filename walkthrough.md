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

### Vanilla way

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

### Vanilla way

```javascript
/* nothing is needed here */
```

<br/><br/><br/>
## Data state

The tutorial chooses the following data shape for the application.  To keep
things easy to compare, we will use the same data shape in our vanilla app. I
edited the text, though.

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
