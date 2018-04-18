import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
declare var google;

@Component({
  selector: 'page-bus',
  templateUrl: 'bus.html',
  template: `<ion-content padding>
  <div id="floating-panel">
    <ion-item>
      <ion-label>ต้นทาง</ion-label>
      <ion-select [(ngModel)]="start" name="start" >
        <ion-option *ngFor="let arrData of arrData" value="{{arrData.name}}" >{{arrData.name}}</ion-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>ปลายทาง</ion-label>
      <ion-select [(ngModel)]="end" name="end">
        <ion-option *ngFor="let arrData of arrData" value="{{arrData.name}}">{{arrData.name}}</ion-option>
      </ion-select>
    </ion-item>
    <button ion-button  (click)="calculateAndDisplayRoute()">ค้นหา</button>
    <button ion-button  (click)="reset()">ล้าง</button>
  </div>
<div id="map"></div>
</ion-content>`
})
export class BusPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusPage');
  }

}
