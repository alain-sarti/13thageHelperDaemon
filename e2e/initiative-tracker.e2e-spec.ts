import {browser, element, by} from "protractor";
import {openInitiativeTrackerPage} from "./utils";

describe("InitiativeTrackerPage", () => {
    let addMasterBtn = element(by.buttonText("Add Master Slot"));
    let addPlayerBtn = element(by.buttonText("Add Player Slot"));

    beforeEach(() => {
        browser.get("");
        openInitiativeTrackerPage()
    });

    it("should have a title", () => {
        expect(browser.getTitle()).toEqual("Ini");
    });

    it("should add a GM entry", () => {
        addMasterBtn.click();
        let input = element(by.css('[placeholder="ini slot"]'));
        input.sendKeys("15");
        browser.driver.sleep(400);
        let save = element(by.buttonText("Save"));
        save.click();
        let entry = element(by.css(".ion-md-nuclear"));
        expect(entry.isPresent()).toBeTruthy();
    });

    it("should add a Player entry", () => {
        addPlayerBtn.click();
        let input = element(by.css('[placeholder="ini slot"]'));
        input.sendKeys("15");
        browser.driver.sleep(400);
        let save = element(by.buttonText("Save"));
        save.click();
        let entry = element(by.css(".ion-md-contacts"));
        expect(entry.isPresent()).toBeTruthy();
    });
});
