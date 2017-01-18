## `Provider`

Next, a `Redux` app needs for its `store` to be made available to all the `container control`s.

Since the Vanilla way doesn't have such a thing, this is unnecessary for us.

### The Redux Way

The `Redux` tutorial advises us to use - their words - a "magical" control called `Provider` which "makes the Store available to all your containers."

This magic has had four sets of breaking API changes that required overhauls; `Redux` and `react-router` are community-famous for this.

This is a particularly steep learning curve because you need to go on a source dive to learn how this actually works under the hood.

```javascript
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

### The Vanilla Way

This doesn't need to exist.

```javascript
/* Look at all the nothing (sound_of_music.jpg) */
```

[Prev - Controls - AddTodo](24 - controls - addtodo.md)

[Next - CSS](26 - css.md)
