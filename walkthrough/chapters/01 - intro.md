# Walkthrough

We're going to do the [Redux Basics tutorial](http://redux.js.org/docs/basics/)
in parallel with a vanilla implementation.

At the end, we'll have replaced a 293 line `Redux` app with an 87 line Vanilla
app which is also easier to understand, introduces no new concepts, is much
faster, much easier to test (no setting up state or needing headless browsers,)
and has removed two libraries.

That's a 71% reduction in code size, and a 66% reduction in dependency count
(because we keep `React`.)

![](../Cropped%20Comparison.png)

Moreover, we show where the overhead comes from at each step, and display that
as the application grows, the problem increases, rather than to decrease.

We also achieve functional purity, discard binding, and make isomorphics far
easier.

Let's begin.

[Next - A Note About Overhead](02 - a note about overhead.md)

[Jump to end - Final Comparison](27 - final comparison.md)
