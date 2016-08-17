/**
 * Created by Jaswinder on 8/15/2016.
 */
import {Component,Inject} from '@angular/core';

import {Action} from "./state";
import {Observable} from 'rxjs/Observable';
import {dispatcher,state} from '../dispatchertokens';
import {ApplicationState} from "./state";
import {AddTodoAction} from "./state";
import {Todo} from "./state";
import {Observer} from "rxjs/Observer";
import {ToggleTodoAction} from "./state";
@Component({
    selector: 'todo-list',
    template: `
    <h1>Todo List</h1>
    <ul id="todo-list">
    <button (click)="btnaddTodo()">btnaddTodo</button>
    <li *ngFor="let todo of todos | async" (click)="toggleTodo(todo)" [style.textDecoration]="getDecoration(todo)">
       {{todo.text}}
    </li>
</ul>`
})
export class TodoListComponent {
    constructor(@Inject(dispatcher) private dispatcher:Observer<Action>,@Inject(state) private state: Observable<ApplicationState>) {
      var $this=this;
      setTimeout(function(){
          $this.addTodo("adding todo");
      },5000);
    }
btnaddTodo(){
    this.addTodo("test");
}

    addTodo(description) {
        let newTodo = new Todo(Math.random(), "ajdskd");

        //this.dispatcher.next(new StartBackendAction('Saving Todo...'));

        this.dispatcher.next(new AddTodoAction(newTodo));
       // this.dispatcher.next(new EndBackendAction(null));
    }
    get todos() {
        return this.state.map((state: ApplicationState) => state.todos);
    }
    getDecoration(todo){
        if(todo.completed){
            return "underline";
        }
        else {
            return "none";
        }
    }

    toggleTodo(todo){
        this.dispatcher.next(new ToggleTodoAction(todo));
    }
}