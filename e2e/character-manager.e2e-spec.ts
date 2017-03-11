import {browser, by, element, ElementFinder} from "protractor";
import {openCharacterManagerPage} from "./utils";

describe("CharacterManagerPage", () => {
    let nameInput = element.all(by.className("text-input")).get(0);
    let classInput = element.all(by.className("text-input")).get(1);
    let levelInput = element.all(by.className("text-input")).get(2);
    let hitPointsInput = element.all(by.className("text-input")).get(3);
    let hitDieInput = element.all(by.className("text-input")).get(4);
    let saveBtn = element(by.buttonText("Save"));

    beforeEach(() => {
        browser.get("");
    });

    it("should have a title", () => {
        openCharacterManagerPage().then(() => {
            expect(browser.getTitle()).toEqual("Character Manager");
        });
    });

    it("should save a valid character", () => {
        openCharacterManagerPage().then((done) => {
            let promise1 = nameInput.clear().then(() => {
                nameInput.sendKeys("TEST");
            });
            let promise2 = classInput.clear().then(() => {
                classInput.sendKeys("CM");
            });
            let promise3 = levelInput.clear().then(() => {
                levelInput.sendKeys("1");
            });
            let promise4 = hitPointsInput.clear().then(() => {
                hitPointsInput.sendKeys("6");
            });
            let promise5 = hitDieInput.clear().then(() => {
                hitDieInput.sendKeys("6");
            });

            //TODO: wait until all promises are resolved
            // Promise.all([promise1, promise2, promise3, promise4, promise5])
        });
    });
});
