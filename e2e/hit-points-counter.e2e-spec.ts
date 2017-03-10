import {browser} from "protractor";
import {openHitPointsCounterPage} from "./utils";

describe("HitPointsCounterPage", () => {

  beforeEach(() => {
    browser.get("");
  });

  it("should have a title", () => {
    openHitPointsCounterPage().then(() => {
      expect(browser.getTitle()).toEqual("Hitpoint counter");
    });
  });
});
