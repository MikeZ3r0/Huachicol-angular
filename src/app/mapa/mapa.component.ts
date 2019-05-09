import { Component, OnInit, Input } from '@angular/core';


import Map from 'ol/Map';
import OlTileLayer from 'ol/layer/Tile';
import Vector from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import OlView from 'ol/View';
import OSM from 'ol/source/OSM';
import FullScreen from 'ol/control/Fullscreen';
import OverviewMap from 'ol/control/OverviewMap';
import ScaleLine from 'ol/control/ScaleLine';




@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  map: Map;
  source: OSM;
  layer: OlTileLayer;
  denunciaLayer: Vector;
  denunciasGeojson: {};
  ductosLayer: Vector;
  view: OlView;
  overviewView: OlView;
  @Input() datos;
  constructor() {
    this.denunciasGeojson = {
      type: 'FeatureCollection',
      crs: {
        type: 'name',
        properties: {
          name: 'EPSG:4326'
        }
      },
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [19.4440685, -99.1418708]
        }
      }]
    };
  }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    // No es necesaria la linea si se trabaja con EPSG: 4326 como proyeccion
    // var centro = ol.proj.fromLonLat([-100,21]);
    this.view = new OlView({center: [-100, 21], zoom: 4, minZoom: 4, projection: 'EPSG:4326'});
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
  }

  cargarDenuncias() {
    const sourceDenuncia = new VectorSource({
      features: (new GeoJSON()).readFeatures(this.denunciasGeojson)
    });
    this.denunciaLayer = new Vector({
      source: sourceDenuncia,
    });
    this.map.addLayer(this.denunciaLayer);
  }

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