class TodoApp {

    constructor() {
        this.todos = [];
    }

    add_todo(todo)    { this.todos.push(todo); }
    toggle_todo(todo) { return true; } // don't know what this does yet
    set_vfilter(vfil) { return true; } // don't know what this does yet

    render()          { /* do nothing yet */ }
    hooks()           { return {}; }

}
