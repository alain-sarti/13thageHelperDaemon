import {Injectable, Input} from '@angular/core';
import 'rxjs/add/operator/map';
import {AlertController, ToastController} from "ionic-angular";
import {TranslateService} from "ng2-translate";

@Injectable()
export class MessageService {
    constructor(public alertController: AlertController,
                public toastController: ToastController,
                public translate: TranslateService) {
    }

    public showToast(message: string): Promise<any> {
        let toast = this.toastController.create({
            message: this.translate.instant(message),
            duration: 3000,
            position: "top"
        });

        return toast.present();
    }

    public showError(message: string): Promise<any> {
        let toast = this.toastController.create({
            message: this.translate.instant(message),
            duration: 3000,
            cssClass: "error",
            position: "top"
        });

        return toast.present();
    }
}
