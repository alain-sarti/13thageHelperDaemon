import { Component } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'page-character-manager',
  templateUrl: 'character-manager.html'
})
export class CharacterManagerPage {
  public characterForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.characterForm = formBuilder.group({
      name: [""],
      characterClass: ["CM"],
      level: [1],
      hitPoints: [""],
      hitDie: [""]
    });
  }

  ionViewDidLoad() {
  }


}
