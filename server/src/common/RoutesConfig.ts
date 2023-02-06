import {Application} from 'express';

export class RoutesConfig {
    app: Application;
    name: string;

    constructor(app: Application, name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }

    getName() {
        return this.name;
    }

    getApp() {
        return this.app;
    }

    configureRoutes() {
        // override in subclass
    }
}
