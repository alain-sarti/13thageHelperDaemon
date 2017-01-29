import {ChaosMageService} from "./chaos-mage-service";

let service: ChaosMageService = null;

describe("ChaosMageService", () => {
  beforeEach(() => {
    service = new ChaosMageService();
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
    spyOn(service, "initializeSpelltypes");
    service.nextSpellType();
    service.nextSpellType();
    service.nextSpellType();
    service.nextSpellType();
    service.nextSpellType();
    expect(service.initializeSpelltypes).toHaveBeenCalled();
    expect(service.spellTypes.length).toEqual(6);
  });
});
