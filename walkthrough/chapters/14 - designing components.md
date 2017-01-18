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

[Prev - Misunderstanding Unidirectional](13 - misunderstanding unidirectional.md)

[Next - Actual Presentational Controls](15 - actual presentational controls.md)
