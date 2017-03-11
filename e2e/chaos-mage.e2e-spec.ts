import {browser, element, by, ElementFinder} from "protractor";
import {openChaosMagePage} from "./utils";

describe("ChaosMagePage", () => {
    let nextSpellTypeBtn: ElementFinder = element(by.buttonText("Get Next Spelltype"));

    beforeEach(() => {
        browser.get("");
    });

    it("should have a title", () => {
        openChaosMagePage().then(() => {
            expect(browser.getTitle()).toEqual("CM");
        });
    });

    it("should show spells after btn is clicked", () => {
        openChaosMagePage().then(() => {
            nextSpellTypeBtn.click();
            expect(element(by.tagName("page-spell")).isPresent()).toBeTruthy();
        });
    });
});
