var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var Todo = (function () {
    function Todo(idval, textval) {
        this.completed = false;
        this.id = idval;
        this.text = textval;
    }
    return Todo;
})();
exports.Todo = Todo;
var AddTodoAction = (function () {
    function AddTodoAction(newTodo) {
        this.newTodo = newTodo;
    }
    return AddTodoAction;
})();
exports.AddTodoAction = AddTodoAction;
var ToggleTodoAction = (function () {
    function ToggleTodoAction(todo) {
        this.todo = todo;
    }
    return ToggleTodoAction;
})();
exports.ToggleTodoAction = ToggleTodoAction;
var UiState = (function () {
    function UiState(actionOngoing, message) {
        this.actionOngoing = actionOngoing;
        this.message = message;
    }
    return UiState;
})();
exports.UiState = UiState;
function applicationStateFactory(initialState, actions) {
    var appStateObservable = actions.scan(function (state, action) {
        console.log("Processing action ", action);
        var newState = {
            todos: calculateTodos(state.todos, action),
            uiState: calculateUiState(state.uiState, action)
        };
        console.log({
            todos: newState.todos,
            uiState: newState.uiState
        });
        return newState;
    }, initialState)
        .share();
    return wrapIntoBehaviorSubject(initialState, appStateObservable);
}
exports.applicationStateFactory = applicationStateFactory;
function wrapIntoBehaviorSubject(init, obs) {
    var res = new BehaviorSubject_1.BehaviorSubject(init);
    obs.subscribe(function (s) { return res.next(s); });
    return res;
}
function calculateTodos(state, action) {
    if (!state) {
        return [];
    }
    else if (action instanceof AddTodoAction) {
        console.log("pushing Ass todo ", action.newTodo);
        state.push(action.newTodo);
        console.log("State is ", state);
        return state;
    }
    else if (action instanceof ToggleTodoAction) {
        console.log("passing state ", state);
        return toggleTodo(state, action);
    }
    else {
        return state;
    }
}
function toggleTodo(state, action) {
    console.log("in toggle todo", state.todos);
    var mappedTodos = state.map(function (todo) {
        if (todo.id == action.todo.id) {
            todo.completed = !todo.completed;
        }
        return todo;
    });
    console.log("Mapped Todos ", mappedTodos);
    return mappedTodos;
}
function calculateUiState(state, action) {
    if (!state) {
        return exports.initialUiState;
    }
    // if (action instanceof StartBackendAction) {
    //     return new UiState(true, action.message);
    // }
    // else if (action instanceof EndBackendAction) {
    //     return new UiState(false, action.message ? action.message : initialUiState.message);
    // }
    // else {
    //     return state;
    // }
}
exports.calculateUiState = calculateUiState;
exports.initialUiState = {
    actionOngoing: false,
    message: 'Ready'
};
