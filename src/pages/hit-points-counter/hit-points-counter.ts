import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {CharacterService} from "../../providers/character-service";

@Component({
  selector: 'page-hit-points-counter',
  templateUrl: 'hit-points-counter.html'
})
export class HitPointsCounterPage {
  public static readonly HEAL:string = "heal";
  public static readonly DAMAGE:string = "damage";

  constructor(public characters: CharacterService, public alertController: AlertController) {}

  ionViewDidLoad() {
  }

  public takeDamage() {
    this.showDialog(HitPointsCounterPage.DAMAGE);
  }

  public heal() {
    this.showDialog(HitPointsCounterPage.HEAL);
  }

  public showDialog(type: string) {
    let prompt = this.alertController.create({
      // title: this.translate.instant("hit-point-counter.add.title"),
      // message: this.translate.instant("hit-point-counter.add.message"),
      title: "Test",
      message: "Message",
      inputs: [
        {
          type: "number",
          name: "amount",
          // placeholder: this.translate.instant("hit-point-counter.add.placeholder")
          placeholder: "amount"
        }
      ],
      buttons: [
        {
          // text: this.translate.instant("btn.cancel")
          text: "Cancel"
        },
        {
          // text: this.translate.instant("btn.save"),
          text: "Save",
          handler: data => {
            //TODO: add characters
            if (type == HitPointsCounterPage.HEAL) {
              this.characters.heal(null, data.amount);
            } else {
              this.characters.takeDamage(null, data.amount);
            }
          }
        }
      ]
    });
    prompt.present();
  }

}
