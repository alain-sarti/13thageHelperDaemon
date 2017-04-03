import {DataService} from "./data-service";
import {fakeCharacter} from "./character-service.spec";
import {CharacterService} from "./character-service";

let service: DataService = null;
let prop = "PROP";
let value = "VALUE";

describe("DataService", () => {
    beforeEach(() => {
        service = new DataService(true);
    });

    it("initializes", () => {
        expect(service).toBeTruthy();
    });

    it("saves and loads data", (done) => {
        service.save(prop, value);
        setTimeout(() => {
            let loadedValue = "";
            service.load(prop).then((row) => {
                loadedValue = row.value;
                expect(loadedValue).toEqual(value);
                done();
            }).catch((error) => {
                console.log(error);
            });
        }, 500);
    });

    it("saves and deletes data", (done) => {
        service.save(prop, value);
        setTimeout(() => {
            setTimeout(() => {
                service.delete(prop);
                let loadedValue = "";
                service.load(prop).then((row) => {
                    loadedValue = row.value
                }).catch((error) => {
                    console.log(error);
                });
                expect(loadedValue).toEqual("");
                done();
            }, 500);
        }, 500);
    });

    it("doesn't crash if to be deleted data cannot be found", () => {
        service.delete(prop);
    });

    it("returns all characters as a list", (done) => {
        let character1 = fakeCharacter();
        let character2 = fakeCharacter();
        character2.name = "fake character 2";
        service.save(CharacterService.CHARACTER_PREFIX + character1.name, character1);
        service.save(CharacterService.CHARACTER_PREFIX + character2.name, character2);

        setTimeout(() => {
            service.listCharacters().then((list) => {
                expect(list.length).toEqual(2);
                done();
            });
        }, 500);
    });
});
