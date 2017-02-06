import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { App } from "./app.component";
import {ChaosMagePage} from "../pages/chaos-mage/chaos-mage";
import {InitiativeTrackerPage} from "../pages/initiative-tracker/initiative-tracker";
import {ChaosMageService} from "../providers/chaos-mage-service";
import {SpellService} from "../providers/spell-service";
import {DataService} from "../providers/data-service";
import {SpellPage} from "../pages/spell/spell";

@NgModule({
  declarations: [
    App,
    ChaosMagePage,
    InitiativeTrackerPage,
    SpellPage
  ],
  imports: [
    IonicModule.forRoot(App)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    ChaosMagePage,
    InitiativeTrackerPage,
    SpellPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ChaosMageService,
    SpellService,
    DataService
  ]
})
export class AppModule {}
