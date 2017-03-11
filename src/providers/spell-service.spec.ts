import {SpellService} from "./spell-service";
import {Type} from "../models/spell-type-model";
import {Spell} from "../models/spell-model";
import {HttpMock} from "../mocks";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, Http, Response, ResponseOptions} from "@angular/http";
import {Observable} from "rxjs";

let service: SpellService = null;

describe("SpellService", () => {
    beforeEach(() => {
        let backend: MockBackend = new MockBackend(), defaultOptions: BaseRequestOptions = new BaseRequestOptions();
        service = new SpellService(new Http(backend, defaultOptions));
    });

    it("initialises", () => {
        expect(service).toBeTruthy();
    });

    it("loads all spells for Chaos Mage", () => {
        spyOn(service.http, "get").and.callFake(() => {
            let response = new Response(new ResponseOptions({
                body: {
                    "spells": [
                        {
                            "spellType": "0",
                            "name": "Force Tentacle",
                            "range": "Ranged spell",
                            "type": "At-Will",
                            "target": "One random nearby enemy",
                            "attack": "Charisma + Level vs. PD",
                            "hit": "1d10 + Charisma force damage.",
                            "miss": "Damage equal to your level.",
                            "damage": "3rd level spell: 3d10 damage.\n5th level spell: 5d10 damage.\n7th level spell: 7d10 damage.\n9th level spell: 9d10 damage.",
                            "adventurerFeat": "You can now also target far away enemies.",
                            "championFeat": "This spell’s damage dice increase by one size to d12s.",
                            "epicFeat": "One battle per day, you can deal half damage on a natural even miss with this spell."
                        },
                        {
                            "spellType": "0",
                            "name": "Chaos Ray",
                            "range": "Ranged spell",
                            "type": "Once per battle",
                            "target": "One nearby or far away enemy",
                            "attack": "Charisma + Level vs. PD",
                            "hit": "1d8 + Charisma damage.",
                            "evenHit": "As a hit, plus another nearby enemy takes half damage.",
                            "miss": "1d6 damage to a different nearby enemy.",
                            "damage": "3rd level spell 4d6 damage: 1d10 damage on a miss.\n5th level spell 6d6 damage: 2d12 damage on a miss.\n7th level spell 6d10 damage: 3d12 damage on a miss.\n9th level spell 8d10 damage: 5d12 damage on a miss."
                        }
                    ]
                }
            }));
            return new Observable<Response>((observer) => {
                observer.next(response);
                observer.complete();
            });
        });

        service.initialiseCMSpells();
        expect(service.cmSpells.length).toEqual(2);
    });

    it("lists all attack Chaos Mage Spells", () => {
        spyOn(service, "initialiseCMSpells").and.callFake(() => {
            service.cmSpells = fakeCMSpells();
        });
        spyOn(service.http, "get").and.callFake(() => {

        });

        service.initialiseCMSpells();
        let spells = service.listCMSpellsByType(Type.CMAttack);
        spells.forEach((spell) => {
            expect(spell.spellType).toEqual(Type.CMAttack);
        });
    });

    it("lists all defense Chaos Mage Spells", () => {
        spyOn(service, "initialiseCMSpells").and.callFake(() => {
            service.cmSpells = fakeCMSpells();
        });
        spyOn(service.http, "get").and.callFake(() => {

        });

        service.initialiseCMSpells();
        let spells = service.listCMSpellsByType(Type.CMDefense);
        spells.forEach((spell) => {
            expect(spell.spellType).toEqual(Type.CMDefense);
        });
    });

    it("lists all iconic Chaos Mage Spells", () => {
        spyOn(service, "initialiseCMSpells").and.callFake(() => {
            service.cmSpells = fakeCMSpells();
        });
        spyOn(service.http, "get").and.callFake(() => {

        });

        service.initialiseCMSpells();
        let spells = service.listCMSpellsByType(Type.CMIconic);
        spells.forEach((spell) => {
            expect(spell.spellType).toEqual(Type.CMIconic);
        });
    });

});

export function fakeCMSpell(type: Type): Spell {
    return <Spell>{
        spellType: type,
        name: "fake spell",
        range: "range",
        target: "target",
        damage: "damage",
        type: "type",
        attack: "attack",
        hit: "hit",
        miss: "miss",
        adventurerFeat: "adventure feat",
        championFeat: "champion feat",
        epicFeat: "epic feat"
    }
}

export function fakeCMSpells() {
    return [fakeCMSpell(Type.CMAttack), fakeCMSpell(Type.CMDefense), fakeCMSpell(Type.CMAttack), fakeCMSpell(Type.CMIconic)];
}
