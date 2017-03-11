import {CharacterService} from "./character-service";
import {Character} from "../models/character-model";
import {DataServiceMock} from "../mocks";
import {Talent} from "../models/talent";
import {Feat} from "../models/feat";
let service: CharacterService = null;
let character: Character = null;

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

    it("creates a character with the given values", () => {
        let newChar = service.createCharacter("Name", "CM", 1, 10, 10);
        expect(newChar.name).toEqual("Name");
        expect(newChar.characterClass).toEqual("CM");
        expect(newChar.level).toEqual(1);
        expect(newChar.maxHitPoints).toEqual(10);
        expect(newChar.hitDie).toEqual(10);
        expect(newChar.failedDeathSaves).toEqual(0);
        expect(newChar.recoveriesSpend).toEqual(0);
    });

    describe("combat effects", () => {
        beforeEach(() => {
            character = fakeCharacter();
        });

        it("subtracts damage once from full health points", () => {
            service.takeDamage(character, 3);
            expect(character.maxHitPoints).toEqual(10);
            expect(character.hitPoints).toEqual(7);
        });

        it("subtracts damage twice if damaged twice", () => {
            service.takeDamage(character, 3);
            service.takeDamage(character, 2);
            expect(character.maxHitPoints).toEqual(10);
            expect(character.hitPoints).toEqual(5);
        });

        it("recognizes a character is not unconscious if it has more than 0 hp", () => {
            service.takeDamage(character, 5);
            expect(service.isCharacterUnconscious(character)).toEqual(false);
        });

        it("recognizes a character is unconscious if it has less than or exactly 0 hp", () => {
            // 0 hp
            service.takeDamage(character, 10);
            expect(service.isCharacterUnconscious(character)).toEqual(true);
            // -2 hp
            character = fakeCharacter();
            service.takeDamage(character, 12);
            expect(service.isCharacterUnconscious(character)).toEqual(true);
        });

        it("adds healing if healed once", () => {
            // to heal, a character has to take damage first
            service.takeDamage(character, 6);
            service.heal(character, 5);
            expect(character.hitPoints).toEqual(9);
        });

        it("adds healing twice if healed twice", () => {
            // to heal, a character has to take damage first
            service.takeDamage(character, 6);
            service.heal(character, 2);
            service.heal(character, 3);
            expect(character.hitPoints).toEqual(9);
        });

        it("doesn't heal a character over its maximum", () => {
            // initial healing
            service.heal(character, 5);
            expect(character.hitPoints).toEqual(character.maxHitPoints);
            // too much healing after taking damage
            service.takeDamage(character, 5);
            service.heal(character, 6);
            expect(character.hitPoints).toEqual(character.maxHitPoints);
        });

        it("tracks the number of failed death saves", () => {
            service.deathSave(character, 10);
            expect(character.failedDeathSaves).toEqual(1);
        });

        it("doesn't increase failed death saves on a successful death save", () => {
            service.deathSave(character, 17);
            expect(character.failedDeathSaves).toEqual(0);
        });

        it("recovers hp on successful death save", () => {
            service.takeDamage(character, 1);
            service.deathSave(character, 18);
            expect(character.failedDeathSaves).toEqual(0);
            expect(character.hitPoints).toEqual(character.maxHitPoints);
        });

        it("let's the character take a standard recovery if applicable", () => {
            // to heal, a character has to take damage first
            service.takeDamage(character, 6);
            service.recovery(character);
            expect(character.hitPoints).toBeGreaterThanOrEqual(5);
            expect(character.hitPoints).toBeLessThanOrEqual(character.maxHitPoints);
            expect(character.recoveriesSpend).toEqual(1);
        });

        it("keeps track of spend recoveries", () => {
            // a character needs level 2 to be able to spend 2 recoveries
            character.level = 2;
            // to heal, a character has to take damage first
            service.takeDamage(character, 2);
            service.recovery(character, 2);
            expect(character.hitPoints).toEqual(character.maxHitPoints);
            expect(character.recoveriesSpend).toEqual(2);
        });

        it("doesn't spend more recoveries than allowed", () => {
            service.takeDamage(character, 1);
            service.recovery(character, 2);
            expect(character.hitPoints).toEqual(character.maxHitPoints);
            expect(character.recoveriesSpend).toEqual(1);
        });
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
        failedDeathSaves: 0,
        recoveriesSpend: 0,
        hitDie: 10
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
