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

[Prev - Action Creators](05 - action creators.md)

[Next - Initial State](07 - initial state.md)
