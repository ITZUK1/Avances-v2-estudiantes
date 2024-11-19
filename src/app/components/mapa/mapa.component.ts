import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  ngOnInit(): void {
    // Configuración de Mapbox
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYW5nZWwwNzc3IiwiYSI6ImNtM2g5dXA1YTBjdmwya3B3NG9oYXdtYWUifQ.UUpjfWJ-b7KHFKck3IT1ZQ';

    const map = new mapboxgl.Map({
      container: 'map', // El ID del contenedor HTML
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [-74.15, 4.55], // Coordenadas iniciales del mapa (en este caso, Usme)
      zoom: 13
    });

    // Agregar marcadores (puntos predeterminados de los colegios)
    new mapboxgl.Marker()
      .setLngLat([-74.1, 4.55]) // Coordenadas de un colegio en Usme
      .addTo(map);

    new mapboxgl.Marker()
      .setLngLat([-74.17, 4.56]) // Coordenadas de otro colegio en Usme
      .addTo(map);
  }
}