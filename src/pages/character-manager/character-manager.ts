import { Component } from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CharacterService} from "../../providers/character-service";
import {AlertController} from "ionic-angular";

@Component({
  selector: "page-character-manager",
  templateUrl: "character-manager.html"
})
export class CharacterManagerPage {
  public characterForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
              public characters: CharacterService,
              public alertController: AlertController) {
    this.characterForm = formBuilder.group({
      name: ["", Validators.compose([Validators.maxLength(40), Validators.pattern("[a-zA-Z ]*"), Validators.required])],
      characterClass: ["CM", Validators.required],
      level: [1, Validators.compose([Validators.pattern("^([1-9]|[1-9][0-9])$"), Validators.required])],
      hitPoints: ["", Validators.compose([Validators.pattern("^([1-9]|[1-9][0-9])$"), Validators.required])],
      hitDie: ["", Validators.compose([Validators.pattern("^([1-9]|[1-9][0-9])$"), Validators.required])]
    });
  }

  ionViewDidLoad() {
  }

  public saveCharacter() {
    if(this.characterForm.valid) {
      let form = this.characterForm.value;
      let character = this.characters.createCharacter(form.name,
        form.characterClass,
        form.level,
        form.hitPoints,
        form.hitDie);
      this.characters.saveCharacter(character);
    } else {
      console.log("invalid");
    }
  }

  public loadCharacter() {
    this.characters.listCharacters().then((characters) => {
      console.log(characters);
    });
    // let alert = this.alertController.create();
    // alert.setTitle("");
    //
    // alert.addInput({
    //   type: "radio",
    //   label: "Blue",
    //   value: "blue",
    //   checked: true
    // });
    //
    // alert.addButton("Cancel");
    // alert.addButton({
    //   text: "OK",
    //   handler: data => {
    //   }
    // });
    // alert.present();
  }
}
