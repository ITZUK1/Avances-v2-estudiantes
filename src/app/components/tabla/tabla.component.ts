import { Component } from '@angular/core';


interface Materia {
  nombre: string;
  profesor: string;
  horario: string;
  semestre: number;
}

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent {
 materias: Materia[] = [
    { nombre: 'Matemáticas I', profesor: 'Dr. Juan Pérez', horario: 'Lunes 8:00 - 10:00', semestre: 1 },
    { nombre: 'Programación I', profesor: 'Ing. María López', horario: 'Martes 10:00 - 12:00', semestre: 1 },
    { nombre: 'Física I', profesor: 'Dr. Carlos Gómez', horario: 'Miércoles 14:00 - 16:00', semestre: 1 },
    { nombre: 'Química I', profesor: 'Ing. Paula Ruiz', horario: 'Jueves 8:00 - 10:00', semestre: 1 },
    { nombre: 'Historia', profesor: 'Lic. Ana Torres', horario: 'Viernes 9:00 - 11:00', semestre: 1 },
    { nombre: 'Matemáticas II', profesor: 'Dr. Juan Pérez', horario: 'Lunes 10:00 - 12:00', semestre: 2 },
    { nombre: 'Programación II', profesor: 'Ing. María López', horario: 'Martes 12:00 - 14:00', semestre: 2 },
    { nombre: 'Física II', profesor: 'Dr. Carlos Gómez', horario: 'Miércoles 16:00 - 18:00', semestre: 2 },
    { nombre: 'Química II', profesor: 'Ing. Paula Ruiz', horario: 'Jueves 10:00 - 12:00', semestre: 2 },
    { nombre: 'Literatura', profesor: 'Dr. Felipe Ruiz', horario: 'Viernes 11:00 - 13:00', semestre: 2 },
    { nombre: 'Cálculo I', profesor: 'Dr. Andrés Díaz', horario: 'Lunes 8:00 - 10:00', semestre: 3 },
    { nombre: 'Desarrollo Web', profesor: 'Ing. Marta Silva', horario: 'Martes 10:00 - 12:00', semestre: 3 },
    { nombre: 'Estructura de Datos', profesor: 'Ing. Juan Romero', horario: 'Miércoles 14:00 - 16:00', semestre: 3 },
    { nombre: 'Álgebra Lineal', profesor: 'Dr. Sara Fernández', horario: 'Jueves 8:00 - 10:00', semestre: 3 },
    { nombre: 'Sociología', profesor: 'Lic. Alberto Ruiz', horario: 'Viernes 9:00 - 11:00', semestre: 3 },
   
  ];
}
