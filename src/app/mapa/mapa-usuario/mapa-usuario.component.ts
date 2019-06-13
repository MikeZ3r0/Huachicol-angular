import { Component, OnInit , Input} from '@angular/core';

import Map from 'ol/Map';
import OlTileLayer from 'ol/layer/Tile';
import Vector from 'ol/layer/Vector';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import OlView from 'ol/View';
import OSM from 'ol/source/OSM';
import FullScreen from 'ol/control/Fullscreen';
import OverviewMap from 'ol/control/OverviewMap';
import ScaleLine from 'ol/control/ScaleLine';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Icon from 'ol/style/Icon';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import Fill from 'ol/style/Fill';
import CircleStyle from 'ol/style/Circle';
import Point from 'ol/geom/Point';
import {environment} from '../../../environments/environment';
import Overlay from 'ol/Overlay';

@Component({
  selector: 'app-mapa-usuario',
  templateUrl: './mapa-usuario.component.html',
  styleUrls: ['./mapa-usuario.component.css']
})
export class MapaUsuarioComponent implements OnInit {
  map: Map;
  source: OSM;
  layer: OlTileLayer;
  view: OlView;
  overviewView: OlView;
  private geolocation: Geolocation;
  geolocationerror: boolean;
  geolocationmsg;
  accuracyFeature: Feature;
  positionFeature: Feature;
  geolocsource: VectorSource;
  geoloclayer: VectorLayer;
  geolocLiveCoords;
  public overlay: Overlay;
  lat;
  position;
  @Input() isChecked: boolean;


  constructor() {
    this.isChecked = false;

  }

  ngOnInit() {
    this.initMap();
    this.getPosicion();
  }

  initMap(){

    this.view = new OlView({center: [-100,21], zoom: 4,minZoom:4, maxZoom:19 ,projection: 'EPSG:4326'});
    this.overviewView = new OlView({projection: 'EPSG:4326'});
    this.source = new OSM();
    this.layer = new OlTileLayer({
      preload: 4,
      source: this.source,
    });
    //this.getPosicion();
    this.map = new Map({
      target: 'mapa',
      layers: [this.layer],
      loadTilesWhileAnimating: true,
      view: this.view
    });
    this.map.addControl(new FullScreen());
    this.map.addControl(new OverviewMap({view: this.overviewView}));
    this.map.addControl(new ScaleLine());

  //  this.map.getView().setCenter(this.position);
      /*var coordenadas = [event.target.position_[1], event.target.position_[0]];
      this.map.getView().setCenter(coordenadas);*/

    //this.map.centerOn(this.geolocation.get,[2,2],[3,4]);
    const user = localStorage.getItem('user');
    if (user.match(environment.userRole) !== null) {
      this.setMarker();
    }else{

    }
  }

 getPosicion(){
   this.geolocation = new Geolocation({
     projection:'EPSG:4326',
     tracking: true,
     trackingOptions: {
       enableHighAccuracy: true,
       maximumAge: 2000
     }
   });

   this.geolocation.on('error', (error) => {
     this.geolocationerror = true;
     this.geolocationmsg = error;
   });

   this.accuracyFeature = new Feature();
   this.geolocation.on('change:accuracyGeometry', () => {
     this.accuracyFeature.setGeometry(this.geolocation.getAccuracyGeometry());
   });

   this.positionFeature = new Feature();
   this.positionFeature.setStyle(new Style({
     image: new CircleStyle({
       radius: 6,
       fill: new Fill({
         color: '#3399CC'
       }),
       stroke: new Stroke({
         color: '#fff',
         width: 2
       })
     })
   }));

   this.geolocation.once('change:position', () => {
     const coordinates = this.geolocation.getPosition();
     this.positionFeature.setGeometry(coordinates ?
       new Point(coordinates) : null);
   });

   this.geolocsource = new VectorSource({});
   this.geoloclayer = new VectorLayer({
     source: this.geolocsource,
   });

 }

 toggleGeolocation(checked) {
   // erase any previous errors
   this.geolocationmsg = '';
   this.geolocationerror = false;
   //// toggled on
   if (checked) {
     document.getElementById('marker').style.display = "inherit";
     this.geolocation.setTracking(checked); // set on
     this.geolocsource.addFeatures([this.accuracyFeature, this.positionFeature]) ;
     const centerGeo = this.geolocation.getPosition();
     // zoom there
     if (centerGeo) {
       this.map.addLayer(this.geoloclayer);
       this.map.getView().animate({
         center: centerGeo,
         duration: 2000,
         zoom: 16
       });
     }
     // show the geolocation coords in html all the time
     //this.geolocLiveCoords = this.geolocation.getPosition();
     this.geolocLiveCoords = '';
   } else { // geolocation off
     this.geolocation.setTracking(checked);
     this.geolocsource.clear();
     this.geolocLiveCoords = '';
     this.map.removeLayer(this.geoloclayer);
   }

 }


 setMarker(){
   this.map.on('singleclick', function(evt) {
     console.log(evt);
     console.log(evt.coordinate);
     const coordinate = evt.coordinate;
     console.log("ups "+ coordinate);
     //this.view = new OlView({center: coordinate, zoom: 19,minZoom:4,projection: 'EPSG:4326'});
    var marker = new Overlay({
       position: coordinate,
       positioning: 'center-center',
       element: document.getElementById('marker'),
       stopEvent: false
     });
     this.addOverlay(marker);
     document.getElementById("lat").value=evt.coordinate[1];
     document.getElementById("lng").value=evt.coordinate[0];
     //this.setView(this.view);
     //this.getView().setCenter([evt.coordinate[0],evt.coordinate[1]]);
   });
 }



}
