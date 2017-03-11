import {Component} from '@angular/core';
import {ChaosMageService} from "../../providers/chaos-mage-service";
import {Type} from "../../models/spell-type-model";
import {Spell} from "../../models/spell-model";

@Component({
    selector: 'page-chaos-mage',
    templateUrl: './chaos-mage.html'
})
export class ChaosMagePage {
    public type: string;
    public spells: Array<Spell> = [];
    public levels: Array<number> = [];
    public warpEffect: string;

    constructor(public service: ChaosMageService) {
    }

    ionViewDidLoad() {
    }

    public nextSpellType() {
        let type = this.service.nextSpellType();
        switch (type.type) {
            case Type.CMAttack:
                this.type = "Attack";
                //TODO: connect to character
                this.warpEffect = this.service.rollWarpEffect(type.type);
                break;
            case Type.CMDefense:
                this.type = "Defense";
                //TODO: connect to character
                this.warpEffect = "";
                break;
            case Type.CMIconic:
                this.type = "Iconic";
                //TODO: connect to character
                this.warpEffect = this.service.rollWarpEffect(type.type);
                break;
        }
        this.spells = this.service.showSpells(type.type);
    }
}
