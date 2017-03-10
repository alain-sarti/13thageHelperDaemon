import {browser, element, by, ElementFinder} from "protractor";
import Promise = webdriver.promise.Promise;
import * as webdriver from "selenium-webdriver";

export function openChaosMagePage(): Promise<any> {
  return openPage(0);
}

export function openInitiativeTrackerPage(): Promise<any> {
  return openPage(1);
}

export function openHitPointsCounterPage(): Promise<any> {
  return openPage(2);
}

export function openCharacterManagerPage(): Promise<any> {
  return openPage(3);
}

function openPage(index: number): Promise<any> {
  return element(by.css(".bar-button-menutoggle")).click().then(() => {
    browser.driver.sleep(500); // wait for the animation
    return element.all(by.className("input-wrapper")).then((items) => {
      items[index].click();
      browser.driver.sleep(500); // wait for the animation
    });
  });
}
