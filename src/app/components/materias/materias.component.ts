import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

interface Materia {
  nombre: string;
  profesor: string;
  horario: string;
  semestre: number;
  inProgress: boolean;
}

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
  materias: Materia[] = [];

  materiaSeleccionada: Materia | null = null;
  estadoClase: string = '';
  tiempoRestante: number = 10; // Adjust time as needed
  cronometroActivo: boolean = false;
  subscription: any;

  ngOnInit(): void {
    this.loadMateriasFromLocalStorage();
  }

  loadMateriasFromLocalStorage() {
    const storedMaterias = localStorage.getItem('materias');
    if (storedMaterias) {
      try {
        this.materias = JSON.parse(storedMaterias);
      } catch (error) {
        console.error("Error parsing materias from localStorage:", error);
        this.materias = this.getDefaultMaterias();
      }
    } else {
      this.materias = this.getDefaultMaterias();
    }
  }

  getDefaultMaterias(): Materia[] {
    return [
      { nombre: 'Matemáticas I', profesor: 'Dr. Juan Pérez', horario: 'Lunes 8:00 - 10:00', semestre: 1, inProgress: false },
      { nombre: 'Programación I', profesor: 'Ing. María López', horario: 'Martes 10:00 - 12:00', semestre: 1, inProgress: false },
      { nombre: 'Física I', profesor: 'Dr. Carlos Gómez', horario: 'Miércoles 14:00 - 16:00', semestre: 1, inProgress: false },
      { nombre: 'Química I', profesor: 'Ing. Paula Ruiz', horario: 'Jueves 8:00 - 10:00', semestre: 1, inProgress: false },
      { nombre: 'Historia', profesor: 'Lic. Ana Torres', horario: 'Viernes 9:00 - 11:00', semestre: 1, inProgress: false },
      { nombre: 'Literatura', profesor: 'Dra. Sofia Rodriguez', horario: 'Lunes 16:00 - 18:00', semestre: 2, inProgress: false },
      { nombre: 'Biología', profesor: 'Dr. David Hernandez', horario: 'Martes 14:00 - 16:00', semestre: 2, inProgress: false },
      { nombre: 'Estadística', profesor: 'Dra. Isabel Martinez', horario: 'Miércoles 10:00 - 12:00', semestre: 2, inProgress: false }
    ];
  }

  saveMateriasToLocalStorage() {
    localStorage.setItem('materias', JSON.stringify(this.materias));
  }

  iniciarClase(materia: Materia) {
    if (!this.cronometroActivo && !materia.inProgress) {
      materia.inProgress = true;
      this.materiaSeleccionada = materia;
      this.estadoClase = 'Clase Iniciada';
      this.cronometroActivo = true;

      this.subscription = interval(1000).pipe(
        takeWhile(() => this.cronometroActivo && this.tiempoRestante > 0)
      ).subscribe(() => {
        this.tiempoRestante--;
        if (this.tiempoRestante === 0) {
          this.estadoClase = 'Se terminó la clase';
          this.terminarClase();
        }
      });
      this.saveMateriasToLocalStorage();
    }
  }

  terminarClase() {
    this.materiaSeleccionada = null;
    this.estadoClase = '';
    this.tiempoRestante = 10;
    this.cronometroActivo = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    const materiaIndex = this.materias.findIndex(m => m.nombre === this.materiaSeleccionada?.nombre);
    if (materiaIndex !== -1) {
      this.materias[materiaIndex].inProgress = false;
    }
    this.saveMateriasToLocalStorage();
  }
}