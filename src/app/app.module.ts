import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { App } from "./app.component";
import {ChaosMagePage} from "../pages/chaos-mage/chaos-mage";
import {InitiativeTrackerPage} from "../pages/initiative-tracker/initiative-tracker";
import {ChaosMageService} from "../providers/chaos-mage-service";

@NgModule({
  declarations: [
    App,
    ChaosMagePage,
    InitiativeTrackerPage
  ],
  imports: [
    IonicModule.forRoot(App)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    ChaosMagePage,
    InitiativeTrackerPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ChaosMageService]
})
export class AppModule {}
