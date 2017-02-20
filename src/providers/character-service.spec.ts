
import {CharacterService} from "./character-service";
import {Character} from "../models/character-model";
import {DataServiceMock} from "../mocks";
import {Talent} from "../models/talent";
import {Feat} from "../models/feat";
let service: CharacterService = null;

describe("CharacterService", () => {
  beforeEach(() => {
    service = new CharacterService((<any> new DataServiceMock(fakeCharacter())));
  });

  it("initialises", () => {
    expect(service).toBeTruthy();
  });

  it("loads a saved character", (done) => {
    service.loadCharacter("test").then((character) => {
      expect(character.name).toEqual("fake Character");
      done();
    });
  });

  it("subtracts damage once from full health points", () => {
    let character = fakeCharacter();
    service.takeDamage(character, 3);
    expect(character.maxHitPoints).toEqual(10);
    expect(character.hitPoints).toEqual(7);
  });

  it("subtracts damage twice if damaged twice", () => {
    let character = fakeCharacter();
    service.takeDamage(character, 3);
    service.takeDamage(character, 2);
    expect(character.maxHitPoints).toEqual(10);
    expect(character.hitPoints).toEqual(5);
  });

  it("recognizes a character is not unconscious if it has more than 0 hp", () => {
    let character = fakeCharacter();
    service.takeDamage(character, 5);
    expect(service.isCharacterUnconscious(character)).toEqual(false);
  });

  it("recognizes a character is unconscious if it has less than or exactly 0 hp", () => {
    let character = fakeCharacter();
    service.takeDamage(character, 10);
    expect(service.isCharacterUnconscious(character)).toEqual(true);
  });

  it("tracks the number of failed death saves", () => {
    let character = fakeCharacter();
    service.deathSave(character, 10);
    expect(character.failedDeathSaves).toEqual(1);
  });
});

function fakeCharacter(): Character {
  return <Character>{
    name: "fake Character",
    characterClass: "CM",
    level: 1,
    talents: [fakeTalent("attack"), fakeTalent("iconic")],
    feats: [fakeFeat("feat1")],
    maxHitPoints: 10,
    failedDeathSaves: 0
  }
}

function fakeTalent(name: string): Talent {
  return <Talent>{
    name: name
  }
}

function fakeFeat(name: string): Feat {
  return <Feat>{
    name: name
  }
}
