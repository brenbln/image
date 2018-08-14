import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AlertController, PopoverController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  buttons = [];
  testCheckboxOpen = false;
  testCheckboxResult: any;
  multiSelectEnabled: boolean = false;
  alertControlEnabled = false;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private popoverCtrl: PopoverController, public modalCtrl: ModalController) {
    this.buttons.push(new Button("Alpha", "A-One"));
    this.buttons.push(new Button("Alpha", "A-Two"));
    this.buttons.push(new Button("Alpha", "A-Three"));

    this.buttons.push(new Button("Beta", "B-One"));
    this.buttons.push(new Button("Beta", "B-Two"));
    this.buttons.push(new Button("Beta", "B-Three"));
  }

  presentPopover(event: UIEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: event
    });
  }

  onLongPress(event, button) {

    this.multiSelectEnabled = true;
    if (!this.alertControlEnabled) {
      console.log(button.name + button.type);
      let alert = this.alertCtrl.create();
      this.alertControlEnabled = true;
      alert.setTitle("Change type");
      alert.addInput({
        type: 'radio',
        label: 'Alpha',
        value: 'Alpha',
      });

      alert.addInput({
        type: 'radio',
        label: 'Beta',
        value: 'Beta',
      });

      alert.addButton({
        text: 'Cancel',
        handler: () => {
          this.alertControlEnabled = false;
        }
      });

      alert.addButton({
        text: 'Move',
        handler: (data: any) => {
          console.log('Checkbox data:', data);
          this.testCheckboxOpen = false;
          this.testCheckboxResult = data;
          button.setType(data.toString());
          this.alertControlEnabled = false;
          console.log('Button changed to: ' + button.type.toString());
        }
      });

      alert.present();
    }
  }

  onPressRelease(event, button) {
    this.alertControlEnabled = false;
  }

  onPress(event, button) {

  }

  prev() {
    this.multiSelectEnabled = false;
  }

}

class Button {
  img: string;
  constructor(public type: string, public name: string) {
    this.type = type;
    this.name = name;
    this.img = "assets/imgs/logo.png";
  }

  private setType(type: string) {
    this.type = type;
  }
}

@Component({
  template: `<ion-list>
              <ion-list-header>Ionic</ion-list-header>
              <button ion-item (click)="close()">Learn Ionic</button>
              <button ion-item (click)="close()">Documentation</button>
              <button ion-item (click)="close()">Showcase</button>
              <button ion-item (click)="close()">GitHub Repo</button>
            </ion-list>
`
})
export class PopoverPage {
  constructor(public viewCtrl: ViewController) { }

  close() {
    this.viewCtrl.dismiss();
  }
}
