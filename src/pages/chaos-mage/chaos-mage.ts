import { Component } from '@angular/core';
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

  constructor(public service: ChaosMageService) {}

  ionViewDidLoad() {
  }

  public nextSpellType() {
    let type = this.service.nextSpellType();
    switch (type.type) {
      case Type.CMAttack:
        this.type = "Attack";
        break;
      case Type.CMDefense:
        this.type = "Defense";
        break;
      case Type.CMIconic:
        this.type = "Iconic";
        break;
    }
    //TODO: Add grouping to list
    this.spells = this.service.showSpells(type.type);
  }

}
