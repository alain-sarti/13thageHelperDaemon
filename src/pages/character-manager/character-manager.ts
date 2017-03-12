import {Component} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CharacterService} from "../../providers/character-service";
import {AlertController} from "ionic-angular";
import {Character} from "../../models/character-model";
import {MessageService} from "../../providers/message-service";
import {TranslateService} from "ng2-translate";

@Component({
    selector: "page-character-manager",
    templateUrl: "character-manager.html"
})
export class CharacterManagerPage {
    public characterForm: FormGroup;
    public character: Character;

    constructor(public formBuilder: FormBuilder,
                public characters: CharacterService,
                public alertController: AlertController,
                public messages: MessageService,
                public translate: TranslateService) {
        this.characterForm = formBuilder.group({
            name: ["", Validators.compose([Validators.maxLength(40), Validators.pattern("[a-zA-Z0-9 ]*"), Validators.required])],
            characterClass: ["CM", Validators.required],
            level: [1, Validators.compose([Validators.pattern("^([1-9]|[1-9][0-9])$"), Validators.required])],
            hitPoints: ["", Validators.compose([Validators.pattern("^([1-9]|[1-9][0-9])$"), Validators.required])],
            hitDie: ["", Validators.compose([Validators.pattern("^([1-9]|[1-9][0-9])$"), Validators.required])]
        });
    }

    ionViewDidLoad() {
    }

    public saveCharacter() {
        if (this.characterForm.valid) {
            let form = this.characterForm.value;
            let character = this.characters.createCharacter(form.name,
                form.characterClass,
                form.level,
                form.hitPoints,
                form.hitDie);
            this.characters.saveCharacter(character);
            this.messages.showToast("character-manager.saved");
        } else {
            this.messages.showError("character-manager.not-saved");
            console.log("invalid");
        }
    }

    public loadCharacter() {
        let alert = this.alertController.create();
        alert.setTitle("Select Character");
        this.characters.listCharacters().then((characters) => {
            characters.forEach((character) => {
                alert.addInput({
                    type: "radio",
                    label: character.name,
                    value: character.name
                });
            });
            alert.addButton(this.translate.instant("btn.cancel"));
            alert.addButton({
                text: this.translate.instant("btn.ok"),
                handler: data => {
                    this.setCharacter(data);
                }
            });
            alert.present();
        });
    }

    public setCharacter(name: string) {
        this.characters.loadCharacter(name).then((character) => {
            this.character = character;
            console.log(character);
            this.characterForm.setValue({
                name: character.name,
                characterClass: character.characterClass,
                level: character.level,
                hitPoints: character.maxHitPoints,
                hitDie: character.hitDie
            })
        });
    }
}
