/**
 * Created by Jaswinder on 7/9/2016.
 */
require('core-js');
require('reflect-metadata');
require('zone.js/dist/zone');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var dispatchertokens_1 = require('./dispatchertokens');
require('rxjs');
var core_1 = require('@angular/core');
var about_component_1 = require("./app/about.component");
var Subject_1 = require("rxjs/Subject");
var state_1 = require('./app/state');
platform_browser_dynamic_1.bootstrap(about_component_1.AboutComponent, [
    core_1.provide(dispatchertokens_1.dispatcher, { useValue: new Subject_1.Subject() }),
    core_1.provide(dispatchertokens_1.initialState, { useValue: { todos: [], uiState: state_1.initialUiState } }),
    core_1.provide(dispatchertokens_1.state, { useFactory: state_1.applicationStateFactory, deps: [new core_1.Inject(dispatchertokens_1.initialState), new core_1.Inject(dispatchertokens_1.dispatcher)] })
]);
