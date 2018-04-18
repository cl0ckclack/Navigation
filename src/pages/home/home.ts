import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { OnePage } from '../one/one';
import { AngularFireDatabase } from 'angularfire2/database';

import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';
declare var google;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {
  polymarker=[]
  triangleCoords1=[]
  tab1Root = OnePage;
  oceanBeach:any;
  haight:any;
  s=[]
  f=[]
  start:any;
  final:any;
 data:any;
 destination0=[];
 destination1=[];
 destination00=[];
 destination11=[];
 MyLocation= [];
 MyLocation1: any;
 request:any;
   map: any;
  image: any;
  marker: any;
  marker1: any;
  lon:any;
  infowindow:any;
  arrData = []
  arratm = []
  atm:any;  
  markeratms=[]
  arrcanteen = []
  canteen:any;  
  markercanteens=[]
  arrtoilet = []
  toilet:any;
  markertoilets=[]
  arrcross = []
  cross:any;  
  markercrosss=[]
  arrDepartments = []
  Department:any;
  markerDepartments=[]
  arrcarpark=[]
  carpark:any;
  markercarparks=[]
  arrbuilding=[]
  building
  markerbuildings=[]
  lat = []
  i:any;
  id:any;
  startclicks:any;
  startclickf:any;
  showPass:any;
  type:any;
  typetoilet:any;
  itemstart=[]
  itemfi=[]
items=[]
valuestart
valuefinal
directionsService
directionsDisplay
myMarkerA
myMarkerB
distanceText=0
distanceVal=0
durationText=0
durationVal=0


constructor(private events:Events,   public navCtrl: NavController, public fdb: AngularFireDatabase, 
  public navParams: NavParams,public alertCtrl:AlertController,public popoverCtrl: PopoverController) {
  this.fdb.list('marker/Department').subscribe(_data => {
    this.arrData = _data;
    this.arrDepartments = _data;
   _data.forEach(arrDat=>{ this.items.push(arrDat.name);});
   this.markerDepartment();
  });
  this.fdb.list('Polygon/Building').subscribe(data => {
    this.arrbuilding = data;
    this.markerbuilding();
  });
  this.fdb.list('marker/canteen').subscribe(_data => {
    this.arrcanteen = _data;
  }); 
  this.fdb.list('marker/toilet').subscribe(data => {
    this.arrtoilet = data;
  }); 
  this.fdb.list('marker/cross').subscribe(data => {
    this.arrcross = data;  
  }); 
  this.fdb.list('marker/atm').subscribe(data => {
    this.arratm = data;  
  }); 
  // this.fdb.list('Polygon/').subscribe(data => {
  //   this.arrcarpark = data;
  // }); 
  this.fdb.list('Polygon/Parking').subscribe(data => {
    this.arrcarpark = data;
  }); 
  
   console.log("CAR");
   this.directionsService = new google.maps.DirectionsService();
   this.directionsDisplay = new google.maps.DirectionsRenderer();
   window.localStorage.setItem("A","");
   window.localStorage.setItem("B","");
   window.localStorage.setItem("AA","");
   window.localStorage.setItem("BB","");
   window.localStorage.setItem("start","");
   window.localStorage.setItem("final","");
}


ionViewDidLoad() {
  this.maps();
  this.current();
  this.time();
}

maps(){
  let that = this;
  that.map = new google.maps.Map(document.getElementById('map'), {
         zoom: 15,
         center: {lat: 19.028470  , lng: 99.896315},
         zoomControl:false,
         streetViewControl:false,
         fullscreenControl: false
       });
}

time(){
  // this.events.publish('distanceText', this.distanceText); 
  // this.events.publish('distanceVal', this.distanceVal);
  // this.events.publish('durationText', this.durationText);
  // this.events.publish('durationVal', this.durationVal);
  this.events.subscribe('distanceText', (user) => {
    this.distanceText = user;
  });
  this.events.subscribe('distanceVal', (user) => {
    this.distanceVal = user;
  });
  this.events.subscribe('durationText', (user) => {
    this.durationText = user;
  });
  this.events.subscribe('durationVal', (user) => {
    this.durationVal = user;
  });
}


presentPopover(myEvent) {
  this.events.subscribe('myMarkerA', (user) => {
    this.myMarkerA = user;
  });
  this.events.subscribe('myMarkerB', (user) => {
    this.myMarkerB = user;
  });
  let popover = this.popoverCtrl.create(OnePage,{audit:this.map,audit1:this.directionsDisplay,audit2:this.directionsService,myMarkerA:this.myMarkerA,myMarkerB:this.myMarkerB,MyLocation1:this.MyLocation1});
  popover.present({
    ev: myEvent,
  });
}

markerthangyak(){
  var icon = {
    url: "https://www.picz.in.th/images/2017/09/26/2583bbbddcb40a896.png", // url
    scaledSize: new google.maps.Size(25, 25), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };
  let lat = this.arrData;
  var marker,info,i,j;
 for(i=0;i<lat.length;i++){
 var lat1 = lat[i];

 info = new google.maps.InfoWindow();
 marker = new google.maps.Marker({
  position : new google.maps.LatLng(lat1.itemName,lat1.itemNumber),
  map: this.map,
  title: 'locationssdasdasdasdasdasdasdasdasasdasasd',
  icon: icon
  });
  var image = new Image();
  image.src = lat1.photo;
  document.body.appendChild(image);
  info = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, 'click', (function(marker, i) {
  return function() {
  info.setContent(image);
  info.open(this.map, marker);
  }
  })(marker, i));
 }
}

markercanteen(){
  this.canteen = !this.canteen;
  if (this.canteen){
  var icon = "assets/images/โรงอาหาร.png";
  var c = new google.maps.MarkerImage(
    icon,
    new google.maps.Size(71, 71),
    new google.maps.Point(0, 0),
    new google.maps.Point(17, 34),
    new google.maps.Size(25, 25));
  let lat = this.arrcanteen;

  var marker,info,i;
  for(i=0;i<lat.length;i++){
  var lat1 = lat[i];
    info = new google.maps.InfoWindow();
    let marker = new google.maps.Marker({
    position : new google.maps.LatLng(lat1.lat,lat1.lng),
    map: this.map,
    title: lat1.name,
    icon: c
    });
    var contentString = 
    `<h10>`+lat1.name+`</h10>
    <div><img src="`+lat1.photo+`"/></div>
    คำแนะนำ 
    <p>`+lat1.des+`</p> 
    `;
    let infowindow = new google.maps.InfoWindow({
      content : contentString
    });
    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    });
    this.markercanteens.push(marker);
  }
  }
  else {
  for(i=0;i<this.markercanteens.length;i++){
  if(this.markercanteens[i]){
  this.markercanteens[i].setMap(null)}
    this.typetoilet = "canteen";
  }
  }
}

markertoilet(){
  this.toilet = !this.toilet;
  if (this.toilet){
  var icon = "assets/images/ห้องน้ำ.png";
  var c = new google.maps.MarkerImage(
    icon,
    new google.maps.Size(71, 71),
    new google.maps.Point(0, 0),
    new google.maps.Point(17, 34),
    new google.maps.Size(25, 25));
  /*var icon = {
      url: "https://www.picz.in.th/images/2017/09/26/2583bbbddcb40a896.png", // url
      scaledSize: new google.maps.Size(25, 25), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
  };*/
  let lat = this.arrtoilet;

  var marker,info,i;
  for(i=0;i<lat.length;i++){
  var lat1 = lat[i];
    info = new google.maps.InfoWindow();
    let marker = new google.maps.Marker({
    position : new google.maps.LatLng(lat1.lat,lat1.lng),
    map: this.map,
    title: lat1.name,
    icon: c,
    });
    var contentString = 
    `<h10>`+lat1.name+`</h10>
    <div><img src="`+lat1.photo+`"/></div>
    คำแนะนำ 
    <p>`+lat1.des+`</p> 
    `;
    let infowindow = new google.maps.InfoWindow({
      content : contentString
    });
    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    });
    this.markertoilets.push(marker);
  }
  }
  else {
  for(i=0;i<this.markertoilets.length;i++){
  if(this.markertoilets[i]){
  this.markertoilets[i].setMap(null)}
    this.typetoilet = "toilet";
  }
  }
}

markercross(){
  this.cross = !this.cross;
  if (this.cross){
  var icon = "assets/images/ทางแยก.png";
  var c = new google.maps.MarkerImage(
    icon,
    new google.maps.Size(71, 71),
    new google.maps.Point(0, 0),
    new google.maps.Point(17, 34),
    new google.maps.Size(25, 25));

  let lat = this.arrcross;
  var marker,info,i,j;
  for(i=0;i<lat.length;i++){
  var lat1 = lat[i];
  let marker = new google.maps.Marker({
  position : new google.maps.LatLng(lat1.lat,lat1.lng),
  map: this.map,
  title: lat1.name,
  icon: c
  });
  var image = new Image();
  image.src = lat1.photo;
  document.body.appendChild(image);
  var contentString = 
  `<h4>`+lat1.name+`</h4>
  <div><img src="`+lat1.photo+`"/></div>
  คำแนะนำ 
  <p>`+lat1.des+`</p> 
  `;
  let info = new google.maps.InfoWindow({
    content : contentString
  });
  google.maps.event.addListener(marker, 'click', (function(marker, i) {
  return function() {
  // info.setContent(image);
  info.open(this.map, marker);
  }
  })(marker, i));
  this.markercrosss.push(marker);
  }
  }
  else {
  for(i=0;i<this.markercrosss.length;i++){
  if(this.markercrosss[i]){
  this.markercrosss[i].setMap(null)}
  this.typetoilet = "cross";
  }
  }

}

markerAtm(){
  this.atm = !this.atm;
  if (this.atm){
   var icon = "assets/images/atm.png";
  var c = new google.maps.MarkerImage(
    icon,
    new google.maps.Size(71, 71),
    new google.maps.Point(0, 0),
    new google.maps.Point(17, 34),
    new google.maps.Size(25, 25));

 let lat = this.arratm;
 var marker,info,i,j;
 for(i=0;i<lat.length;i++){
 var lat1 = lat[i];
 let marker = new google.maps.Marker({
 position : new google.maps.LatLng(lat1.lat,lat1.lng),
 map: this.map,
 title: lat1.name,
 icon: c
 });
 var contentString = 
 `<h10>`+lat1.name+`</h10>
 <div><img src="`+lat1.photo+`"/></div>
 คำแนะนำ 
 <p>`+lat1.des+`</p> 
 `;
 let info = new google.maps.InfoWindow({
   content : contentString
 });
 marker.addListener('click', function() {
  info.open(this.map, marker);
 });
 this.markeratms.push(marker);
 }
 }
 else {
  for(i=0;i<this.markeratms.length;i++){
 if(this.markeratms[i]){
  this.markeratms[i].setMap(null)}
   this.typetoilet = "atm";
 }
 }

}

markerDepartment(){
  this.Department = !this.Department;
  if (this.Department){
   var icon = "assets/images/ตึก.png";
  var c = new google.maps.MarkerImage(
    icon,
    new google.maps.Size(71, 71),
    new google.maps.Point(0, 0),
    new google.maps.Point(17, 34),
    new google.maps.Size(25, 25));

 let lat = this.arrDepartments;
 var marker,info,i,j;
 for(i=0;i<lat.length;i++){
 var lat1 = lat[i];
 let marker = new google.maps.Marker({
 position : new google.maps.LatLng(lat1.lat,lat1.lng),
 map: this.map,
 title: lat1.name,
 icon: c
 });
 var contentString = 
 `<h10>`+lat1.name+`</h10>
 <div><img src="`+lat1.photo+`"/></div>
 คำแนะนำ 
 <p>`+lat1.des+`</p> 
 `;
 let info = new google.maps.InfoWindow({
   content : contentString
 });
  //   // var contentString = `<div>`+lat1.name+`</div>`;
  //  var contentString = 
  //  `</div><h10 id="firstHeading" class="firstHeading">`+lat1.name+`</h10></div>`;
  //  let infowindow = new google.maps.InfoWindow({
  //   // content: lat1.name
  //   content: contentString
  //  });
 marker.addListener('click', function() {
  info.open(this.map, marker);
 });
 this.markerDepartments.push(marker);
 }
 }
 else {
  for(i=0;i<this.markerDepartments.length;i++){
 if(this.markerDepartments[i]){
  this.markerDepartments[i].setMap(null)}
   this.typetoilet = "Department";
 }
 }

}

markercarpark(){
    this.carpark = !this.carpark;
    if (this.carpark){
    var j = this.arrcarpark;
  
  var k,i,lat,lng,total
  for(k=0;k<j.length;k++){
    var d = this.arrcarpark[k];
    this.triangleCoords1=[]
    var m=[];
    for(i=0;i<d.cor.length;i++){  
      var fruitvegbasket = [];
      var fruitvegbasket1 = [];
      var total1 = []
      var total11 = []
      fruitvegbasket.push(d.cor[i].lat);
      total1=fruitvegbasket;
      fruitvegbasket1.push(d.cor[i].lng);
      total11=fruitvegbasket1;
      var z = new google.maps.LatLng(total1,total11);
      this.triangleCoords1.push(z);
       m[i] = new google.maps.LatLng(d.lat,d.lng)
    }
    
    var polyBounds = new google.maps.LatLngBounds();
    var IWpoint = polyBounds.getCenter();
    var bermudaTriangle = new google.maps.Polygon({
      paths: this.triangleCoords1,
      // strokeColor: '#FF0000',#56B949
      strokeColor: '#000000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      // fillColor: '#FF0000',#56B949
      fillColor: '#ffff00',
      fillOpacity: 0.35
  
    });
    
    let a = bermudaTriangle.setMap(this.map);
    var contentString = 
    `<h10>`+d.name+`</h10>
    <div><img src="`+d.photo+`"/></div>`;
    let infowindow = new google.maps.InfoWindow({
      content : contentString
    });
     for(let i of m){
     bermudaTriangle.addListener('click', function() {
      infowindow.setPosition(i);
      infowindow.open(this.map, bermudaTriangle);
     });
    this.markercarparks.push(bermudaTriangle);
  }
  } 
  }
  else {
  for(i=0;i<this.markercarparks.length;i++){
  if(this.markercarparks[i]){
  this.markercarparks[i].setMap(null)}
  this.typetoilet = "carpark";
  }
  }
}

markerbuilding(){
  this.building = !this.building;
  if (this.building){

  var j = this.arrbuilding;
  var k,i,lat,lng,total
  for(k=0;k<j.length;k++){
  var d = this.arrbuilding[k];
  this.triangleCoords1=[]
  var m=[];
  for(i=0;i<d.cor.length;i++){  
    var fruitvegbasket = [];
    var fruitvegbasket1 = [];
    var total1 = []
    var total11 = []
    fruitvegbasket.push(d.cor[i].lat);
    total1=fruitvegbasket;
    fruitvegbasket1.push(d.cor[i].lng);
    total11=fruitvegbasket1;
    var z = new google.maps.LatLng(total1,total11);
    this.triangleCoords1.push(z);
    m[i] = new google.maps.LatLng(d.lat,d.lng)
  }
  
  var polyBounds = new google.maps.LatLngBounds();
  var IWpoint = polyBounds.getCenter();
  var bermudaTriangle = new google.maps.Polygon({
    paths: this.triangleCoords1,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35

  });
  
  bermudaTriangle.setMap(this.map);
  var contentString = 
  `<h10>`+d.name+`</h10>
  <div><img src="`+d.photo+`"/></div>`;
  let infowindow = new google.maps.InfoWindow({
    content : contentString
  });
   for(let i of m){
   bermudaTriangle.addListener('click', function() {
    infowindow.setPosition(i);
    infowindow.open(this.map,bermudaTriangle);
   });
  }
  this.markerbuildings.push(bermudaTriangle);
  
  }
  }
  else {
  for(i=0;i<this.markerbuildings.length;i++){
  if(this.markerbuildings[i]){
  this.markerbuildings[i].setMap(null)}
  this.typetoilet = "building";
  }
  }
}

current(){
  let that = this;
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      that.MyLocation1 = pos;
      that.events.publish("mytime",that.MyLocation1);
  });
 }  
 this.image='https://www.picz.in.th/images/2017/09/25/39574103a59ea2408.png';
//  let that = this;
setInterval(function(){
   var icon = {
     url: "https://www.picz.in.th/images/2017/09/25/39574103a59ea2408.png", // url
     scaledSize: new google.maps.Size(25, 25), // scaled size
     origin: new google.maps.Point(0,0), // origin
     anchor: new google.maps.Point(0,0) // anchor
  };
 
   if(that.marker){
   that.marker .setMap(null)}
  that.marker = new google.maps.Marker({
     position : new google.maps.LatLng(that.MyLocation1),
     map: that.map,
     title: 'locationssdasdasdasdasdasdasdasdasasdasasd',
     icon :  icon
     });
  },1000)
}

}
