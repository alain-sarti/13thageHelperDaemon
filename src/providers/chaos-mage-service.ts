import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {SpellType, Type} from "../models/spell-type-model";
import {SpellService} from "./spell-service";
import {Spell} from "../models/spell-model";

@Injectable()
export class ChaosMageService {
    public spellTypes: Array<SpellType>;
    private readonly attackWarp: Array<string> = [
        "Air: You gain flight until the end of your next turn.",
        "Earth: Until the end of your next turn, each enemy that misses you with a melee attack is stuck until the end of its next turn.",
        "Fire: Until the end of your next turn, you can pop free from staggered enemies as a quick action.",
        "Water: You gain a bonus to disengage checks until the end of your next turn equal to your Dexterity modifier",
        "Metal: Until the end of your next turn, when an enemy disengages from you, it takes damage equal to your Dexterity modifier (double your Dexterity modifier at 5th level; triple it at 8th level).",
        "Void: During your next turn, you can use a move action to teleport to a nearby location you can see."
    ];
    private readonly defenseWarp: Array<string> = [
        "Air: Once before the end of your next turn, you can heal using a recovery as a quick action.",
        "Earth: You gain temporary hit points equal to your Wisdom modifier (double your Wisdom modifier at 5th level; triple it at 8th level).",
        "Fire: Until the end of your next turn, when an enemy moves to engage you, it takes fire damage equal to your Wisdom modifier (double your Wisdom modifier at 5th level; triple it at 8th level).",
        "Water: Until the end of your next turn, when you heal using a recovery, add hit points equal to your Wisdom modifier to that healing (double your Wisdom modifier at 5th level; triple it at 8th level).",
        "Metal: Until the end of your next turn, you gain a +2 bonus to AC.",
        "Void: Until the end of your next turn, the first time an attack hits you, as a free action you can choose to lose hit points equal to your level to force the attacker to reroll the attack."
    ];
    private readonly iconicWarp: Array<string> = [
        "Air: Randomly determine two icon associations for the spell you’ll cast instead of one. Choose one of those associations to use for that spell.",
        "Earth: Until the end of your next turn, you gain a bonus to PD and MD equal to your Intelligence modifier.",
        "Fire: Until the end of your next turn, you gain the once-per-battle racial power of a random nearby ally; ignore this benefit if it duplicates your own racial power or if it doesn’t make sense during the battle (human, for example).",
        "Water: Until the end of your next turn, you gain a bonus to saves equal to your Intelligence modifier.",
        "Metal: Until the end of your next turn, critical hits scored against you only count as normal hits.",
        "Void: When you roll a natural 20 with an attack, the critical hit range of your attacks expands by 2 until the end of the battle (cumulative)."
    ];

    constructor(public spells: SpellService) {
        this.initializeSpelltypes();
    }

    public nextSpellType(): SpellType {
        let rand = Math.floor(Math.random() * this.spellTypes.length);
        let type = this.spellTypes[rand];
        this.spellTypes.splice(rand, 1);

        if (this.spellTypes.length <= 1) {
            this.initializeSpelltypes();
        }

        return type;
    }

    public initializeSpelltypes(): void {
        this.spellTypes = [];
        this.spellTypes.push(<SpellType>{type: Type.CMAttack, warp: true});
        this.spellTypes.push(<SpellType>{type: Type.CMAttack, warp: true});
        this.spellTypes.push(<SpellType>{type: Type.CMDefense, warp: false});
        this.spellTypes.push(<SpellType>{type: Type.CMDefense, warp: false});
        this.spellTypes.push(<SpellType>{type: Type.CMIconic, warp: true});
        this.spellTypes.push(<SpellType>{type: Type.CMIconic, warp: true});
    }

    public showSpells(type: Type): Array<Spell> {
        if (type == Type.CMIconic) {
            return this.spells.listCMSpellsForIconicType();
        }
        return this.spells.listCMSpellsByType(type);
    }

    public rollWarpEffect(type: Type): string {
        let rand = Math.floor(Math.random() * 6);
        if (type == Type.CMAttack) {
            return this.attackWarp[rand];
        } else if (type == Type.CMDefense) {
            return this.defenseWarp[rand];
        } else if (type == Type.CMIconic) {
            return this.iconicWarp[rand];
        }
        return "";
    }
}
