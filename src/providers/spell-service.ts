import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Type} from "../models/spell-type-model";
import {Spell} from "../models/spell-model";
import {Http} from "@angular/http";

@Injectable()
export class SpellService {
  public cmSpells: Array<Spell>;

  constructor(public http: Http) {
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

  public listCMSpellsForIconicType(): Array<Spell> {
    let spells: Array<Spell> = [];
    let rand: number = Math.floor(Math.random() * 3);
    let group: string = "";
    if (rand == 0) {
      group = "Blood of Warriors";
    } else if (rand == 1) {
      group = "Light of the High Ones";
    } else if (rand == 2) {
      group = "Twisted Path";
    }
    this.cmSpells.forEach((spell) => {
      if (spell.spellType == Type.CMIconic && spell.group == group) {
        spells.push(spell);
      }
    });
    return spells;
  }

  public initialiseCMSpells() {
    console.log("initialise CM Spells");
    this.cmSpells = [];
    this.http.get("assets/json/spells/chaos-mage.json").subscribe((res) => {
      let json = res.json();
      this.cmSpells = <Array<Spell>>json.spells;
    });
  }
}
