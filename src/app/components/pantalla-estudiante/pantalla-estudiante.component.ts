import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStudentData();
  }

  loadStudentData() {
    const documento_identidad = '1721707396'; // Reemplazar con el ID de la sesión del estudiante
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
