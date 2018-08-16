import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, Alert, Platform } from 'ionic-angular';
import { AlertController, PopoverController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  images = [];
  testCheckboxOpen = false;
  testCheckboxResult: any;
  editModeEnabled: boolean = false;
  uploadModeEnabled: boolean = false;
  uploadAllowed: boolean = true;
  alertControlEnabled: boolean = false;

  deregister = null;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private popoverCtrl: PopoverController, public modalCtrl: ModalController, public plt: Platform) {
    this.images.push(new Image("Alpha", "A-One"));
    this.images.push(new Image("Alpha", "A-Two"));
    this.images.push(new Image("Alpha", "A-Three"));

    this.images.push(new Image("Beta", "B-One"));
    this.images.push(new Image("Beta", "B-Two"));
    this.images.push(new Image("Beta", "B-Three"));

    this.uploadCheck();
    
  }

  presentPopover(event: UIEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: event
    });
  }

  prev() {
      this.deregister();
      this.resetMultiListCheck();
      this.editModeEnabled = false;
      this.uploadModeEnabled = false;
  }

  resetMultiListCheck() {
    this.images.forEach(element => {
      element.multiListCheck = false;
    });
  }

  updateList(image) {

    if (!image.multiListCheck) {
      image.multiListCheck = true;
      console.log("DEBUG|LOG: Checked " + image.name);
    } else {
      image.multiListCheck = false;
      console.log("DEBUG|LOG: Unchecked " + image.name);
    }
  }

  uploadCheck() {
    if (this.images.length > 0) {
      this.uploadAllowed = true;
    } else {
      this.uploadAllowed = false;
    }
  }
  

  /***********************
      EVENT HANDLERS 
   ***********************/

  onLongPress(event, imageList) {
    console.log("Enabling edit mode");
    this.editModeEnabled = true;
    this.deregister = this.plt.registerBackButtonAction(() => {
      console.log("Back button pressed");
      this.prev();
    }, 0);
  }

  onPressRelease(event, image) {
    null;
  }

  onPress(event, image) {
    
  }

  onImagePress(image) {
    console.log("DEBUG|LOG: " + image.name + " checked: " + image.multiListCheck);
  }

  onMovePress(event) {

    let alert = this.alertCtrl.create();
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
        this.images.forEach(element => {
          if (element.multiListCheck) {
            element.setType(data.toString());
          }
        });
        this.editModeEnabled = false;
        this.resetMultiListCheck();
      }
    });

    alert.present();
  }

  onUploadPress(event) {
    console.log("Enabling upload mode");
    this.uploadModeEnabled = true;
    this.deregister = this.plt.registerBackButtonAction(() => {
      console.log("Back button pressed");
      this.prev();
    }, 0);
  }

}

class Image {
  img: string;
  multiListCheck: boolean = false;
  constructor(public type: string, public name: string) {
    this.type = type;
    this.name = name;
    this.img = "assets/imgs/logo.png";
  }

  private setType(type: string) {
    this.type = type;
  }
}

/*
 * PopoverPage
 * Handles the vertical three-dot vertical drop down on the root Documents page
 */
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