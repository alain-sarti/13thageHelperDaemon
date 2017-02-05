
import {CharacterService} from "./character-service";
import {Character} from "../models/character-model";
import {DataServiceMock} from "../mocks";
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
});

function fakeCharacter(): Character {
  return <Character>{
    name: "fake Character",
    class: "CM",
    level: 1,
    talents: ["attack", "iconic"]
  }
}
