## A note about overhead

That 71% drop in size doesn't come from nowhere.

These numbers are for the same app, running on the same data state, making the same DOM layout, offering the same functionality.

### The Vanilla Way

The vanilla way ends up with
  * 87 lines of code,
  * five controls,
  * one class,
  * one class instance, and
  * one library (`React`.)

### The Redux Way

The `Redux` way ends up with
  * 293 lines of code (*3.3x larger*,)
  * eight internal controls,
  * one inherited control (`<Provider>`,)
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

<img src="../Cropped Comparison.png" style="height:705px"/>

[Prev - Intro](01 - intro.md)

[Next - Getting Started](03 - getting started.md)
