import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
export class Todo {
    id:number;
    text:string;
    completed:boolean=false;
   constructor(idval,textval){
       this.id=idval;
       this.text=textval;
   }
}
export class AddTodoAction {
    constructor(public newTodo:Todo) {

    }
}
export class ToggleTodoAction {
    constructor(public todo:Todo) {

    }
}
export type Action = AddTodoAction|ToggleTodoAction;
export class UiState {
    constructor(public actionOngoing:boolean, public message:string) {
    }
}

export interface ApplicationState {
    todos:Todo[],
    uiState: UiState
}

export function applicationStateFactory(initialState:ApplicationState, actions:Observable<Action>):Observable<ApplicationState> {
    let appStateObservable = actions.scan((state:ApplicationState, action) => {

          console.log("Processing action ", action);

            let newState:ApplicationState = {
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


function wrapIntoBehaviorSubject(init, obs) {
    const res = new BehaviorSubject(init);
    obs.subscribe(s => res.next(s));
    return res;
}

function calculateTodos(state, action) {
    if (!state) {
        return [];
    }

    else if (action instanceof AddTodoAction) {
        console.log("pushing Ass todo ",action.newTodo);
        state.push(action.newTodo);
        console.log("State is ",state);
        return state;
    }
    else if (action instanceof ToggleTodoAction) {
        console.log("passing state ",state);
       return toggleTodo(state, action);
    }

    else {
        return state;
    }
}

function toggleTodo(state,action){

          console.log("in toggle todo",state.todos);
          var mappedTodos=  state.map(todo=>{
             if(todo.id==action.todo.id){
                 todo.completed=!todo.completed;
             }
              return todo;
          });
          console.log("Mapped Todos ",mappedTodos);
      return mappedTodos;


}


export function calculateUiState(state:UiState, action) {
    if (!state) {
        return initialUiState;
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


export const initialUiState = {
    actionOngoing: false,
    message: 'Ready'
};

