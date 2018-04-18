import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams ,AlertController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { Events } from 'ionic-angular';
// import { Storage } from '@ionic/storage';
// import { NativeStorage } from '@ionic-native/native-storage';
declare var google;

@IonicPage()
@Component({
   selector: 'page-one',
    template: `
    <div>
    <label style="margin-bottom: 0px;">ต้นทาง</label>
    <p style="margin-bottom: 0px;">
    <input type="text" list="cars"  (change)="setst()" placeholder="{{valuestart}}" [(ngModel)]="start" (focus)="focusst()" /></p>
    <p style="margin-bottom: 0px;">
    <button ion-button  (click)="addcr()" round style="padding-left: 10px;padding-right: 10px;" color="danger"><ion-icon name="ios-locate-outline"></ion-icon>&nbsp;&nbsp;Location</button>
    </p>
    <datalist id="cars">
        <option *ngFor="let c of items" (change)="show()"  [ngValue]="c" > {{c}} </option>
    </datalist>
    </div>
    <div>
    <label style="margin-bottom: 0px;">ปลายทาง</label>
    <p style="margin-bottom: 0px;">
    <input type="text" list="cars" (change)="setfn()"  placeholder="{{valuefinal}}" [(ngModel)]="final" (focus)="focusfn()"/>
    </p>
  <datalist id="cars">
      <option *ngFor="let c of items" [ngValue]="c" ng-change="show()"> {{c}} </option>
  </datalist>
    </div>

  <button ion-button  (click)="click()" round color="primary">ค้นหา</button>
  <button ion-button  (click)="reset()" round color="danger">ลบ</button>
  `
})

export class OnePage {
    valueStart=[]
    valueFinal=[]
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
    MyLocationTime
    request:any;
    map: any;
    image: any;
    marker: any;
    marker1: any;
    lon:any;
    infowindow:any;
    arrData = []
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
  valuestart:any;
  valuefinal:any;
  deletemap:any;
  directionsDisplay
  directionsService
  myMarkerA
  myMarkerB
  a
  aa
  b
  bb
Interval
distanceText
distanceVal
durationText
durationVal
 
 constructor(private events:Events ,public fdb: AngularFireDatabase,public alertCtrl:AlertController
  ,public popoverCtrl: PopoverController,public navCtrl: NavController, public navParams: NavParams) {
    console.log("POPOVER CAR");
    this.valuestart = window.localStorage.getItem("start");
    this.valuefinal = window.localStorage.getItem("final");
  
    this.map = navParams.get('audit');
    this.directionsDisplay = navParams.get('audit1');
    this.directionsService = navParams.get('audit2');
    this.myMarkerA = navParams.get('myMarkerA');
    this.myMarkerB = navParams.get('myMarkerB');
    this.MyLocation1 = navParams.get('MyLocation1');

    this.fdb.list('marker/Department').subscribe(_data => {
          this.arrData = _data;
          this.arrDepartments = _data;
        _data.forEach(arrDat=>{ this.items.push(arrDat.name);});
    }); 
    
  
  this.fdb.list('marker/Agency').subscribe(_data => {
   _data.forEach(arrDat=>{ this.items.push(arrDat.name);});
   _data.forEach(arrDat=>{ this.arrData.push(arrDat);});
   console.log(this.items);
  }); 

    console.log(this.MyLocation1);

}

ionViewDidLoad() {
  
  // this.current();
 
}

time(){
  this.events.subscribe('mytime', (user) => {
    console.log('mytime', user);
    this.MyLocationTime = user;
  });
  this.Interval=setInterval(function(){
    let  that = this;
  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition(function(position) {
  //       var pos = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       };
  //       that.MyLocationTime = pos;
  //       console.log(that.MyLocationTime);
  //   });
  //  }
 var time = new google.maps.LatLng(this.MyLocationTime);
  var request={
    origin: time,
    destination: this.oceanBeach,
    travelMode: 'TRANSIT',
      //travelMode: 'DRIVING',
       };
       this.directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        that.distanceText=response.routes[0].legs[0].distance.text; // ระยะทางข้อความ
        that.distanceVal=response.routes[0].legs[0].distance.value;// ระยะทางตัวเลข
        that.durationText=response.routes[0].legs[0].duration.text; // ระยะเวลาข้อความ
        that.durationVal=response.routes[0].legs[0].duration.value; // ระยะเวลาตัวเลข  
        // this.events.publish('distanceText', this.distanceText); 
        // this.events.publish('distanceVal', this.distanceVal);
        // this.events.publish('durationText', this.durationText);
        // this.events.publish('durationVal', this.durationVal);
        // console.log(this.addressStart);
        // console.log(this.addressEnd);
        // console.log(this.distanceText);
        // console.log(this.distanceVal);
        // console.log(this.durationText);
        // console.log(this.durationVal);
      } else {
        window.alert("ค่าไม่ครบ");
      }
      setTimeout(function(){
        that.callback();
      },1500)
    });
  },1000)
}


asdasd(){
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
      {
          origins: this.haight,
          destinations: this.oceanBeach,
          travelMode: 'DRIVING'
      }, callback);
  
  function callback(response, status) {
      if (status == 'OK') {
          var origins = response.originAddresses;
          console.log(origins);
          var destinations = response.destinationAddresses;
          console.log(destinations);
          for (var i = 0; i < origins.length; i++) {
              var results = response.rows[i].elements;
              console.log(results);
              for (var j = 0; j < results.length; j++) {
                  var element = results[j];
                  console.log(element);
                  var distance = element.distance.text;
                  console.log(distance);
                  var duration = element.duration.text;
                  console.log(duration);
                  var from = origins[i];
                  console.log(from);
                  var to = destinations[j];
                  console.log(to);
              }
          }
      }
  }
}

setst(){
  console.log(this.start);
  window.localStorage.setItem("start",this.start);
}

setfn(){
  window.localStorage.setItem("final",this.final);
}

  focusst(){
    // this.start ="จุดเริ่มต้น";
    window.localStorage.setItem("start","หมุดstart");
    // this.events.publish('start', "จุดเริ่มต้น");
    var st ="assets/icon/st.png";
    var c = new google.maps.MarkerImage(
      st,
      new google.maps.Size(71, 71),
      new google.maps.Point(0, 0),
      new google.maps.Point(17, 34),
      new google.maps.Size(25, 25));
      // this.myMarkerA = window.localStorage.setItem("myMarkerA",myMarkerA);
       console.log(this.myMarkerA);
      if(this.myMarkerA!=null){
      this.myMarkerA.setMap(null);}
    var myMarkerA = new google.maps.Marker({
      position: new google.maps.LatLng(19.02850, 99.89634),
      draggable: true,
      icon : c
    });
    this.map.setCenter(myMarkerA.position);
    myMarkerA.setMap(this.map);
    // first page (publish an event when a user is created)
    console.log('User created!')
    this.events.publish('myMarkerA', myMarkerA);
    this.myMarkerA=myMarkerA;
    console.log(this.myMarkerA);
    
    // window.localStorage.setItem("myMarkerA",myMarkerA);
    // this.myMarkerA = window.localStorage.getItem("myMarkerA");
    // console.log(this.myMarkerA);
    // // this.myMarkerA=myMarkerA;
    // console.log(myMarkerA);
    
    google.maps.event.addListener(myMarkerA, 'dragend', function (evt) {
      var A = evt.latLng.lat();
      var B = evt.latLng.lng();
      // console.log(A);
      // console.log(B);
      window.localStorage.setItem("A",A);
      window.localStorage.setItem("B",B);
      // this.events.publish('A', A);
      // this.events.publish('A', A);
    });
  }

  focusfn(){
    window.localStorage.setItem("final","หมุดfinish");
    // this.events.publish('final', "จุดปลายทาง");
    // this.final = "จุดปลายทาง"
    var st ="assets/icon/fn.png";
    var c = new google.maps.MarkerImage(
      st,
      new google.maps.Size(71, 71),
      new google.maps.Point(0, 0),
      new google.maps.Point(17, 34),
      new google.maps.Size(25, 25));
       console.log(this.myMarkerB);
      if(this.myMarkerB!=null){
      this.myMarkerB.setMap(null);}
    var myMarkerB = new google.maps.Marker({
      position: new google.maps.LatLng(19.02850, 99.89634),
      draggable: true,
      icon : c
    });
    this.map.setCenter(myMarkerB.position);
    myMarkerB.setMap(this.map);
    console.log('User created!')
    this.events.publish('myMarkerB', myMarkerB);
 

    this.myMarkerB=myMarkerB;
    console.log(this.myMarkerB);
    google.maps.event.addListener(myMarkerB, 'dragend', function (evt) {
      var AA = evt.latLng.lat();
      var BB = evt.latLng.lng();
      // console.log(AA);
      // console.log(BB);
      window.localStorage.setItem("AA",AA);
      window.localStorage.setItem("BB",BB);
      // this.events.publish('AA', AA);
      // this.events.publish('AA', AA);
    });
  }


  addcr(){
    // this.start=null
    this.start = "ตำแหน่งปัจจุบัน";
    window.localStorage.setItem("start","ตำแหน่งปัจจุบัน");
    // this.events.publish('start', "ตำแหน่งปัจจุบัน");
    // this.haight = new google.maps.LatLng(this.MyLocation1);
    // this.startclicks = "ตำแหน่งปัจจุบัน";
   
    // this.reset();

    // window.localStorage.setItem("aaa",this.start);
    // var aaa = window.localStorage.getItem('aaa');
  }
 
  start1(){
    this.start = window.localStorage.getItem("start");
    // this.events.subscribe('start', (user) => {
    //   this.start = user;
    // });
    // this.events.publish('A', A);
    var start1 = this.arrData;
    var i;
    if(this.start ==="ตำแหน่งปัจจุบัน"){  
        console.log("ตำแหน่งปัจจุบัน");
        console.log(this.MyLocation1);
        this.haight = new google.maps.LatLng(this.MyLocation1);
    }else if(this.start==="หมุดstart"){
      var a = window.localStorage.getItem("A");
      var b = window.localStorage.getItem("B");
      // this.events.subscribe('A', (user) => {
      //    this.a = user;
      // });
      // this.events.subscribe('A', (user) => {
      //   this.b = user;
      // });
      this.haight = new google.maps.LatLng(a,b);
    }
    else{
      var startt = this.start;
    for(i=0;i<start1.length;i++){
       var name = start1[i];
     if(startt === name.name){
       var fruitvegbasket = [];
       var fruitvegbasket1 = [];
       fruitvegbasket.push(name.lat);
       this.destination0=fruitvegbasket;
       fruitvegbasket1.push(name.lng);
       this.destination00=fruitvegbasket1;
     }
     this.haight = new google.maps.LatLng(this.destination0,this.destination00);
    }
   }
   console.log(this.haight);
   if(this.myMarkerA!=null){
    this.myMarkerA.setMap(null);}
   
  }

  final1(){
    this.final = window.localStorage.getItem("final");
    // this.events.subscribe('final', (user) => {
    //   this.final = user;
    // });
    var start1 = this.arrData;
    var i;
    if(this.final==="หมุดfinish"){
      var aa = window.localStorage.getItem("AA");
      var bb = window.localStorage.getItem("BB");
      this.events.subscribe('AA', (user) => {
        this.aa = user;
      });
      this.events.subscribe('BB', (user) => {
        this.bb = user;
      });
      this.oceanBeach = new google.maps.LatLng(aa,bb);
    }else{
    for(i=0;i<start1.length;i++){
       var name = start1[i];
  
     if(this.final===name.name){
  
      var fruitvegbasket = [];
      var fruitvegbasket1 = [];
      fruitvegbasket.push(name.lat);
      this.destination1=fruitvegbasket;
      fruitvegbasket1.push(name.lng);
      this.destination11=fruitvegbasket1;
     }
    }
     this.oceanBeach = new google.maps.LatLng(this.destination1,this.destination11);
   }
   console.log(this.oceanBeach);
   if(this.myMarkerB!=null){
    this.myMarkerB.setMap(null);}
  }
  
  click(){
    
    // this.current();
    console.log(this.final);
    console.log(this.start);
    this.start1();
    this.final1();
    // this.asdasd();
    this.calculateAndDisplayRoute();
    // this.time();
    // this.image='https://www.picz.in.th/images/2017/09/25/39574103a59ea2408.png';
    //   let that = this;
    //  setInterval(function(){
    //     var icon = {
    //       url: "https://www.picz.in.th/images/2017/09/25/39574103a59ea2408.png", // url
    //       scaledSize: new google.maps.Size(25, 25), // scaled size
    //       origin: new google.maps.Point(0,0), // origin
    //       anchor: new google.maps.Point(0,0) // anchor
    //    };
      
    //     if(that.marker){
    //     that.marker .setMap(null)}
    //    that.marker = new google.maps.Marker({
    //       position : new google.maps.LatLng(that.MyLocation1),
    //       map: that.map,
    //       title: 'locationssdasdasdasdasdasdasdasdasasdasasd',
    //       icon :  icon
    //       });
          
    //  },1000)
     this.startclicks = 'null'
  }

  calculateAndDisplayRoute() {
      console.log(this.haight);
      console.log(this.oceanBeach);
      // var aaa =  window.localStorage.getItem('aaa');
      let  that = this;
      this.directionsDisplay.setMap(this.map);
      // this.directionsService.getDistanceMatrix(
      //   {
      //     origin: this.haight,
      //     destination: this.oceanBeach,
      //       travelMode: 'DRIVING',
      //   }, this.time());
    var request={
      origin: this.haight,
      destination: this.oceanBeach,
        travelMode: 'DRIVING',
         };
         this.directionsService.route(request, function(response, status) {
        if (status == 'OK') {    
            that.directionsDisplay.set(null);
            that.directionsDisplay.setDirections(response);
            that.distanceText=response.routes[0].legs[0].distance.text; // ระยะทางข้อความ
            that.distanceVal=response.routes[0].legs[0].distance.value;// ระยะทางตัวเลข
            that.durationText=response.routes[0].legs[0].duration.text; // ระยะเวลาข้อความ
            that.durationVal=response.routes[0].legs[0].duration.value; // ระยะเวลาตัวเลข 
              console.log(that.distanceText);
              console.log(that.distanceVal);
              console.log(that.durationText);
              console.log(that.durationVal);
           
              // var element = response.elements;
              // // var element = results;
            

        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

      // that.Interval=setInterval(function(){
      //   let directionsService = new google.maps.DirectionsService;
      //   let directionsDisplay = new google.maps.DirectionsRenderer;
      //  var mappp = new google.maps.Map(document.getElementById('mapssss'), {
      //     zoom: 15,
      //     center: {lat: 19.028470  , lng: 99.896315}
      //   });
      //   console.log("skg;]k");
      //   directionsDisplay.setMap(mappp);
      //   var request={
      //     origin: this.haight,
      //     destination: this.oceanBeach,
      //       travelMode: 'DRIVING',
      //        };
      //   directionsService.route(request, function(response, status) {
      //     if (status == 'OK') {    
      //       console.log("ทำงาน");
      //         that.distanceText=response.routes[0].legs[0].distance.text; // ระยะทางข้อความ
      //         that.distanceVal=response.routes[0].legs[0].distance.value;// ระยะทางตัวเลข
      //         that.durationText=response.routes[0].legs[0].duration.text; // ระยะเวลาข้อความ
      //         that.durationVal=response.routes[0].legs[0].duration.value; // ระยะเวลาตัวเลข 
      //         console.log(that.distanceText);
      //         console.log(that.distanceVal);
      //         console.log(that.durationText);
      //         console.log(that.durationVal);
      //         console.log(this.distanceText);
      //         console.log(this.distanceVal);
      //         console.log(this.durationText);
      //         console.log(this.durationVal);
      //     } else {
      //       window.alert('Directions request failed due to ' + status);
      //     }
      //   });
      //   that.callback();
      // },1000)
      // console.log(this.distanceText);
        // console.log(this.distanceVal);
        // console.log(this.durationText);
        // console.log(this.durationVal);
      // this.events.publish('distanceText', this.distanceText); 
      // this.events.publish('distanceVal', this.distanceVal);
      // this.events.publish('durationText', this.durationText);
      // this.events.publish('durationVal', this.durationVal);
      // this.events.publish('distanceText', "10"); 
      //   this.events.publish('distanceVal', "10");
      //   this.events.publish('durationText', "10");
      //   this.events.publish('durationVal', "10");
      setTimeout(function(){
        that.callback();
        // that.time();
      },1500)
  }
  // distanceText,distanceVal,durationText,durationVal
  callback(){
    let  that = this;
    console.log("call");
    // console.log(that.distanceText);
    // console.log(this.distanceVal);
    // console.log(this.durationText);
    // console.log(that.durationVal);
    this.events.publish('distanceText', this.distanceText); 
    this.events.publish('distanceVal', this.distanceVal);
    this.events.publish('durationText', this.durationText);
    this.events.publish('durationVal', this.durationVal);
  }
  

  reset() {
    console.log("de");
    this.directionsDisplay.set(null);
    this.directionsDisplay.setMap(null);
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(this.map);
    this.events.publish('distanceText', "0"); 
    this.events.publish('distanceVal', "0");
    this.events.publish('durationText', "0");
    this.events.publish('durationVal', "0");
    clearInterval(this.Interval);
    window.localStorage.setItem("start","");
    window.localStorage.setItem("final","");
    this.start=""
    this.final=""
}
  
 
}
