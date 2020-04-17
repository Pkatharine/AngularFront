import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Group} from '../models/group.model'
import { GroupService } from '@app/services/group.service';
import { AppComponent } from '@app/app.component';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.less']
})
export class GroupComponent extends AppComponent implements OnInit {

  @ViewChild('readOnlyTemplate', null) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', null) editTemplate: TemplateRef<any>;

  editedGroup: Group;
  groups: Array<Group>;
  isNewRecord: boolean;
  statusMessage: string;

  constructor(private groupService: GroupService, router: Router, authenticationService: AuthenticationService ) {
    super(router, authenticationService);
    this.groups = new Array<Group>();
  }

  ngOnInit() {
    this.loadGroups();
  }

  private loadGroups() {
    this.groupService.getGroups().subscribe((data: Group[]) => {
      this.groups = data;
    });
  }

  addGroup() {
    this.editedGroup = new Group("", "");
    this.groups.push(this.editedGroup);
    this.isNewRecord = true;
  }

  editGroup(group: Group) {
    this.editedGroup = new Group(group._id, group.groupName);
  }

  loadTemplate(group: Group) {
    if (this.editedGroup && this.editedGroup._id == group._id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  saveGroup() {
    if (this.isNewRecord) {

      this.groupService.createGroup(this.editedGroup).subscribe(data => {
        this.statusMessage = 'Data was added successfully',
          this.loadGroups();
      }, error => console.log(error));
      this.isNewRecord = false;
      this.editGroup = null;
    } else {

      this.groupService.updateGroup(this.editedGroup).subscribe(data => {
        this.statusMessage = 'Data was updated successfully',
          this.loadGroups();
      });
      this.editedGroup = null;
    }
  }  

  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.groups.pop();
      this.isNewRecord = false;
    }
    this.editedGroup = null;
  }

  deleteGroup(group: Group) {
    this.groupService.deleteGroup(group._id).subscribe(data => {
      this.statusMessage = 'Data was deleted successfully',
        this.loadGroups();
    });
  } 

}
