import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pantalla-inicio',
  templateUrl: './pantalla-inicio.component.html',
  styleUrls: ['./pantalla-inicio.component.css']
})
export class PantallaInicioComponent {
  teacherId: string = '';
  teacherErrorMessage: string | null = null;
  teacher: any = null; // Para almacenar la información del profesor

  studentId: string = '';
  studentErrorMessage: string | null = null;
  student: any = null; // Para almacenar la información del estudiante

  newStudent: any = {}; // Objeto para almacenar la información del nuevo estudiante
  newTeacher: any = {}; // Objeto para almacenar la información del nuevo profesor

  showTeacherModal: boolean = false; // Para controlar la visibilidad del modal de profesor
  showStudentModal: boolean = false; // Para controlar la visibilidad del modal de estudiante

  constructor(private http: HttpClient) {}

  // Obtener información del profesor
  onSubmitTeacher(): void {
    this.teacherErrorMessage = this.validateId(this.teacherId, 'profesor');
    if (!this.teacherErrorMessage) {
      this.http.get(`http://localhost:4000/api/profesor/documento_identidad/${this.teacherId}`).subscribe(
        (data: any) => {
          this.teacher = data;
          console.log('Información del profesor:', this.teacher);
        },
        (error) => {
          this.teacherErrorMessage = 'Error al obtener información del profesor';
          console.error(error);
        }
      );
    }
  }

  // Obtener información del estudiante
  onSubmitStudent(): void {
    this.studentErrorMessage = this.validateId(this.studentId, 'estudiante');
    if (!this.studentErrorMessage) {
      this.http.get(`http://localhost:4000/api/estudiantes/documento_identidad/${this.studentId}`).subscribe(
        (data: any) => {
          this.student = data[0]; // Asume que devuelve un array con un elemento
          console.log('Información del estudiante:', this.student);
        },
        (error) => {
          this.studentErrorMessage = 'Error al obtener información del estudiante';
          console.error(error);
        }
      );
    }
  }

  // Registrar nuevo estudiante
  onSubmitNewStudent(): void {
    this.http.post('http://localhost:4000/api/estudiantes', this.newStudent).subscribe(
      (response) => {
        console.log('Estudiante registrado:', response);
        this.closeStudentModal();
        this.newStudent = {}; // Limpia el formulario
      },
      (error) => {
        console.error('Error al registrar estudiante:', error);
      }
    );
  }

  // Registrar nuevo profesor
  onSubmitNewTeacher(): void {
    this.http.post('http://localhost:4000/api/profesor', this.newTeacher).subscribe(
      (response) => {
        console.log('Profesor registrado:', response);
        this.closeTeacherModal();
        this.newTeacher = {}; // Limpia el formulario
      },
      (error) => {
        console.error('Error al registrar profesor:', error);
      }
    );
  }

  // Validación del ID
  validateId(id: string, type: 'profesor' | 'estudiante'): string | null {
    if (!id) {
      return `Por favor, ingresa un ID de ${type} válido.`;
    }
    return null;
  }

  // Abrir y cerrar modales
  openTeacherModal(): void {
    this.showTeacherModal = true;
  }

  closeTeacherModal(): void {
    this.showTeacherModal = false;
  }

  openStudentModal(): void {
    this.showStudentModal = true;
  }

  closeStudentModal(): void {
    this.showStudentModal = false;
  }
}
