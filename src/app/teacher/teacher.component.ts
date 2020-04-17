import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { Teacher } from '@app/models/teacher.model';
import { TeacherService } from '@app/services/teacher.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.less']
})
export class TeacherComponent extends AppComponent implements OnInit {

  @ViewChild('readOnlyTemplate', null) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', null) editTemplate: TemplateRef<any>;

  editedTeacher: Teacher;
  teachers: Array<Teacher>;
  isNewRecord: boolean;
  statusMessage: string;

  constructor(private teacherService: TeacherService, router: Router, authenticationService: AuthenticationService ) {
    super(router, authenticationService);
    this.teachers = new Array<Teacher>();
  }

  ngOnInit() {
    this.loadTeachers();
  }

  private loadTeachers() {
    this.teacherService.getTeachers().subscribe((data: Teacher[]) => {
      this.teachers = data;
    });
  }

  addTeacher() {
    this.editedTeacher = new Teacher("", "", "", false);
    this.teachers.push(this.editedTeacher);
    this.isNewRecord = true;
  }

  editTeacher(teacher: Teacher) {
    this.editedTeacher = new Teacher(teacher._id, teacher.fullName, teacher.position, teacher.isAllowed);
  }

  loadTemplate(teacher: Teacher) {
    if (this.editedTeacher && this.editedTeacher._id == teacher._id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  saveTeacher() {
    if (this.isNewRecord) {

      this.teacherService.createTeacher(this.editedTeacher).subscribe(data => {
        this.statusMessage = 'Data was added successfully',
          this.loadTeachers();
      }, error => console.log(error));
      this.isNewRecord = false;
      this.editedTeacher = null;
    } else {

      this.teacherService.updateTeacher(this.editedTeacher).subscribe(data => {
        this.statusMessage = 'Data was updated successfully',
          this.loadTeachers();
      });
      this.editedTeacher = null;
    }
  }  

  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.teachers.pop();
      this.isNewRecord = false;
    }
    this.editedTeacher = null;
  }

  deleteTeacher(teacher: Teacher) {
    this.teacherService.deleteTeacher(teacher._id).subscribe(data => {
      this.statusMessage = 'Data was deleted successfully',
        this.loadTeachers();
    });
  } 

}
