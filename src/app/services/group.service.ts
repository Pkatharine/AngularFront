import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Group} from "../models/group.model";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getGroups() {
    return this.http.get('http://localhost:3000/group');
  }

  createGroup(group: Group) {
    return this.http.post("http://localhost:3000/group", group);
  }

  deleteGroup(id: string) {
    return this.http.delete("http://localhost:3000/group/"+`${id}`);
  }

  updateGroup(group: Group) {
    return this.http.put("http://localhost:3000/group/"+`${group._id}`, group);
  }
}
