import { Component } from '@angular/core';

interface Materia {
  nombre: string;
  profesor: string;
  horario: string;
  semestre: number;
}

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent {

  materias: Materia[] = [
    { nombre: 'Matemáticas I', profesor: 'Dr. Juan Pérez', horario: 'Lunes 8:00 - 10:00', semestre: 1 },
    { nombre: 'Programación I', profesor: 'Ing. María López', horario: 'Martes 10:00 - 12:00', semestre: 1 },
    { nombre: 'Física I', profesor: 'Dr. Carlos Gómez', horario: 'Miércoles 14:00 - 16:00', semestre: 1 },
    { nombre: 'Química I', profesor: 'Ing. Paula Ruiz', horario: 'Jueves 8:00 - 10:00', semestre: 1 },
    { nombre: 'Historia', profesor: 'Lic. Ana Torres', horario: 'Viernes 9:00 - 11:00', semestre: 1 },
    { nombre: 'Literatura', profesor: 'Dra. Sofia Rodriguez', horario: 'Lunes 16:00 - 18:00', semestre: 2 },
    { nombre: 'Biología', profesor: 'Dr. David Hernandez', horario: 'Martes 14:00 - 16:00', semestre: 2 },
    { nombre: 'Estadística', profesor: 'Dra. Isabel Martinez', horario: 'Miércoles 10:00 - 12:00', semestre: 2 }
  ];

  materiaSeleccionada: Materia | null = null;
  estadoClase: string = '';

  iniciarClase(materia: Materia) {
    this.materiaSeleccionada = materia;
    this.estadoClase = 'Clase Iniciada';
  }

  terminarClase() {
    this.materiaSeleccionada = null;
    this.estadoClase = '';
  }
}