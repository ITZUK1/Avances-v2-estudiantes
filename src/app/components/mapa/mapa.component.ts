import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  ngOnInit(): void {
    
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYW5nZWwwNzc3IiwiYSI6ImNtM2g5dXA1YTBjdmwya3B3NG9oYXdtYWUifQ.UUpjfWJ-b7KHFKck3IT1ZQ';

    const map = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: [-74.15, 4.55], 
      zoom: 13
    });

 
    const colegios = [
      { nombre: 'Colegio Fernando González Ochoa', lat: 4.502431958274059, lng: -74.10753276161769},
      { nombre: 'Colegio Ofelia Uribe de Acosta', lat: 4.506121939230982, lng: -74.10302709230166 },
      { nombre: 'Colegio El Chuniza', lat: 4.505968269697639, lng: -74.1111842171134 },
    ]; 


    colegios.forEach(colegio => {
      new mapboxgl.Marker()
        .setLngLat([colegio.lng, colegio.lat]) 
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${colegio.nombre}</h3>`)) 
        .addTo(map);
    });
  }
}
