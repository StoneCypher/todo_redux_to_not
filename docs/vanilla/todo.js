class TodoApp {

    constructor()     { this.app_state = { vfilter: 'SHOW_ALL', todos: [] };                    this.render(); }
    current_state()   { return this.app_state; }

    add_todo(todo)    { this.app_state.todos.push({completed:false, text:todo});                this.render(); }
    toggle_todo(i)    { this.app_state.todos[i].completed = !this.app_state.todos[i].completed; this.render(); }
    set_vfilter(vfil) { this.app_state.vfilter = vfil;                                          this.render(); }

    hooks()           { return {}; }

    render()          {

        ReactDOM.render(
            <App hooks={this.hooks()} vfilter={this.app_state.vfilter} todos={this.app_state.todos} />,
            this.dom_target
        );

    }

}

export { TodoApp };
