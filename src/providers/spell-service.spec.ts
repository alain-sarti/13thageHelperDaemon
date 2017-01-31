import {SpellService} from "./spell-service";
import {Type} from "../models/spell-type-model";
import {Spell} from "../models/spell-model";

let service: SpellService = null;

describe("SpellService", () => {
  beforeEach(() => {
    service = new SpellService();
  });

  it("initialises", () => {
    expect(service).toBeTruthy();
  });

  it("lists all attack Chaos Mage Spells", () => {
    spyOn(service, "initialiseCMSpells").and.callFake(() => {
      service.cmSpells = fakeCMSpells();
    });

    service.initialiseCMSpells();
    let spells = service.listCMSpellsByType(Type.Attack);
    spells.forEach((spell) => {
      expect(spell.spellType).toEqual(Type.Attack);
    });
  });

  it("lists all defense Chaos Mage Spells", () => {
    spyOn(service, "initialiseCMSpells").and.callFake(() => {
      service.cmSpells = fakeCMSpells();
    });

    service.initialiseCMSpells();
    let spells = service.listCMSpellsByType(Type.Defense);
    spells.forEach((spell) => {
      expect(spell.spellType).toEqual(Type.Defense);
    });
  });

  it("lists all iconic Chaos Mage Spells", () => {
    spyOn(service, "initialiseCMSpells").and.callFake(() => {
      service.cmSpells = fakeCMSpells();
    });

    service.initialiseCMSpells();
    let spells = service.listCMSpellsByType(Type.Iconic);
    spells.forEach((spell) => {
      expect(spell.spellType).toEqual(Type.Iconic);
    });
  });

});

export function fakeCMSpell(type: Type): Spell {
  return <Spell>{
    spellType: type,
    name: "fake spell",
    range: "range",
    target: "target",
    type: "type",
    attack: "attack",
    hit: "hit",
    miss: "miss",
    adventureFeat: "adventure feat",
    championFeat: "champion feat",
    epicFeat: "epic feat"
  }
}

export function fakeCMSpells() {
  return [fakeCMSpell(Type.Attack), fakeCMSpell(Type.Defense), fakeCMSpell(Type.Attack), fakeCMSpell(Type.Iconic)];
}
