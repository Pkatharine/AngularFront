import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mark } from '@app/models/mark.model';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  constructor(private http: HttpClient) { }

  getMarks() {
    return this.http.get('http://localhost:3000/mark');
  }

  createMark(mark: Mark) {
    return this.http.post("http://localhost:3000/mark", mark);
  }

  deleteMark(id: string) {
    return this.http.delete("http://localhost:3000/mark/"+`${id}`);
  }

  updateMark(mark: Mark) {
    return this.http.put("http://localhost:3000/mark/"+`${mark._id}`, mark);
  }
  
}
