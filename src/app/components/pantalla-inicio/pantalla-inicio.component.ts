import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'; // Importa el servicio
 
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
 
 
 
  // Obtener información del profesor
  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  onSubmitTeacher(): void {
    this.teacherErrorMessage = this.validateId(this.teacherId, 'profesor');
    if (!this.teacherErrorMessage) {
        // Verifica que el ID exista como profesor
        this.http.get(`http://localhost:4000/api/profesor/documento_identidad/${this.teacherId}`).subscribe(
            (data: any) => {
                if (data) {
                    this.teacher = data;
                    this.userService.setUser({ id: this.teacherId, userType: 'profesor' });
                    this.router.navigate(['/Pantalla-profesor']);
                } else {
                    this.teacherErrorMessage = 'El ID de profesor no existe en la base de datos.';
                }
            },
            (error) => {
                this.teacherErrorMessage = 'Error al obtener información del profesor o el ID no existe.';
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
                if (data && data.length > 0) { // Verifica si hay datos en la respuesta
                    this.student = data[0];
                    this.userService.setUser({ id: this.studentId, userType: 'estudiante' });
                    this.router.navigate(['/Pantalla-estudiante']);
                } else {
                    this.studentErrorMessage = 'El ID de estudiante no existe en la base de datos.';
                }
            },
            (error) => {
                this.studentErrorMessage = 'Error al obtener información del estudiante o el ID no existe.';
                console.error(error);
            }
        );
    }
}


 
  // Función que verifica si el documento de identidad ya está en uso por un profesor/estudiante
  checkIdExists(id: string, type: 'profesor' | 'estudiante'): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const endpoint = type === 'profesor'
            ? `http://localhost:4000/api/estudiantes/documento_identidad/${id}`
            : `http://localhost:4000/api/profesores/documento_identidad/${id}`;

        this.http.get(endpoint).subscribe(
            (data: any) => {
                // Verifica si data contiene información para determinar si el ID existe
                resolve(data && data.length > 0);
            },
            (error) => {
                console.error('Error al verificar el ID:', error);
                resolve(false); // En caso de error, asume que el ID no está en uso
            }
        );
    });
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

