import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { BusPage } from '../buss/home';
import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database';
import { Events } from 'ionic-angular';
declare var google;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  checkbox
  imghol: any;
  pos: any;
  map:any;
  flightPath:any="";
  MyLocation1:any;
  marker:any;
  image1:any;
  image2:any;
  myLatLng:any;
  arrData = []
  arrLat = []
  arrLon = []
  lat:any;
  a:FirebaseListObservable<any[]>;
  info:any;
  start:any;
  end:any;
  s:any;
  e:any;
  final
  arrDepartments=[]
  Department
  markerDepartments=[]
Path:any;
  constructor(private events:Events, private fdb :AngularFireDatabase, public navCtrl: NavController,public popoverCtrl: PopoverController) {
    this.fdb.list('marker/Department').subscribe(_data => {
      this.arrDepartments = _data;
      console.log(this.arrDepartments);
     this.markerDepartment();
  });
    console.log("BUS");
    this.fdb.list('Posts/').subscribe(_data => {
      this.arrData = _data;
      console.log(this.arrData); });  
      
       let that = this;
      this.a = fdb.list('Posts/', { 
          query: {
          orderByChild: 'lat',
          equalTo: this.lat     
        }
      });
      setTimeout(function() {
        that.initialize();
    }, 2000);
    this.start = window.localStorage.setItem("start","");
    this.end = window.localStorage.setItem("end","");
    window.localStorage.setItem("flightPath","");

  }

  ionViewDidLoad() {
    this.current();
    this.markerDepartment();
  //  this.initialize();
  }

  current(){
   
    console.log("asdasdas");
    var myOptions = {
              zoom: 15,
              center: {lat: 19.028470  , lng: 99.896315},
              zoomControl:false,
              streetViewControl:false,
              fullscreenControl: false
              // center: new google.maps.LatLng(0.0, 0.0),
              // mapTypeId: google.maps.MapTypeId.ROADMAP
          }
         this.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
         console.log(this.map);
    // let that = this;
    // var map = new google.maps.Map(document.getElementById('map'), {
    //        zoom: 15,
    //        center: {lat: 19.028470  , lng: 99.896315}
    //      });
    //      console.log(map);
         
   //  console.log(that.map);
   
  }

  presentPopover(myEvent) {
    this.start = window.localStorage.getItem("start");
    this.end = window.localStorage.getItem("end");
    console.log(this.start);
    console.log(this.end);
    this.events.subscribe('flightPath', (user) => {
      this.flightPath = user;
    });
    let popover = this.popoverCtrl.create(BusPage,{flightPath:this.flightPath,start:this.start,end:this.end,audit:this.map});
    popover.present({
      ev: myEvent
    });
  }

  initialize() {
    console.log("me'ko");
    console.log(this.map);
    
    this.image1= "assets/icon/user.png";
    this.image2="assets/icon/bus3.png";
    let  that = this;
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            
            that.MyLocation1 = pos;
            
        });
      }  
      setInterval(function(){
        if(that.marker){
          that.marker.setMap(null) }
        var c = new google.maps.MarkerImage(
          that.image1,
          new google.maps.Size(25, 25),
          new google.maps.Point(0, 0),
          new google.maps.Point(17, 34),
          new google.maps.Size(25, 25));
          that.marker = new google.maps.Marker({
          position : new google.maps.LatLng(that.MyLocation1),
          map: that.map,
          title: 'My',
          icon: c
          });
      },1000)

       // this.map = new google.maps.Map(document.getElementById('map'), {
        //   zoom: 15,
        //   center: {lat: 19.02974, lng: 99.91095},
        //   mapTypeId: 'roadmap'
          
        // });
       
        
       let lat = this.arrData;
        var i;
        var d = new google.maps.MarkerImage(
          that.image2,
          new google.maps.Size(71, 71),
          new google.maps.Point(0, 0),
          new google.maps.Point(17, 34),
          new google.maps.Size(50, 50));

        for(i = 0; i < this.arrData.length  ; i++){
        var lat1 = lat[i];
        let marker = new google.maps.Marker({
        position : new google.maps.LatLng(lat1.lat,lat1.lng),
        map: this.map,
        icon:d,
        title:(lat1.name)
        });
        let infowindow = new google.maps.InfoWindow({
          content: (lat1.name)
        });
        // google.maps.event.addListener(marker, function (evt) {
        //   console.log(evt.marker.title);
        //   if(this.start===null){
        //           this.start = evt.marker.title;
        //           console.log(evt.marker.title);
        //         }
        //   infowindow.open(this.map, marker);
        // });
        marker.addListener('click', function() {
          // console.log(marker.title);
          // console.log(this.start);
          this.start = window.localStorage.getItem("start");
          this.end = window.localStorage.getItem("end");
          console.log(this.start);
          console.log(this.end);
            if(this.start===""){
              window.localStorage.setItem("start",marker.title);
              
            }else if(this.end===""){
              window.localStorage.setItem("end",marker.title);
            }
            else{
              // alert("")
            }
          infowindow.open(this.map, marker);
        });
        
      }
}

markerDepartment(){

  console.log("สร้างหมุด");
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
 let infowindow = new google.maps.InfoWindow({
  content: lat1.name
 });
 marker.addListener('click', function() {
  infowindow.open(this.map, marker);
 });
 }
}

 even(){
  this.checkbox = !this.checkbox;
  if (this.checkbox){
    this.Path = [
      {lat:19.030638720558205, lng:99.92296099662781},
      {lat:19.030263449688317, lng:99.91906642913818},
      {lat:19.029441907797455, lng:99.91793990135193},
      {lat:19.029350625114347, lng:99.91763949394226},
      {lat:19.030354731869842, lng:99.91373419761658},
      {lat:19.03107484509859, lng:99.91165280342102},
      {lat:19.031054560261634, lng:99.91140604019165},
      {lat:19.030882139047527, lng:99.91126656532288},
      {lat:19.030263449688317, lng:99.91125583648682},
      {lat:19.029949032901374, lng:99.91117000579834},
      {lat:19.02971575554586, lng:99.91095542907715},
      {lat:19.029644758024794, lng:99.9106764793396},
      {lat:19.02968532804054, lng:99.91037607192993},
      {lat:19.029817180523285, lng:99.90936756134033},
      {lat:19.029746183045578, lng:99.90913152694702},
      {lat:19.029381052680947, lng:99.9086594581604},
      {lat:19.028965208788204, lng:99.90803718566895},
      {lat:19.028549363854513, lng:99.90731835365295},
      {lat:19.028650789544066, lng:99.90670680999756},
      {lat:19.028650789544066, lng:99.90671753883362},
      {lat:19.028752215171714, lng:99.90634202957153},
      {lat:19.028985493880292, lng:99.90611672401428},
      {lat:19.029634615519317, lng:99.90589141845703},
      {lat:19.030293877087736, lng:99.90549445152283},
      {lat:19.030567723431627, lng:99.90524768829346},
      {lat:19.03101399058029, lng:99.90437865257263},
      {lat:19.031247266112665, lng:99.90408897399902},
      {lat:19.031267550926085, lng:99.9037617444992},
      {lat:19.031100201141292, lng:99.90354716777802},
      {lat:19.030780714720322, lng:99.90335941314697},
      {lat:19.03070211082415, lng:99.9033835530281},
      {lat:19.030610828833538, lng:99.90337282419205},
      {lat:19.030552509757698, lng:99.90331381559372},
      {lat:19.030519546792746, lng:99.90323066711426},
      {lat:19.030527153631397, lng:99.90313678979874},
      {lat:19.030593079551757, lng:99.90306705236435},
      {lat:19.030641256169307, lng:99.90301609039307},
      {lat:19.030648863002387, lng:99.9028068780899},
      {lat:19.03066407666749, lng:99.90219533443451},
      {lat:19.030659005445948, lng:99.90141212940216},
      {lat:19.030648863002387, lng:99.90111172199249},
      {lat:19.030648863002387, lng:99.9010956287384},
      {lat:19.03066407666749, lng:99.89916980266571},
      {lat:19.03061336444506, lng:99.89889621734619},
      {lat:19.030410515400508, lng:99.8983383178711},
      {lat:19.030298948320425, lng:99.89825785160065},
      {lat:19.030240629135097, lng:99.89813446998596},
      {lat:19.030227951048627, lng:99.89798158407211},
      {lat:19.030055528976497, lng:99.89768654108047},
      {lat:19.030081202127253, lng:99.89773146808147},
      {lat:19.030045386496106, lng:99.89766508340836},
      {lat:19.029081848033883, lng:99.89599406719208},
      {lat:19.029082164988242, lng:99.89599373191595},
      {lat:19.02900704678792, lng:99.89586867392063},
      {lat:19.028833355629235, lng:99.89555150270462},
      {lat:19.02879532104471, lng:99.89540666341782},
      {lat:19.028648253902595, lng:99.89535838365555},
      {lat:19.028506257917687, lng:99.8952966928482},
      {lat:19.02820958734329, lng:99.8953852057457},
      {lat:19.02773034914246, lng:99.89564001560211},
      {lat:19.0277306660994, lng:99.89564001560211},
      {lat:19.027580745399806, lng:99.89568293094635},
      {lat:19.02732717942663, lng:99.89567220211029},
      {lat:19.026551265144803, lng:99.89555954933167},
      {lat:19.025815918200074, lng:99.8954576253891},
      {lat:19.02571449077989, lng:99.89539861679077},
      {lat:19.0256789911682, lng:99.8953127861023},
      {lat:19.025638420174126, lng:99.89501774311066}

    ];
    this.flightPath = new google.maps.Polyline({
      path: this.Path,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 5
    });
    this.flightPath.setMap(this.map);

  }
  else {
   if(this.flightPath){
     this.flightPath.setMap(null)}
  }
}

odd(){
  this.checkbox = !this.checkbox;
  if (this.checkbox){
    this.Path = [
      {lat:19.030638720558205, lng:99.92296099662781},
      {lat:19.030263449688317, lng:99.91906642913818},
      {lat:19.029441907797455, lng:99.91793990135193},
      {lat:19.029350625114347, lng:99.91763949394226},
      {lat:19.030354731869842, lng:99.91373419761658},
      {lat:19.03107484509859, lng:99.91165280342102},
      {lat:19.031054560261634, lng:99.91140604019165},
      {lat:19.030882139047527, lng:99.91126656532288},
      {lat:19.030263449688317, lng:99.91125583648682},
      {lat:19.029949032901374, lng:99.91117000579834},
      {lat:19.02971575554586, lng:99.91095542907715},
      {lat:19.029644758024794, lng:99.9106764793396},
      {lat:19.02968532804054, lng:99.91037607192993},
      {lat:19.029817180523285, lng:99.90936756134033},
      {lat:19.029746183045578, lng:99.90913152694702},
      {lat:19.029381052680947, lng:99.9086594581604},
      {lat:19.028965208788204, lng:99.90803718566895},
      {lat:19.028549363854513, lng:99.90731835365295},
      {lat:19.028650789544066, lng:99.90670680999756},
      {lat:19.028767429010514, lng:99.9063366651535},
      {lat:19.028909424772188, lng:99.90618109703064},
      {lat:19.029533190430417, lng:99.90594506263733},
      {lat:19.03011638384593, lng:99.9056339263916},
      {lat:19.03050179750122, lng:99.90535497665405},
      {lat:19.030623506890784, lng:99.90517795085907},
      {lat:19.030861854187037, lng:99.90470051765442},
      {lat:19.031054560261634, lng:99.90432500839233},
      {lat:19.031237123705033, lng:99.90413188934326},
      {lat:19.031282764534527, lng:99.90378856658936},
      {lat:19.03113569959459, lng:99.90357398986816},
      {lat:19.03089735269126, lng:99.90343987941742},
      {lat:19.030785785938154, lng:99.90335404872894},
      {lat:19.03069957521398, lng:99.90338623523712},
      {lat:19.030577865880137, lng:99.90335941314697},
      {lat:19.030506868727564, lng:99.90325212478638},
      {lat:19.029360767637165, lng:99.90313410758972},
      {lat:19.02866093210962, lng:99.90308046340942},
      {lat:19.02857472028271, lng:99.9030214548111},
      {lat:19.028493579698857, lng:99.90287661552429},
      {lat:19.028503722274003, lng:99.90207195281982},
      {lat:19.028569648997376, lng:99.90054309368134},
      {lat:19.028569648997376, lng:99.8998349905014},
      {lat:19.02856838117602, lng:99.89982560276985},
      {lat:19.028577255925313, lng:99.89878624677658},
      {lat:19.029419087131377, lng:99.89848047494888},
      {lat:19.03007074269595, lng:99.89826321601868},
      {lat:19.030273592155414, lng:99.89818811416626},
      {lat:19.03024316475228, lng:99.89811301231384},
      {lat:19.030245700369413, lng:99.89801377058029},
      {lat:19.030094831082224, lng:99.89775627851486},
      {lat:19.030055528976497, lng:99.89768654108047},
      {lat:19.030081202127253, lng:99.89773146808147},
      {lat:19.030045386496106, lng:99.89766508340836},
      {lat:19.029081848033883, lng:99.89599406719208},
      {lat:19.029081848033883, lng:99.89599406719208},
      {lat:19.029082164988242, lng:99.89599373191595},
      {lat:19.02900704678792, lng:99.89586867392063},
      {lat:19.028833355629235, lng:99.89555150270462},
      {lat:19.02879532104471, lng:99.89540666341782},
      {lat:19.028648253902595, lng:99.89535838365555},
      {lat:19.028506257917687, lng:99.8952966928482},
      {lat:19.02820958734329, lng:99.8953852057457},
      {lat:19.02773034914246, lng:99.89564001560211},
      {lat:19.0277306660994, lng:99.89564001560211},
      {lat:19.027580745399806, lng:99.89568293094635},
      {lat:19.02732717942663, lng:99.89567220211029},
      {lat:19.026551265144803, lng:99.89555954933167},
      {lat:19.025815918200074, lng:99.8954576253891},
      {lat:19.02571449077989, lng:99.89539861679077},
      {lat:19.0256789911682, lng:99.8953127861023},
      {lat:19.025638420174126, lng:99.89501774311066}
    ];
    this.flightPath = new google.maps.Polyline({
      path: this.Path,
      geodesic: true,
      strokeColor: '#FFA500',
      strokeOpacity: 1.0,
      strokeWeight: 5
    });
    this.flightPath.setMap(this.map);

  }
  else {
   if(this.flightPath){
     this.flightPath.setMap(null)}
  }
}

dorm(){
  this.checkbox = !this.checkbox;
  if (this.checkbox){
    this.Path=[
      {lat:19.034173324853125,lng: 99.88619863986969},
      {lat:19.03400344243635,lng: 99.88657414913177},
      {lat:19.033860183248354,lng: 99.88682895898819},
      {lat:19.033767635211635,lng: 99.88702744245529},
      {lat:19.033626911385756,lng: 99.88732382655144},
      {lat:19.03351154311522, lng:99.88770067691803},
      {lat:19.03344054721661, lng:99.88789647817612},
      {lat:19.033179383471246, lng:99.88842755556107},
      {lat:19.032952449592056, lng:99.88897070288658},
      {lat:19.032918219315224,lng: 99.88909274339676},
      {lat:19.032924558255903, lng:99.88963320851326},
      {lat:19.03299808995022, lng:99.89008784294128},
      {lat:19.033131207589857, lng:99.89090323448181},
      {lat:19.033128672016765, lng:99.89089787006378},
      {lat:19.033128672016765, lng:99.89089787006378},
      {lat:19.033151492173207, lng:99.89126533269882},
      {lat:19.03313374316292,lng: 99.89143699407578},
      {lat:19.03310838743064, lng:99.89157110452652},
      {lat:19.03297907313585, lng:99.89190369844437},
      {lat:19.032880185666, lng:99.89216923713684},
      {lat:19.03274072887771, lng:99.89240258932114},
      {lat:19.032565773832253,lng: 99.89259570837021},
      {lat:19.032332500151636, lng:99.89286124706268},
      {lat:19.032132188794858, lng:99.89310532808304},
      {lat:19.031923002626446, lng:99.89342987537384},
      {lat:19.03192173483067, lng:99.89343255758286},
      {lat:19.031779741643952, lng:99.89367932081223},
      {lat:19.03165930089936,lng: 99.89379063248634},
      {lat:19.03144631073725, lng:99.89384561777115},
      {lat:19.03119655406828, lng:99.89386439323425},
      {lat:19.03107991630744, lng:99.89388450980186},
      {lat:19.030937922401087,lng: 99.89393681287766},
      {lat:19.030636184947063,lng: 99.8941433429718},
      {lat:19.030407979785878, lng:99.89431500434875},
      {lat:19.030129061940922, lng:99.89451885223389},
      {lat:19.029469799718402, lng:99.89494800567627},
      {lat:19.02937851705062, lng:99.89514112472534},
      {lat:19.029363303267772, lng:99.89534229040146},
      {lat:19.02938612394151, lng:99.89543616771698},
      {lat:19.029419087131377,lng: 99.89553272724152},
      {lat:19.029533190430417, lng:99.89573389291763},
      {lat:19.029482477862743, lng:99.89564269781113},
      {lat:19.029769003666736, lng:99.896160364151},
      {lat:19.029976924737174, lng:99.89653587341309},
      {lat:19.03014681127228, lng:99.89685505628586},
      {lat:19.030562652207145, lng:99.89761143922806},
      {lat:19.030572794655974, lng:99.89764630794525},
      {lat:19.03058040149217, lng:99.89770531654358},
      {lat:19.03060068638704,lng: 99.89782333374023},
      {lat:19.0306894327729,lng: 99.89786893129349},
      {lat:19.03076042984745, lng:99.89797085523605},
      {lat:19.030778179111355, lng:99.89810228347778},
      {lat:19.03074014497211,lng: 99.89822566509247},
      {lat:19.03066407666749,lng: 99.89831417798996},
      {lat:19.030560116594845,lng: 99.89834904670715},
      {lat:19.030428264701804,lng: 99.8983383178711},
      {lat:19.03030655516918, lng:99.8982685804367},
      {lat:19.03024316475228,lng: 99.898142516613},
      {lat:19.030233022283326, lng:99.89801108837128},
      {lat:19.030096098891928, lng:99.89777237176895},
      {lat:19.030055528976497, lng:99.89768654108047},
      {lat:19.030081202127253, lng:99.89773146808147},
      {lat:19.030045386496106, lng:99.89766508340836},
      {lat:19.029081848033883, lng:99.89599406719208},
      {lat:19.029082164988242, lng:99.89599373191595},
      {lat:19.02900704678792, lng:99.89586867392063},
      {lat:19.028833355629235, lng:99.89555150270462},
      {lat:19.02879532104471, lng:99.89540666341782},
      {lat:19.028648253902595, lng:99.89535838365555},
      {lat:19.028506257917687, lng:99.8952966928482},
      {lat:19.02820958734329, lng:99.8953852057457},
      {lat:19.02773034914246, lng:99.89564001560211},
      {lat:19.0277306660994, lng:99.89564001560211},
      {lat:19.027580745399806, lng:99.89568293094635},
      {lat:19.02732717942663, lng:99.89567220211029},
      {lat:19.026551265144803, lng:99.89555954933167},
      {lat:19.025815918200074, lng:99.8954576253891},
      {lat:19.02571449077989, lng:99.89539861679077},
      {lat:19.0256789911682, lng:99.8953127861023},
      {lat:19.025638420174126, lng:99.89501774311066}
    ];
  
    this.flightPath = new google.maps.Polyline({
      path: this.Path,
      geodesic: true,
      strokeColor: '#00FF00',
      strokeOpacity: 1.0,
      strokeWeight: 5
    });
    this.flightPath.setMap(this.map);

  }
  else {
   if(this.flightPath){
     this.flightPath.setMap(null)}
  }
}




}
