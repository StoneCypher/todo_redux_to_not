## Let's style a bit
It's ugly.  Could we just put some quick CSS paint on it please?  This isn't part of their tutorial at all.  I just need my eyes to not do this.  *Need*.

Same for both.  17 lines.

```css
ul                 { margin: 1em 0 0 0; padding: 0; }

li                 { list-style-type: none; height: 1.2em; line-height: 100%; padding: 0.25em 1em;
                     margin: 0 0 1px 0; background-color: #fbfbfb; border: 1px solid #eee; border-radius: 0.5em; }

li:before          { content: '✗'; color: rgba(0,0,0, 0.3); display: inline-block; width: 1.2em; vertical-align: text-bottom; text-align: center; }
li.complete:before { content: '✔'; color: #a00; }

.show_link         { color: #04b; text-decoration: none; pointer: cursor; background-color: #f0f8ff;
                     border-radius: 0.5em; padding: 0 0.5em; border: 1px solid #def; }

.show_link.active  { color: white; text-decoration: none; background-color: #004488; border-color: black; }

.todo              { text-decoration: none;         color: black; }
.todo.complete     { text-decoration: line-through; color: #a00;  background-color: #fdd; border-color: #fbb; }

li, .show_link     { transition: 0.5s all; }
```

[Prev - Controls - Provider](25 - controls - provider.md)

[Next - Final Comparison](27 - final comparison.md)
