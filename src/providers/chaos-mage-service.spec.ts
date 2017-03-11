import {ChaosMageService} from "./chaos-mage-service";
import {SpellServiceMock, HttpMock} from "../mocks";
import {Type, SpellType} from "../models/spell-type-model";

let service: ChaosMageService = null;

describe("ChaosMageService", () => {
    beforeEach(() => {
        service = new ChaosMageService(new SpellServiceMock((<any>new HttpMock())));
    });

    it("initializes", () => {
        expect(service).toBeTruthy();
    });

    it("gets a random SpellType", () => {
        expect(service.nextSpellType()).toBeTruthy();
    });

    it("starts with right list of spelltypes", () => {
        expect(service.spellTypes.length).toEqual(6);
    });

    it("reduces the number of spelltypes", () => {
        service.nextSpellType();
        expect(service.spellTypes.length).toEqual(5);
        service.nextSpellType();
        expect(service.spellTypes.length).toEqual(4);
    });

    it("resets the list of spelltypes if only 1 spelltype is left", () => {
        spyOn(service, "initializeSpelltypes").and.callThrough();
        service.nextSpellType();
        service.nextSpellType();
        service.nextSpellType();
        service.nextSpellType();
        service.nextSpellType();
        expect(service.initializeSpelltypes).toHaveBeenCalled();
        expect(service.spellTypes.length).toEqual(6);
    });

    it("shows spells for spelltype attack", () => {
        let spells = service.showSpells(Type.CMAttack);
        spells.forEach((spell) => {
            expect(spell.spellType).toEqual(Type.CMAttack);
        });
    });

    it("shows spells for spelltype defense", () => {
        let spells = service.showSpells(Type.CMDefense);
        spells.forEach((spell) => {
            expect(spell.spellType).toEqual(Type.CMDefense);
        });
    });

    it("shows spells for spelltype iconic", () => {
        let spells = service.showSpells(Type.CMIconic);
        spells.forEach((spell) => {
            expect(spell.spellType).toEqual(Type.CMIconic);
        });
    });

    it("rolls for warp effect, if spelltype talent is chosen", () => {
        let warpEffect: string = service.rollWarpEffect(Type.CMAttack);
        expect(warpEffect).toBeTruthy();
    });

    it("no spell type get's picked thrice in 5 initial picks", () => {
        // only 5 initial picks can be tested, because after that picking the same type thrice in a row can happen
        spyOn(service, "initializeSpelltypes").and.callThrough();
        let nrAttack = 0;
        let nrDefense = 0;
        let nrIconic = 0;
        for (let i = 0; i < 5; i++) {
            let type = service.nextSpellType();
            switch (type.type) {
                case Type.CMAttack:
                    nrAttack++;
                    break;
                case Type.CMDefense:
                    nrDefense++;
                    break;
                case Type.CMIconic:
                    nrIconic++;
                    break;
            }
        }
        expect(nrAttack).toBeLessThanOrEqual(2);
        expect(nrDefense).toBeLessThanOrEqual(2);
        expect(nrIconic).toBeLessThanOrEqual(2);
    });
});
