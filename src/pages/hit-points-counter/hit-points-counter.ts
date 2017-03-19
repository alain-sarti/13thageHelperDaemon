import {Component} from "@angular/core";
import {AlertController} from "ionic-angular";
import {CharacterService} from "../../providers/character-service";
import {DataService} from "../../providers/data-service";
import {Character} from "../../models/character-model";
import {TranslateService} from "ng2-translate";

@Component({
    selector: "page-hit-points-counter",
    templateUrl: "hit-points-counter.html"
})
export class HitPointsCounterPage {
    public static readonly HEAL: string = "heal";
    public static readonly DAMAGE: string = "damage";
    public character: Character;
    readonly DB_KEY = "hit-points-counter";

    constructor(public characters: CharacterService,
                public alertController: AlertController,
                public data: DataService,
                public translate: TranslateService) {
        this.data.load(this.DB_KEY).then((data) => {
            if(data.value) {
                this.character = data.value;
            }
        }).catch((error) => {
            if (error.status != 404) {
                console.log("it load data: " + error);
            }
        });
    }

    ionViewDidLoad() {

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
            alert.addButton("Cancel");
            alert.addButton({
                text: "OK",
                handler: data => {
                    this.setCharacter(data);
                }
            });
            alert.present();
        });
    }

    private setCharacter(name: string) {
        this.characters.loadCharacter(name).then((character) => {
            this.character = character;
            if (!this.character.hitPoints) {
                this.character.hitPoints = this.character.maxHitPoints;
            }
        });
    }

    public takeDamage() {
        this.showDialog(HitPointsCounterPage.DAMAGE);
    }

    public heal() {
        this.showDialog(HitPointsCounterPage.HEAL);
    }

    public showDialog(type: string) {
        let prompt = this.alertController.create({
            title: this.translate.instant("hit-points-counter.add.title"),
            message: this.translate.instant("hit-points-counter.add.message"),
            inputs: [
                {
                    type: "number",
                    name: "amount",
                }
            ],
            buttons: [
                {
                    text: this.translate.instant("btn.cancel")
                },
                {
                    text: this.translate.instant("btn.save"),
                    handler: data => {
                        if (type == HitPointsCounterPage.HEAL) {
                            this.characters.recovery(this.character, data.amount);
                        } else {
                            this.characters.takeDamage(this.character, data.amount);
                        }
                        this.characters.saveCharacter(this.character);
                        this.data.save(this.DB_KEY, this.character);
                    }
                }
            ]
        });
        prompt.present();
    }

    public fullHealUp() {
        this.characters.fullHealUp(this.character);
        this.data.save(this.DB_KEY, this.character);
    }

}
