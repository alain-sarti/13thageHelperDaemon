
import {CharacterService} from "./character-service";
import {Character} from "../models/character-model";
let service: CharacterService = null;

describe("CharacterService", () => {
  beforeEach(() => {
    service = new CharacterService();
  });

  it("initialises", () => {
    expect(service).toBeTruthy();
  });
});

function fakeCharacter(): Character {
  return <Character>{
    name: "fake Character",
    class: "CM",
    level: 1,
    talents: ["attack", "iconic"]
  }
}
