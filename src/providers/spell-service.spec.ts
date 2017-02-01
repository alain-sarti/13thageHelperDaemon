import {SpellService} from "./spell-service";
import {Type} from "../models/spell-type-model";
import {Spell} from "../models/spell-model";
import {HttpMock} from "../mocks";

let service: SpellService = null;

describe("SpellService", () => {
  beforeEach(() => {
    service = new SpellService((<any> new HttpMock()));
  });

  it("initialises", () => {
    expect(service).toBeTruthy();
  });

  it("loads all spells for Chaos Mage", () => {
    spyOn(service.http, "get").and.callFake(() => {

    });
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
