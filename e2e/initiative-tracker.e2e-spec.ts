import {browser} from "protractor";
import {openInitiativeTrackerPage} from "./utils";

describe("InitiativeTrackerPage", () => {

  beforeEach(() => {
    browser.get("");
  });

  it("should have a title", () => {
    openInitiativeTrackerPage().then(() => {
      expect(browser.getTitle()).toEqual("Ini");
    });
  });
});
