# todo_redux_to_not
Let's remove Redux from the Redux todo example :D

My goal is to show how much simpler a vanilla non-flux app can be, than a flux app.  I'm using `Redux` as my flux because it's
everyone's favorite, in turn because it advocates discarding a bunch of flux too (eg multiple stores.)

We start by committing their example, then removing `Redux` piece by piece and replacing it with a simple vanilla app that calls
pure controls with a render function and static props.
