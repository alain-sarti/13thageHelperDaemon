import {browser} from "protractor";
import {openCharacterManagerPage} from "./utils";

describe("CharacterManagerPage", () => {

  beforeEach(() => {
    browser.get("");
  });

  it("should have a title", () => {
    openCharacterManagerPage().then(() => {
      expect(browser.getTitle()).toEqual("Character Manager");
    });
  });
});
