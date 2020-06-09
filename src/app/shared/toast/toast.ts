import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Toast {
    constructor(private toaster: ToastController) {}

    async open(message) {
        let toast = await this.toaster.create({
            message,
            duration: 2000
        })
        toast.present();
    }
}