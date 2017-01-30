import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import {SpellType, Type} from "../models/spell-type-model";

@Injectable()
export class ChaosMageService {
  public spellTypes: Array<SpellType>;

  constructor() {
    this.initializeSpelltypes();
  }

  public nextSpellType(): SpellType {
    let rand = Math.floor(Math.random() * this.spellTypes.length);
    let type = this.spellTypes[rand];
    this.spellTypes.splice(rand, 1);

    if(this.spellTypes.length <= 1) {
      this.initializeSpelltypes();
    }

    return type;
  }

  public initializeSpelltypes(): void {
    this.spellTypes = [];
    this.spellTypes.push(<SpellType>{type: Type.Attack, warp: false});
    this.spellTypes.push(<SpellType>{type: Type.Attack, warp: false});
    this.spellTypes.push(<SpellType>{type: Type.Defense, warp: false});
    this.spellTypes.push(<SpellType>{type: Type.Defense, warp: false});
    this.spellTypes.push(<SpellType>{type: Type.Iconic, warp: false});
    this.spellTypes.push(<SpellType>{type: Type.Iconic, warp: false});
  }
}
