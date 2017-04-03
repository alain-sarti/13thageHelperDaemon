import {async, ComponentFixture} from "@angular/core/testing";
import {ChaosMagePage} from "./chaos-mage";
import {TestUtils} from "../../test";

let fixture: ComponentFixture<ChaosMagePage> = null;
let instance: any = null;

describe("ChaosMagePage", () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([ChaosMagePage]).then((compiled) => {
        fixture = compiled.fixture;
        instance = compiled.instance;
        fixture.detectChanges();
    })));

    afterEach(() => {
        fixture.destroy();
    });

    it("initialises", () => {
        expect(instance).toBeTruthy();
    });
});
