import {browser, element, by, ElementFinder} from "protractor";
import {openChaosMagePage, openCharacterManagerPage} from "./utils";

describe("ChaosMagePage", () => {
    let nextSpellTypeBtn: ElementFinder = element(by.buttonText("Get Next Spelltype"));

    beforeEach(() => {
        browser.get("");
        openChaosMagePage();
    });

    it("should have a title", () => {
        expect(browser.getTitle()).toEqual("CM");
    });

    it("should show spells after btn is clicked", () => {
        nextSpellTypeBtn.click();
        expect(element(by.tagName("page-spell")).isPresent()).toBeTruthy();
    });

    it("should retain the spells after page transfer", () => {
        nextSpellTypeBtn.click();
        expect(element(by.tagName("page-spell")).isPresent()).toBeTruthy();
        openCharacterManagerPage();
        openChaosMagePage();
        expect(element(by.tagName("page-spell")).isPresent()).toBeTruthy();
    });
});
