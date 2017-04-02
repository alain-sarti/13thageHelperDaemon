import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {App} from "./app.component";
import {ChaosMagePage} from "../pages/chaos-mage/chaos-mage";
import {InitiativeTrackerPage} from "../pages/initiative-tracker/initiative-tracker";
import {ChaosMageService} from "../providers/chaos-mage-service";
import {SpellService} from "../providers/spell-service";
import {DataService} from "../providers/data-service";
import {SpellPage} from "../pages/spell/spell";
import {HitPointsCounterPage} from "../pages/hit-points-counter/hit-points-counter";
import {CharacterManagerPage} from "../pages/character-manager/character-manager";
import {CharacterService} from "../providers/character-service";
import {MessageService} from "../providers/message-service";
import {Http} from "@angular/http";
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from "ng2-translate";

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, "assets/i18n", ".json");
}

@NgModule({
    declarations: [
        App,
        ChaosMagePage,
        InitiativeTrackerPage,
        SpellPage,
        HitPointsCounterPage,
        CharacterManagerPage
    ],
    imports: [
        IonicModule.forRoot(App),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        App,
        ChaosMagePage,
        InitiativeTrackerPage,
        SpellPage,
        HitPointsCounterPage,
        CharacterManagerPage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        ChaosMageService,
        SpellService,
        {
            provide: DataService, useFactory: () => {
                return new DataService(false)
            }
        },
        CharacterService,
        MessageService
    ]
})
export class AppModule {
}
