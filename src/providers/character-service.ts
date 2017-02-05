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

  public saveCharacter(name: string, character: Character) {
    this.data.save(name, character);
  }
}
