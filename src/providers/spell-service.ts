import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Type} from "../models/spell-type-model";
import {Spell} from "../models/spell-model";

@Injectable()
export class SpellService {
  public cmSpells: Array<Spell>;

  constructor() {
    this.initialiseCMSpells();
  }

  public listCMSpellsByType(type: Type): Array<Spell> {
    let spells: Array<Spell> = [];
    this.cmSpells.forEach((spell) => {
      if(spell.spellType == type) {
        spells.push(spell);
      }
    });

    return spells;
  }

  public initialiseCMSpells() {
    this.cmSpells = [];
  }
}
