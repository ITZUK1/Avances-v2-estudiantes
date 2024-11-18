import { Component } from '@angular/core';

@Component({
  selector: 'app-mejores-profesores',
  templateUrl: './mejores-profesores.component.html',
  styleUrls: ['./mejores-profesores.component.css']
})
export class MejoresProfesoresComponent {
  profesores = [
    {
      nombre: 'Profesor Juan Pérez',
      descripcion: 'Experto en matemáticas y física con más de 10 años de experiencia.',
      imagen: 'assets/img/cucho 2.jpeg'
    },
    {
      nombre: 'Profesora María López',
      descripcion: 'Especialista en ciencias sociales y comunicación.',
      imagen: 'assets/img/cucho1.jpeg'
    },
    {
      nombre: 'Profesor Luis Gómez',
      descripcion: 'Docente apasionado por la tecnología y la informática.',
      imagen: 'assets/img/cucho3.jpg'
    }
  ];
}
