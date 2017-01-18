## `FilterLink`

This control is a convenience method to make `Redux` bindings and handle dispatching.  It does not need to exist in the Vanilla approach.

### The Redux Way

```javascript
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink
```

### The Vanilla Way
We already did the JS part for this, earlier.  As a result, this is another no-op.

```javascript
/* let's see what's in the box?  nothing! */
```

[Prev - Controls - VisibleTodoList](22 - controls - visibletodolist.md)

[Next - Controls - AddTodo](24 - controls - addtodo.md)
