import {Talent} from "./talent";
import {Feat} from "./feat";

export interface Character {
  class: string,
  name: string,
  level: number,
  talents: Array<Talent>,
  feats: Array<Feat>,
  maxHitPoints: number,
  hitPoints: number
}
