import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pantalla-estudiante',
  templateUrl: './pantalla-estudiante.component.html',
  styleUrls: ['./pantalla-estudiante.component.css']
})
export class PantallaEstudianteComponent implements OnInit {
  studentName: string = '';
  studentId: string = '';
  date: string = '';
  phone: string = '';
  isActivo: boolean = false;
  avatarURL: string | null = '';
  subjects: any[] = [];
  inasistencias: any[] = [];
  showPopup: boolean = false;
  showInasistenciasPopup: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.loadStudentData();
  }

  loadStudentData() {
    this.userService.currentUser$.subscribe((user) => {
      if (user?.userType === 'estudiante') {
        const documento_identidad = user.id;
        this.http.get(`http://localhost:4000/api/estudiantes/documento_identidad/${documento_identidad}`)
          .subscribe((data: any) => {
            if (data.length > 0) {
              const student = data[0];
              this.studentName = student.nombre;
              this.studentId = student.documento_identidad;
              this.date = student.fecha_nacimiento;
              this.phone = student.telefono;
              this.isActivo = student.status === 'activo';
              this.avatarURL = student.avatar_url ? `http://localhost:4000${student.avatar_url}` : null;
            }
          }, (error) => {
            console.error("Error al cargar datos del estudiante:", error);
          });
      }
    });
  }

  onImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const formData = new FormData();
      formData.append('avatar', target.files[0]);
  
      const documento_identidad = this.studentId;
      if (!documento_identidad) {
        console.error('El documento_identidad no está definido.');
        return;
      }
  
      this.http.put(`http://localhost:4000/api/estudiantes/imagen/${documento_identidad}`, formData)
        .subscribe(
          (response: any) => {
            this.avatarURL = `http://localhost:4000${response.avatar_url}`;
            console.log('Foto de perfil actualizada correctamente');
          },
          (error) => {
            console.error('Error al actualizar la foto de perfil', error);
          }
        );
    }
  }
  
  

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  checkOnlineStatus() {
    this.isActivo = !this.isActivo;
    const status = this.isActivo ? 'activo' : 'inactivo';

    this.http.put(`http://localhost:4000/api/estudiantes/estado/${this.studentId}`, { status })
      .subscribe(() => {
        console.log('Estado actualizado correctamente.');
      }, (error) => {
        console.error('Error al actualizar el estado:', error);
        this.isActivo = !this.isActivo;
      });
  }

  showSubjectsPopup() {
    this.http.get('http://localhost:4000/api/materia')
      .subscribe((data: any) => {
        this.subjects = data;
        this.showPopup = true;
      }, (error) => {
        console.error("Error al cargar las materias:", error);
      });
  }

  closePopup() {
    this.showPopup = false;
  }

  showInasistencias() {
    const documento_identidad = this.studentId;
    this.http.get(`http://localhost:4000/api/inasistencias?estudiante_id=${documento_identidad}`)
      .subscribe((data: any) => {
        this.inasistencias = data;
        this.showInasistenciasPopup = true;
      }, (error) => {
        console.error("Error al cargar las inasistencias:", error);
      });
  }

  closeInasistenciasPopup() {
    this.showInasistenciasPopup = false;
  }
}
