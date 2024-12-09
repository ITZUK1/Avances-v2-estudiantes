import { Component } from '@angular/core';

@Component({
  selector: 'app-mejores-profesores',
  templateUrl: './mejores-profesores.component.html',
  styleUrls: ['./mejores-profesores.component.css']
})
export class MejoresProfesoresComponent {
  profesores = [
    
    {
      nombre: 'Profesora Jose López',
      descripcion: 'Especialista en ciencias sociales y comunicación.',
      imagen: 'assets/img/cucho1.jpeg'
    },
    {
      nombre: 'Profesor Luis Gómez',
      descripcion: 'Docente apasionado por la tecnología y la informática.',
      imagen: 'assets/img/cucho3.jpg'
    },
    {
      nombre: 'Profesora Luisa',
      descripcion: 'Docente apasionada por la tecnología y la informática.',
      imagen: 'assets/img/cucho4.jpg'
    },
    {
      nombre: 'Profesor Luis Gómez',
      descripcion: 'Docente apasionado por la tecnología y la informática.',
      imagen: 'assets/img/cucho5.webp'
    },
    {
      nombre: 'Profesor Luis Gómez',
      descripcion: 'Docente apasionado por la tecnología y la informática.',
      imagen: 'assets/img/cucho6.jpg'
    },
  ];

  onImageError(event: any){}
}
