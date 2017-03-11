import {Component, Input} from "@angular/core";
import {Spell} from "../../models/spell-model";

@Component({
    selector: "page-spell",
    templateUrl: "./spell.html"
})
export class SpellPage {
    @Input()
    spell: Spell;

    constructor() {
    }

    ionViewDidLoad() {
    }

}
