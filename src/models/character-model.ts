import {Talent} from "./talent";
import {Feat} from "./feat";

export interface Character {
    characterClass: string,
    name: string,
    level: number,
    talents: Array<Talent>,
    feats: Array<Feat>,
    maxHitPoints: number,
    hitDie: number,
    failedDeathSaves: number,
    recoveriesSpend: number,
    recoveries: number,
    hitPoints?: number,
    temporaryHitPoints?: number
}
