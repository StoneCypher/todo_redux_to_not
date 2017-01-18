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

[Prev - Controls - TodoList](17 - controls - todolist.md)

[Next - Controls - Footer](19 - controls - footer.md)
