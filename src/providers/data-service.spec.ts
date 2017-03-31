import {DataService} from "./data-service";
import {async, ComponentFixture} from "@angular/core/testing";
import {TestUtils} from "../test";

let fixture: ComponentFixture<DataService> = null;
let instance: any = null;

xdescribe("DataService", () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([DataService]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
        fixture.detectChanges();
    })));

    afterEach(() => {
        fixture.destroy();
    });

    it("initializes", () => {
        expect(instance).toBeTruthy();
    });
});
