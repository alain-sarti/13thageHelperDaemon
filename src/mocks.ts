/* tslint:disable */
// APP:
import {SpellService} from "./providers/spell-service";
import {fakeCMSpells} from "./providers/spell-service.spec";
import {Request, RequestOptionsArgs, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Alert, AlertController, AlertOptions, Toast, ToastController, ToastOptions} from "ionic-angular";
import {TranslateService} from "ng2-translate";

export class SpellServiceMock extends SpellService {
    public initialiseCMSpells() {
        this.cmSpells = fakeCMSpells();
    }
}

export class DataServiceMock {
    private value: any = null;

    constructor(value: any) {
        this.value = value;
    }

    public load(prop: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve({prop: prop, value: this.value});
        });
    }

    public save(prop: string, value: any): void {
    }
}

// IONIC:

export class ConfigMock {

    public get(): any {
        return '';
    }

    public getBoolean(): boolean {
        return true;
    }

    public getNumber(): number {
        return 1;
    }
}

export class FormMock {
    public register(): any {
        return true;
    }
}

export class NavMock {

    public pop(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public push(): any {
        return new Promise(function (resolve: Function): void {
            resolve();
        });
    }

    public getActive(): any {
        return {
            'instance': {
                'model': 'something',
            },
        };
    }

    public setRoot(): any {
        return true;
    }
}

export class PlatformMock {
    public ready(): Promise<{String}> {
        return new Promise((resolve) => {
            resolve('READY');
        });
    }

    public registerBackButtonAction(fn: Function, priority?: number): Function {
        return (() => true);
    }

    public hasFocus(ele: HTMLElement): boolean {
        return true;
    }

    public doc(): HTMLDocument {
        return document;
    }

    public registerListener(ele: any, eventName: string, callback: any): Function {
        return (() => true);
    }

    public win(): Window {
        return window;
    }

    public raf(callback: any): number {
        return 1;
    }
}

export class MenuMock {
    public close(): any {
        return new Promise((resolve: Function) => {
            resolve();
        });
    }
}

export class HttpMock {
    _backend() {
    }

    _defaultOptions() {
    }

    constructor() {

    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return new Observable<Response>();
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return new Observable<Response>();
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return new Observable<Response>();
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return new Observable<Response>();
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return new Observable<Response>();
    }

    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return new Observable<Response>();
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return new Observable<Response>();
    }

    options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return new Observable<Response>();
    }
}

export class TranslateServiceMock extends TranslateService {
    constructor() {
        super(null, null, null);
    }

}

export class ToastMock {
    present(): Promise<any> {
        return Promise.resolve();
    }
}

export class AlertControllerMock extends AlertController {
    constructor() {
        super((<any>new ConfigMock()));
    }

    create(opts?: AlertOptions): Alert {
        return new Alert(null);
    }
}

export class ToastControllerMock extends ToastController {
    constructor() {
        super((<any>new ConfigMock()));
    }

    create(opts?: ToastOptions): Toast {
        return (<any>new ToastMock());
    }
}

/* tslint:enable */
