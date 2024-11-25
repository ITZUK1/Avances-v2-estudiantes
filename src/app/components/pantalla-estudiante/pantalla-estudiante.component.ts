import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';

interface Subject {
  nombre: string;
  status: string;
  startDate: string;
}

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
  isOnline: boolean = false;
  avatarURL: string | ArrayBuffer | null = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiy7RvfhkOomVFRffPKb1pG60VDg24jOwVQQ&s';
  subjects: Subject[] = [];
  showPopup: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.loadStudentData();
  }

  loadStudentData() {
    // Suscríbete al BehaviorSubject para obtener el usuario actual
    this.userService.currentUser$.subscribe((user) => {
      if (user?.userType === 'estudiante') {
        const documento_identidad = user.id; // Obtén el documento del estudiante
        this.http.get(`http://localhost:4000/api/estudiantes/documento_identidad/${documento_identidad}`)
          .subscribe((data: any) => {
            if (data.length > 0) {
              const student = data[0];
              this.studentName = student.nombre;
              this.studentId = student.documento_identidad;
              this.date = student.fecha_nacimiento;
              this.phone = student.telefono;
              this.isOnline = student.status === 'online';
            }
          }, (error) => {
            console.error("Error al cargar datos del estudiante:", error);
          });
      } else {
        console.error("No se encontró un estudiante en la sesión.");
      }
    });
  }

  onImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.avatarURL = e.target.result;
        }
      };
      reader.readAsDataURL(target.files[0]);
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  checkOnlineStatus() {
  this.isOnline = !this.isOnline;

  const status = this.isOnline ? 'online' : 'offline';
  this.http.put(`http://localhost:4000/api/estudiantes/estado/${this.studentId}`, { status })
    .subscribe(() => {
      console.log('Estado actualizado correctamente en la base de datos.');
    }, (error) => {
      console.error('Error al actualizar el estado:', error);
      // Revertir el cambio en caso de error
      this.isOnline = !this.isOnline;
    });
}


  showSubjectsPopup() {
    this.loadSubjects();
    this.showPopup = true;
  }

  loadSubjects() {
    this.http.get<Subject[]>('http://localhost:4000/api/materia')
      .subscribe((data) => {
        this.subjects = data;
      }, (error) => {
        console.error("Error al cargar las materias:", error);
      });
  }

  closePopup() {
    this.showPopup = false;
  }
}
