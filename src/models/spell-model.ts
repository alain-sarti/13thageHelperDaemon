import {Type} from "./spell-type-model";
export interface Spell {
  spellType: Type,
  name: string,
  range: string,
  type: string,
  target: string,
  attack: string,
  hit: string,
  miss: string,
  adventureFeat: string,
  championFeat: string,
  epicFeat: string,
  evenHit?: string,
  oddHit?: string,
  evenMiss?: string,
  oddMiss?: string
}
