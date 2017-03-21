import {browser, element, by} from "protractor";
import {openHitPointsCounterPage, waitForAlert} from "./utils";
import {TranslateService} from "ng2-translate";

let loadCharacterBtn = element(by.buttonText("load charakter"));
let takeDamageBtn = element(by.buttonText("take damage"));
let healBtn = element(by.buttonText("Heal"));

describe("HitPointsCounterPage", () => {

    beforeEach(() => {
        browser.get("");
        openHitPointsCounterPage();
    });

    it("should have a title", () => {
        expect(browser.getTitle()).toEqual("Hitpoint counter");
    });

    it("should load a character and display it's current health", () => {
        loadCharacter();
        expect(element(by.id("hitPoints")).getText()).toEqual("hit points: 6 / 6");
    });

    describe("damage", () => {
        beforeEach(() => {
            loadCharacter();
            takeDamageBtn.click();
            waitForAlert();
            element(by.css(".alert-input")).sendKeys(2);
        });

        it("should not take damage if Alert is cancelled", () => {
            element(by.buttonText("Cancel")).click();
            expect(element(by.id("hitPoints")).getText()).toEqual("hit points: 6 / 6");
        });

        it("should display damage taken", () => {
            element(by.buttonText("Save")).click();
            expect(element(by.id("hitPoints")).getText()).toEqual("hit points: 4 / 6");
        });
    });

    describe("healing", () => {
        beforeEach(() => {
            loadCharacter();
            healBtn.click();
            waitForAlert();
            element(by.css(".alert-input")).sendKeys(2);
        });

        it("should not heal if alert is cancelled", () => {
            element(by.buttonText("Cancel")).click();
            expect(element(by.id("hitPoints")).getText()).toEqual("hit points: 4 / 6");
        });

        it("should display healing", () => {
            element(by.buttonText("Save")).click();
            expect(element(by.id("hitPoints")).getText()).toEqual("hit points: 6 / 6");
        });
    });
});

function loadCharacter() {
    loadCharacterBtn.click();
    waitForAlert();
    element(by.buttonText("TEST")).click();
    element(by.buttonText("OK")).click();
    waitForAlert();
}
