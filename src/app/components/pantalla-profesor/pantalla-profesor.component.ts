import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient

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
          this.estadoNuevaMateria = "Materia agregada con éxito con ID: " + response.id;
          this.nuevaMateria = { nombre: '', descripcion: '', semestre: '', fecha_inicio: '', status: 'activo', profesor_id: null, curso_id: null };
        },
        error => {
          this.errorMateria = "Error al agregar la materia: " + error.error.error;
        }
      );
  }
}