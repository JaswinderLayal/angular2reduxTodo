import {Component} from '@angular/core';
import {TodoListComponent} from "./todolist.component";

@Component({
    selector:'my-app',
    template:'<h1>About</h1>' +
    '<todo-list></todo-list>',
    directives:[TodoListComponent]
})
export class AboutComponent  {

}