import { Component } from '@angular/core';

@Component({
  selector: 'pantalla-profesor',
  templateUrl: './pantalla-profesor.component.html',
  styleUrls: ['./pantalla-profesor.component.css']
})
export class pantallProfesorComponent {
  nuevaMateria: string = '';
  estadoNuevaMateria: string = '';
  errorMateria: string = '';
  estudianteAgendado: string = '';
  horario: string = '';
  semestre: string = 'Año';

  agregarMateria() {
    this.errorMateria = '';
    if (this.nuevaMateria.trim() === "") {
      this.errorMateria = "Por favor, ingrese el nombre de la materia.";
      return;
    }

    // Simulate adding the subject (replace with actual server call)
    this.estadoNuevaMateria = "Agregada";
    this.nuevaMateria = "";

    

  }

  eliminarMateria() {
    //Implement actual delete functionality (server interaction)
    alert("Funcionalidad de eliminar materia aún no implementada.");
  }
}