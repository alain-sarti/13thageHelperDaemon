import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {DataService} from "./data-service";
import {Character} from "../models/character-model";

@Injectable()
export class CharacterService {

  constructor(public data: DataService) {
  }

  public loadCharacter(name: string): Promise<Character> {
    return this.data.load(name).then((data) => {
      return data.value;
    });
  }

  public saveCharacter(name: string, character: Character): void {
    this.data.save(name, character);
  }

  takeDamage(character: Character, damage: number): void {
    if (character.hitPoints == null) {
      character.hitPoints = character.maxHitPoints;
    }
    character.hitPoints -= damage;
  }

  isCharacterUnconscious(character: Character): boolean {
    return character.hitPoints <= 0;
  }

  deathSave(character: Character, savingThrow: number): void {
    if (savingThrow <= 15) {
      character.failedDeathSaves++;
    } else if (savingThrow > 15 && savingThrow < 20) {
      // recovery
    } else {
      // recovery + action
    }
  }

  recovery(character: Character, amount: number = 1) {
    if (character.recoveriesSpend == null) {
      character.recoveriesSpend = 0;
    }
    if (character.recoveriesSpend + amount <= character.level) {
      character.recoveriesSpend += amount;
      for(let x = 1; x <= amount; x++) {
        this.heal(character, Math.floor(Math.random() * character.hitDie));
      }
    } else {
      for(let x = 1; x <= character.level; x++) {
        character.recoveriesSpend++;
        this.heal(character, Math.floor(Math.random() * character.hitDie));
      }
    }
  }

  heal(character: Character, heal: number): void {
    if (character.hitPoints == null) {
      character.hitPoints = character.maxHitPoints;
    } else {
      character.hitPoints = Math.min(character.hitPoints + heal, character.maxHitPoints);
    }
  }
}
