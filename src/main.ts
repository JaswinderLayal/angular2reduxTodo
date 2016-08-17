/**
 * Created by Jaswinder on 7/9/2016.
 */
import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {dispatcher,initialState,state} from './dispatchertokens';
import 'rxjs';
import {provide,Inject} from '@angular/core';
import {AboutComponent} from "./app/about.component";
import {Subject} from "rxjs/Subject";
import {initialUiState,applicationStateFactory} from './app/state';
bootstrap(AboutComponent,[
    provide(dispatcher,{useValue:new Subject()}),
    provide(initialState,{useValue:{todos:[],uiState:initialUiState}}),
    provide(state, {useFactory: applicationStateFactory, deps: [new Inject(initialState), new Inject(dispatcher)]})


]);