import {Component} from "@angular/core";
import {AlertController} from "ionic-angular";
import {DataService} from "../../providers/data-service";
import {TranslateService} from "ng2-translate";

@Component({
    selector: "page-initiative-tracker",
    templateUrl: "./initiative-tracker.html"
})
export class InitiativeTrackerPage {
    readonly MASTER = "master";
    readonly PLAYERS = "players";
    readonly DB_KEY = "initiative-segments";

    public segments: Array<{type: string, slot: number, player: string}> = [];

    constructor(public alertController: AlertController,
                public data: DataService,
                public translate: TranslateService) {
        this.data.load(this.DB_KEY).then((data) => {
            this.segments = data.value;
        }).catch((error) => {
            if (error.status != 404) {
                console.log("it load data: " + error);
            }
        });
    }

    ionViewDidLoad() {
    }

    public showDialog(type: string) {
        let prompt = this.alertController.create({
            title: this.translate.instant("initiative-tracker.add.title"),
            message: this.translate.instant("initiative-tracker.add.message"),
            inputs: [
                {
                    type: "number",
                    name: "slot",
                    placeholder: this.translate.instant("initiative-tracker.add.ph-slot")
                },
                {
                    type: "String",
                    name: "player",
                    placeholder: this.translate.instant("initiative-tracker.add.ph-player")
                }
            ],
            buttons: [
                {
                    text: this.translate.instant("btn.cancel")
                },
                {
                    text: this.translate.instant("btn.save"),
                    handler: data => {
                        this.addSlot(type, data.slot, data.player);
                    }
                }
            ]
        });
        prompt.present();
    }

    public reset() {
        this.segments = [];
        this.saveSegments();
    }

    public icon(type: string): string {
        if (type == this.MASTER) {
            return "nuclear";
        }
        else {
            return "contacts";
        }
    }

    private addSlot(type: string, slot: number, player: string): void {
        if (type == this.MASTER && !player) {
            player = "Master";
        }
        this.segments.push({
            type: type,
            slot: slot,
            player: player
        });

        this.segments.sort((n1, n2) => {
            if (n1.slot - n2.slot != 0) {
                return n2.slot - n1.slot;
            }
            else {
                return n1.type == this.MASTER ? 1 : -1;
            }
        });
        this.saveSegments();
    }

    private saveSegments() {
        this.data.save(this.DB_KEY, this.segments);
    }

}
