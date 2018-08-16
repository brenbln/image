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
  alertControlEnabled = false;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private popoverCtrl: PopoverController, public modalCtrl: ModalController) {
    this.images.push(new Image("Alpha", "A-One"));
    this.images.push(new Image("Alpha", "A-Two"));
    this.images.push(new Image("Alpha", "A-Three"));

    this.images.push(new Image("Beta", "B-One"));
    this.images.push(new Image("Beta", "B-Two"));
    this.images.push(new Image("Beta", "B-Three"));
  }

  presentPopover(event: UIEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: event
    });
  }

  prev() {
    this.resetMultiListCheck();
    this.editModeEnabled = false;
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

  /***********************
      EVENT HANDLERS 
   ***********************/

  onLongPress(event, imageList) {
    console.log("Enabling edit mode");
    this.editModeEnabled = true;
  }

  onPressRelease(event, image) {
    null;
  }

  onPress(event, image) {
    this.editModeEnabled = true;
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

/***************************** 
  MODAL PAGE CLASSES BELOW
 *****************************/

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

/*
 * EditPage
 * Handle the logic for "Edit Mode" of the Documents page
 */
@Component({
  selector: 'page-home',
  templateUrl: 'edit.html'
})
export class EditPage {
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  images = [];
  testCheckboxOpen = false;
  testCheckboxResult: any;
  alertControlEnabled: boolean = false;
  editModeEnabled: boolean = false;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public params: NavParams, public alertCtrl: AlertController, public plt: Platform) {

    console.log("DEBUG|LOG: Loading images: " + this.params.get('imgList'));
    this.images.forEach(element => {
      console.log(element.name);
    });
    this.images = this.params.get('imgList');

    // this.plt.ready().then(() => {

    //   this.plt.registerBackButtonAction(() => {
    //     console.log("Back button pressed");
    //   });
    // });
    
   let deregister = this.plt.registerBackButtonAction(() => {
      console.log("Back button pressed");
      this.viewCtrl.dismiss();
      deregister();
    }, 1);

  }

  // prev():
  // Controls back button functionality. If any images are checked, before dismissing the modal, toggle the image check.
  prev() {
    this.resetMultiListCheck();
    this.viewCtrl.dismiss();
  }

  onMovePress(event) {

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
        this.images.forEach(element => {
          if (element.multiListCheck) {
            element.setType(data.toString());
          }
        });
        this.alertControlEnabled = false;
        this.resetMultiListCheck();
      }
    });

    alert.present();
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

  onImagePress(image) {
    console.log("DEBUG|LOG: " + image.name + " checked: " + image.multiListCheck);
  }

  // Helper functions
  resetMultiListCheck() {
    this.images.forEach(element => {
      element.multiListCheck = false;
    });
  }
}