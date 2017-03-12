import {browser, by, element} from "protractor";
import {openCharacterManagerPage} from "./utils";

describe("CharacterManagerPage", () => {
    let nameInput = element.all(by.className("text-input")).get(0);
    let classInput = element.all(by.className("text-input")).get(1);
    let levelInput = element.all(by.className("text-input")).get(2);
    let hitPointsInput = element.all(by.className("text-input")).get(3);
    let hitDieInput = element.all(by.className("text-input")).get(4);
    let saveBtn = element(by.buttonText("Save"));
    let loadBtn = element(by.buttonText("Load"));

    beforeEach(() => {
        browser.get("");
        openCharacterManagerPage();
    });

    it("should have a title", () => {
        expect(browser.getTitle()).toEqual("Character Manager");
    });

    it("should save a valid character", () => {
        nameInput.clear();
        nameInput.sendKeys("TEST");
        classInput.clear();
        classInput.sendKeys("CM");
        levelInput.clear();
        levelInput.sendKeys("1");
        hitPointsInput.clear();
        hitPointsInput.sendKeys("6");
        hitDieInput.clear();
        hitDieInput.sendKeys("6");

        saveBtn.click();
        expect(element(by.tagName("ion-toast")).isPresent()).toBeTruthy();

        loadBtn.click();
        expect(element(by.css(".alert-radio-label")).getText()).toEqual("TEST");
    });

    it("should not save a non-valid character", () => {
        nameInput.clear();
        nameInput.sendKeys("NOT VALID");
        saveBtn.click();
        expect(element(by.css(".error")).isPresent()).toBeTruthy();

        loadBtn.click();
        expect(element(by.css(".alert-radio-label")).getText()).not.toEqual("NOT VALID");
    });

    it("should not allow text in level, hit points and hit die input", () => {
        levelInput.clear();
        levelInput.sendKeys("ab");
        hitPointsInput.clear();
        hitPointsInput.sendKeys("ab");
        hitDieInput.clear();
        hitDieInput.sendKeys("ab");

        expect(levelInput.getAttribute("value")).toEqual("");
        expect(hitDieInput.getAttribute("value")).toEqual("");
        expect(hitPointsInput.getAttribute("value")).toEqual("");
    });

    it("should not allow numbers > 99 in level, hit points and hit die input", () => {
        levelInput.clear();
        levelInput.sendKeys("100");
        hitPointsInput.clear();
        hitPointsInput.sendKeys("101");
        hitDieInput.clear();
        hitDieInput.sendKeys("102");

        saveBtn.click();
        expect(element(by.css(".error")).isPresent()).toBeTruthy();
    });

    it("should not allow special characters in name", () => {
        nameInput.clear();
        nameInput.sendKeys("Test;");

        saveBtn.click();
        expect(element(by.css(".error")).isPresent()).toBeTruthy();
    });
});
