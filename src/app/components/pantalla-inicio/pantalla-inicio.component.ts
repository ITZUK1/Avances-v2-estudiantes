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
  studentErrorMessage: string | null = null;
  student: any = null; // Para almacenar la información del estudiante
  studentId: string = '';
  showModal: boolean = false;
  newStudent: any = {}; //Objeto para almacenar la información del nuevo estudiante
  newTeacher: any = {}; //Objeto para almacenar la información del nuevo profesor

  constructor(private http: HttpClient) {}

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

  onSubmitStudent(): void {
    this.studentErrorMessage = this.validateId(this.studentId, 'estudiante');
    if (!this.studentErrorMessage) {
      this.http.get(`http://localhost:4000/api/estudiantes/documento_identidad/${this.studentId}`).subscribe(
        (data: any) => {
          this.student = data[0]; // asume que devuelve un array con un elemento
          console.log('Información del estudiante:', this.student);
        },
        (error) => {
          this.studentErrorMessage = 'Error al obtener información del estudiante';
          console.error(error);
        }
      );
    }
  }

  //  Métodos para registrar nuevos estudiantes y profesores (POST)
  onSubmitNewStudent(){
    this.http.post('http://localhost:4000/api/estudiantes',this.newStudent).subscribe(
      (response) => {
        console.log('Estudiante registrado:', response);
        this.closeModal();
        this.newStudent = {}; //Limpia el formulario
      }, (error) => {
        console.error('Error al registrar estudiante:', error);
      }
    )
  }
  onSubmitNewTeacher(){
    this.http.post('http://localhost:4000/api/profesor',this.newTeacher).subscribe(
      (response) => {
        console.log('Profesor registrado:', response);
        this.closeModal();
        this.newTeacher = {}; //Limpia el formulario
      }, (error) => {
        console.error('Error al registrar profesor:', error);
      }
    )
  }

  validateId(id: string, type: 'profesor' | 'estudiante'): string | null {
    if (!id) {
      return `Por favor, ingresa un ID de ${type} válido.`;
    }
    return null;
  }

  openModal() { this.showModal = true; }
  closeModal() { this.showModal = false; }
}