import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pantalla-profesor',
  templateUrl: './pantalla-profesor.component.html',
  styleUrls: ['./pantalla-profesor.component.css']
})
export class pantallProfesorComponent {
  nuevaMateria = {
    nombre: '',
    descripcion: '',
    semestre: '',
    fecha_inicio: '',
    status: 'activo',
    profesor_id: null,
    curso_id: null
  };
  estadoNuevaMateria: string = '';
  errorMateria: string = '';
  
  // Variables para inasistencia
  mostrarFormularioInasistencia: boolean = false;
  inasistencia = {
    fecha: '',
    estudiante_id: null,
    materia_id: null,
    motivo: ''
  };

  constructor(private http: HttpClient) {}

  agregarMateria() {
    this.errorMateria = '';
    if (this.nuevaMateria.nombre.trim() === '') {
      this.errorMateria = "Por favor, ingrese el nombre de la materia.";
      return;
    }

    this.http.post('/api/materia', this.nuevaMateria)
      .subscribe(
        (response: any) => {
          this.nuevaMateria = { nombre: '', descripcion: '', semestre: '', fecha_inicio: '', status: 'activo', profesor_id: null, curso_id: null };
        },
        error => {
          this.errorMateria = "Error al agregar la materia: " + error.error.error;
        }
      );
  }

  toggleInasistenciaForm() {
    this.mostrarFormularioInasistencia = !this.mostrarFormularioInasistencia;
  }

  agregarInasistencia() {
    this.http.post('/api/inasistencia', this.inasistencia)
      .subscribe(
        (response: any) => {
          alert("Inasistencia agregada con éxito!");
          this.inasistencia = { fecha: '', estudiante_id: null, materia_id: null, motivo: '' };
          this.toggleInasistenciaForm();  // Cierra el formulario después de agregar
        },
        error => {
          alert("Error al agregar la inasistencia: " + error.error.error);
        }
      );
  }
}
