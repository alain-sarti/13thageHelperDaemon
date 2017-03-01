import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar, Splashscreen } from "ionic-native";
import {ChaosMagePage} from "../pages/chaos-mage/chaos-mage";
import {InitiativeTrackerPage} from "../pages/initiative-tracker/initiative-tracker";
import {HitPointsCounterPage} from "../pages/hit-points-counter/hit-points-counter";
import {CharacterManagerPage} from "../pages/character-manager/character-manager";
import {TranslateService} from "ng2-translate";

@Component({
  templateUrl: "app.html"
})
export class App {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ChaosMagePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public translate: TranslateService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "CM", component: ChaosMagePage },
      { title: "Ini", component: InitiativeTrackerPage },
      { title: "Hit Points", component: HitPointsCounterPage },
      { title: "Character Manager", component: CharacterManagerPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.translateConfig();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn"t want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  translateConfig() {
    var userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(de|en)/gi.test(userLang) ? userLang : 'en';

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(userLang);
  }
}
