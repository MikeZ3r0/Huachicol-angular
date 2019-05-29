import { Component, OnInit } from '@angular/core';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import FullScreen from 'ol/control/FullScreen';
import Geolocation from 'ol/Geolocation';
import Overlay from 'ol/Overlay';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  map: Map;
  view: View;
  layer: TileLayer;
  source: OSM;
  control: FullScreen;
  geolocation : Geolocation;
  overlay : Overlay;
  lng;
  lat;
  coordinate;

  ngOnInit() {
    this.initMap();
  }

  initMap() {

    this.view = new View({
      center : [-99.1468518,19.5046539],
      projection : 'EPSG:4326',
      zoom : 13
    });
    this.source = new OSM();
    this.layer = new TileLayer({
      source: this.source
    });


    this.map = new Map({
     target: 'mapa',
     layers: [this.layer],
     loadTilesWhileAnimating: true,
     view: this.view
   });

    this.geolocation = new Geolocation({
        tracking: true,
        projection: 'EPSG:4326'
    });
    this.geolocation.once('change', function(evt) {
      console.log(evt);
      this.lng = evt.target.position_[1];
      this.lat = evt.target.position_[0];
      console.log("lat "+evt.target.lat+" lng "+evt.target.lng);
      this.coordinate = evt.target.position_;
      console.log("center "+this.coordinate);
      this.overlay = new Overlay({
        element: document.getElementById('marker'),
        positioning: 'bottom-left',
        stopEvent: true,
        position: this.coordinate
      });
      console.log("ups "+this.coordinate);
      this.view.setCenter();
      this.map.setView(this.view);
    });
  }




    // No es necesaria la linea si se trabaja con EPSG: 4326 como proyeccion
    // var centro = ol.proj.fromLonLat([-100,21]);
    /*this.view = new OlView({center: [-100, 21], zoom: 3, minZoom: 4, projection: 'EPSG:4326'});
    this.overviewView = new OlView({projection: 'EPSG:4326'});
    this.source = new OSM();
    this.layer = new OlTileLayer({
      preload: 4,
      source: this.source,
    });
    this.map = new Map({
      target: 'mapa',
      layers: [this.layer],
      loadTilesWhileAnimating: true,
      view: this.view
    });
    this.map.addControl(new FullScreen());
    this.map.addControl(new OverviewMap({view: this.overviewView}));
    this.map.addControl(new ScaleLine());
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.coordenadas = transform(this.lng, this.lat);
        this.map.setCenter(this.coordenadas,14);
        this.markers = new OpenLayers.Layer.Markers("Marcas");
        this.markers.addMarker(new OpenLayers.Marker(this.coordenadas));
        this.map.addLayer(this.markers);
        console.log(this.lat);
      });
    }*/

 /* flyTo(location, done) {
    const duration = 2000;
    const view = map.getView();
    let zoom = view.getZoom();
    const mzoom = view.getMinZoom();
    let zoom2 = mzoom;
    if (zoom < 8) {
      zoom2 = zoom - 1;
      zoom = 7;
    }
    if (zoom > 10) {
      zoom2 = zoom - 2;
    }
    if (zoom > 14) {
      zoom2 = zoom - 4;
    }
    let parts = 2;
    let called = false;
    function callback(complete) {
      -- parts;
      if (called) {
        return;
      }
      if (parts === 0 || !complete) {
        called = true;
        done(complete);
      }
    }
    view.animate({
      center: location,
      duration: duration
    }, callback);
    view.animate({
      zoom: zoom2,
      duration: duration / 2
    }, {
      zoom: zoom,
      duration: duration / 2
    }, callback);
  }*/
}
