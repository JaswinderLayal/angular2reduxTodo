var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Created by Jaswinder on 8/15/2016.
 */
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var dispatchertokens_1 = require('../dispatchertokens');
var state_1 = require("./state");
var state_2 = require("./state");
var Observer_1 = require("rxjs/Observer");
var state_3 = require("./state");
var TodoListComponent = (function () {
    function TodoListComponent(dispatcher, state) {
        this.dispatcher = dispatcher;
        this.state = state;
        var $this = this;
        setTimeout(function () {
            $this.addTodo("adding todo");
        }, 5000);
    }
    TodoListComponent.prototype.btnaddTodo = function () {
        this.addTodo("test");
    };
    TodoListComponent.prototype.addTodo = function (description) {
        var newTodo = new state_2.Todo(Math.random(), "ajdskd");
        //this.dispatcher.next(new StartBackendAction('Saving Todo...'));
        this.dispatcher.next(new state_1.AddTodoAction(newTodo));
        // this.dispatcher.next(new EndBackendAction(null));
    };
    Object.defineProperty(TodoListComponent.prototype, "todos", {
        get: function () {
            return this.state.map(function (state) { return state.todos; });
        },
        enumerable: true,
        configurable: true
    });
    TodoListComponent.prototype.getDecoration = function (todo) {
        if (todo.completed) {
            return "underline";
        }
        else {
            return "none";
        }
    };
    TodoListComponent.prototype.toggleTodo = function (todo) {
        this.dispatcher.next(new state_3.ToggleTodoAction(todo));
    };
    TodoListComponent = __decorate([
        core_1.Component({
            selector: 'todo-list',
            template: "\n    <h1>Todo List</h1>\n    <ul id=\"todo-list\">\n    <button (click)=\"btnaddTodo()\">btnaddTodo</button>\n    <li *ngFor=\"let todo of todos | async\" (click)=\"toggleTodo(todo)\" [style.textDecoration]=\"getDecoration(todo)\">\n       {{todo.text}}\n    </li>\n</ul>"
        }),
        __param(0, core_1.Inject(dispatchertokens_1.dispatcher)),
        __param(1, core_1.Inject(dispatchertokens_1.state)), 
        __metadata('design:paramtypes', [(typeof (_a = typeof Observer_1.Observer !== 'undefined' && Observer_1.Observer) === 'function' && _a) || Object, (typeof (_b = typeof Observable_1.Observable !== 'undefined' && Observable_1.Observable) === 'function' && _b) || Object])
    ], TodoListComponent);
    return TodoListComponent;
    var _a, _b;
})();
exports.TodoListComponent = TodoListComponent;
