import {Talent} from "./talent";
import {Feat} from "./feat";

export interface Character {
  characterClass: string,
  name: string,
  level: number,
  talents: Array<Talent>,
  feats: Array<Feat>,
  maxHitPoints: number,
  failedDeathSaves: number,
  hitPoints?: number
}
