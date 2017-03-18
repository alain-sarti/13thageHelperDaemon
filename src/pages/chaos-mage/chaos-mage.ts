import {Component} from '@angular/core';
import {ChaosMageService} from "../../providers/chaos-mage-service";
import {Type, SpellType} from "../../models/spell-type-model";
import {Spell} from "../../models/spell-model";
import {DataService} from "../../providers/data-service";

@Component({
    selector: 'page-chaos-mage',
    templateUrl: './chaos-mage.html'
})
export class ChaosMagePage {
    public type: string;
    public spells: Array<Spell> = [];
    public warpEffect: string;
    readonly DB_KEY = "chaos-mage";

    constructor(public service: ChaosMageService, public data: DataService) {
        this.data.load(this.DB_KEY).then((data) => {
            if(data.value) {
                this.showInfoForType(data.value);
            }
        }).catch((error) => {
            if (error.status != 404) {
                console.log("it load data: " + error);
            }
        });
    }

    ionViewDidLoad() {
    }

    public nextSpellType() {
        let type = this.service.nextSpellType();
        this.showInfoForType(type);
        this.data.save(this.DB_KEY, type);
    }

    public showInfoForType(type: SpellType) {
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

    public reset() {
        this.type = "";
        this.spells = [];
        this.warpEffect = "";
        this.data.save(this.DB_KEY, null);
    }
}
