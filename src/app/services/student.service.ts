import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Student} from "../models/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get('http://localhost:3000/student');
  }

  createStudent(student: Student) {
    return this.http.post("http://localhost:3000/student", student);
  }

  deleteStudent(id: string) {
    return this.http.delete("http://localhost:3000/student/"+`${id}`);
  }

  updateStudent(student: Student) {
    return this.http.put("http://localhost:3000/student/"+`${student._id}`, student);
  }
}
