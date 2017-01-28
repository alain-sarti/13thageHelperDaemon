import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import {SpellType, Type} from "../models/spell-type-model";

@Injectable()
export class ChaosMageService {
  private spellTypes: Array<SpellType>;

  constructor() {
    this.spellTypes = [];
    this.spellTypes.push(<SpellType>{type: Type.Attack, warp: false});
    this.spellTypes.push(<SpellType>{type: Type.Attack, warp: false});
    this.spellTypes.push(<SpellType>{type: Type.Defense, warp: false});
    this.spellTypes.push(<SpellType>{type: Type.Defense, warp: false});
    this.spellTypes.push(<SpellType>{type: Type.Iconic, warp: false});
    this.spellTypes.push(<SpellType>{type: Type.Iconic, warp: false});
  }

  public nextSpellType(): SpellType {
    let rand = Math.floor(Math.random() * 6) + 1;
    return this.spellTypes[rand];
  }
}
