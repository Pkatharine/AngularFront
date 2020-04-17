import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '@app/models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  getTeachers() {
    return this.http.get('http://localhost:3000/teacher');
  }

  createTeacher(teacher: Teacher) {
    return this.http.post("http://localhost:3000/teacher", teacher);
  }

  deleteTeacher(id: string) {
    return this.http.delete("http://localhost:3000/teacher/"+`${id}`);
  }

  updateTeacher(teacher: Teacher) {
    return this.http.put("http://localhost:3000/teacher/"+`${teacher._id}`, teacher);
  }
}
