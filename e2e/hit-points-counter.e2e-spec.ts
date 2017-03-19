import {browser, element, by} from "protractor";
import {openHitPointsCounterPage} from "./utils";

describe("HitPointsCounterPage", () => {
    let loadCharacterBtn = element(by.buttonText("load charakter"));
    beforeEach(() => {
        browser.get("");
        openHitPointsCounterPage();
    });

    it("should have a title", () => {
        expect(browser.getTitle()).toEqual("Hitpoint counter");
    });

    it("should load a character and display it's current health", () => {
        loadCharacterBtn.click();
        element(by.buttonText("TEST")).click();
        element(by.buttonText("OK")).click();
        expect(element(by.id("hitPoints")).getText()).toEqual("hit points: 6 / 6");
    });
});
