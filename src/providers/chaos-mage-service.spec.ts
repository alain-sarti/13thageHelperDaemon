import {ChaosMageService} from "./chaos-mage-service";
import {SpellServiceMock} from "../mocks";
import {Type} from "../models/spell-type-model";

let service: ChaosMageService = null;

describe("ChaosMageService", () => {
  beforeEach(() => {
    service = new ChaosMageService(new SpellServiceMock());
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
    let spells = service.showSpells(Type.Attack);
    spells.forEach((spell) => {
      expect(spell.spellType).toEqual(Type.Attack);
    });
  });

  it("shows spells for spelltype defense", () => {
    let spells = service.showSpells(Type.Defense);
    spells.forEach((spell) => {
      expect(spell.spellType).toEqual(Type.Defense);
    });
  });

  it("shows spells for spelltype iconic", () => {
    let spells = service.showSpells(Type.Iconic);
    spells.forEach((spell) => {
      expect(spell.spellType).toEqual(Type.Iconic);
    });
  });
});
