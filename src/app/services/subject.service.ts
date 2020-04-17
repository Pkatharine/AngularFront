import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from '@app/models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubjects() {
    return this.http.get('http://localhost:3000/subject');
  }

  createSubject(subject: Subject) {
    return this.http.post("http://localhost:3000/subject", subject);
  }

  deleteSubject(id: string) {
    return this.http.delete("http://localhost:3000/subject/"+`${id}`);
  }

  updateSubject(subject: Subject) {
    return this.http.put("http://localhost:3000/subject/"+`${subject._id}`, subject);
  }
}
