## Actual presentational controls

So, we can use their presentational controls in a fairly similar way.  I will slightly rewrite them to support passing data down, and reduce their size a bit in the process.

There are some very strange splittings of responsibilities in this code, some of which justify a `Store` existing; they lead to more complex controls than are necessary. We will eliminate some of these splits in the process, but not all of them up front, because it would lead to difficult to compare code, once some of the structural noise was removed; we'll do that at the end, instead.

We're making an ultra-short chapter to fit the other tutorial's chapter structure.  Sorry about that 😂

[Prev - Designing Controls](14 - designing components.md)

[Next - Controls - Todo](16 - controls - todo.md)
