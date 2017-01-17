class TodoApp {

    constructor()     { this.app_state = { vfilter: 'SHOW_ALL', todos: [] }; }
    current_state()   { return this.app_state; }

    add_todo(todo)    { this.app_state.todos.push({completed:false, text:todo}); }
    toggle_todo(i)    { this.app_state.todos[i].completed = !this.app_state.todos[i].completed; }
    set_vfilter(vfil) { this.app_state.vfilter = vfil; }

    render()          { /* do nothing yet */ }
    hooks()           { return {}; }

}
