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
    estudiante_nombre: '',
    materia_nombre: '',
    motivo: ''
  };

  // Variables para mostrar estudiantes
  estudiantes: any[] = [];  // Para almacenar la lista de estudiantes
  mostrarListaEstudiantes: boolean = false;  // Para controlar la visibilidad del modal

  constructor(private http: HttpClient) {}

  agregarMateria() {
    this.http.post('http://localhost:4000/api/materia', this.nuevaMateria)
      .subscribe(
        (response: any) => {
          console.log('Materia agregada:', response);
          this.estadoNuevaMateria = 'Materia agregada exitosamente';
          this.errorMateria = '';
        },
        (error) => {
          console.error('Error al agregar materia:', error);
          this.errorMateria = 'Error al agregar materia';
          this.estadoNuevaMateria = '';
        }
      );
  }

  toggleInasistenciaForm() {
    this.mostrarFormularioInasistencia = !this.mostrarFormularioInasistencia;
  }

  agregarInasistencia() {
    this.http.post('http://localhost:4000/api/inasistencia', this.inasistencia)
      .subscribe(
        (response: any) => {
          alert("Inasistencia agregada con éxito!");
          this.inasistencia = { fecha: '', estudiante_nombre: '', materia_nombre: '', motivo: '' };
          this.toggleInasistenciaForm();  // Cierra el formulario después de agregar
        },
        (error: any) => {
          console.error("Error al registrar la inasistencia:", error);
          alert("Hubo un problema al registrar la inasistencia. Intenta nuevamente.");
        }
      );
  }
  

  // Método para obtener la lista de estudiantes
  obtenerEstudiantes() {
    this.http.get<any[]>('http://localhost:4000/api/estudiantes')
      .subscribe(
        (response) => {
          this.estudiantes = response;
          this.mostrarListaEstudiantes = true;  // Mostrar la lista cuando se carguen los estudiantes
        },
        (error) => {
          console.error('Error al obtener estudiantes', error);
        }
      );
  }
}
