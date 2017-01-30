import { Component } from '@angular/core';
import {ChaosMageService} from "../../providers/chaos-mage-service";

@Component({
  selector: 'page-chaos-mage',
  templateUrl: './chaos-mage.html'
})
export class ChaosMagePage {
  public counter: number;

  constructor(public service: ChaosMageService) {}

  ionViewDidLoad() {
    this.counter = this.service.spellTypes.length;
  }

  public nextSpellType() {
    let type = this.service.nextSpellType();
    console.log(type);
    this.counter = this.service.spellTypes.length;
  }

}
