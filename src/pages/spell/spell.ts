import {Component, Input} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Spell} from "../../models/spell-model";

@Component({
  selector: 'page-spell',
  templateUrl: 'spell.html'
})
export class SpellPage {
  @Input()
  spell: Spell;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
  }

}
