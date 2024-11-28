import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pantalla-inicio',
  templateUrl: './pantalla-inicio.component.html',
  styleUrls: ['./pantalla-inicio.component.css']
})
export class PantallaInicioComponent {
  teacherId: string = '';
  teacherErrorMessage: string | null = null;
  teacher: any = null;

  studentId: string = '';
  studentErrorMessage: string | null = null;
  student: any = null;

  newStudent: any = {}; 
  newTeacher: any = {};

  showTeacherModal: boolean = false;
  showStudentModal: boolean = false;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  // Obtener información del profesor
  onSubmitTeacher(): void {
    this.teacherErrorMessage = this.validateId(this.teacherId, 'profesor');
    if (!this.teacherErrorMessage) {
      this.http.get(`http://localhost:4000/api/profesor/documento_identidad/${this.teacherId}`).subscribe(
        (data: any) => {
          if (data) {
            this.teacher = data;
            this.userService.setUser({ id: this.teacherId, userType: 'profesor' });
            this.router.navigate(['/Pantalla-profesor']);
          } else {
            this.teacherErrorMessage = 'El ID de profesor no existe.';
          }
        },
        () => {
          this.teacherErrorMessage = 'Error de identificación ya esta registrado como estudiante.';
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
          if (data && data.length > 0) {
            this.student = data[0];
            this.userService.setUser({ id: this.studentId, userType: 'estudiante' });
            this.router.navigate(['/Pantalla-estudiante']);
          } else {
            this.studentErrorMessage = 'El ID de estudiante no existe.';
          }
        },
        () => {
          this.studentErrorMessage = 'Error al obtener información del estudiante.';
        }
      );
    }
  }

  // Validación de ID
  validateId(id: string, type: 'profesor' | 'estudiante'): string | null {
    if (!id) {
      return `Por favor, ingresa un ID de ${type} válido.`;
    }
    return null;
  }

  // Registrar nuevo estudiante
  onSubmitNewStudent(): void {
    this.checkIdExists(this.newStudent.documento_identidad, 'estudiante').then((exists) => {
      if (exists) {
        this.studentErrorMessage = 'El documento ya está registrado como estudiante.';
      } else {
        this.checkIdExists(this.newStudent.documento_identidad, 'profesor').then((existsInProfesor) => {
          if (existsInProfesor) {
            this.studentErrorMessage = 'El documento ya está registrado como profesor.';
          } else {
            this.http.post('http://localhost:4000/api/estudiantes', this.newStudent).subscribe(
              () => {
                this.closeStudentModal(); // Cierra el modal
                this.newStudent = {}; // Limpia el formulario
                this.studentErrorMessage = null; // Limpia los errores
              },
              () => {
                this.studentErrorMessage = 'Error al registrar el estudiante.';
              }
            );
          }
        });
      }
    });
  }
  
  onSubmitNewTeacher(): void {
    this.checkIdExists(this.newTeacher.documento_identidad, 'profesor').then((exists) => {
      if (exists) {
        this.teacherErrorMessage = 'El documento ya está registrado como profesor.';
      } else {
        this.checkIdExists(this.newTeacher.documento_identidad, 'estudiante').then((existsInStudent) => {
          if (existsInStudent) {
            this.teacherErrorMessage = 'El documento ya está registrado como estudiante.';
          } else {
            this.http.post('http://localhost:4000/api/profesor', this.newTeacher).subscribe(
              () => {
                this.closeTeacherModal(); // Cierra el modal
                this.newTeacher = {}; // Limpia el formulario
                this.teacherErrorMessage = null; // Limpia los errores
              },
              () => {
                this.teacherErrorMessage = 'Ya existe.';
              }
            );
          }
        });
      }
    });
  }
  

  // Verificar si un ID ya está en uso
  private checkIdExists(id: string, type: 'profesor' | 'estudiante'): Promise<boolean> {
    const endpoint =
      type === 'profesor'
        ? `http://localhost:4000/api/profesor/documento_identidad/${id}`
        : `http://localhost:4000/api/estudiantes/documento_identidad/${id}`;
    return new Promise((resolve) => {
      this.http.get(endpoint).subscribe(
        (data: any) => resolve(data && data.length > 0),
        () => resolve(false)
      );
    });
  }

  // Abrir y cerrar modales
  openTeacherModal(): void {
    this.showTeacherModal = true;
  }

  closeTeacherModal(): void {
    this.showTeacherModal = false;
    this.teacherErrorMessage = null;
  }

  openStudentModal(): void {
    this.showStudentModal = true;
  }

  closeStudentModal(): void {
    this.showStudentModal = false;
    this.studentErrorMessage = null;
  }
}
