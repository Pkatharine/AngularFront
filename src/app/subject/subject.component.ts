import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { Subject } from '@app/models/subject.model';
import { Group } from '@app/models/group.model';
import { Teacher } from '@app/models/teacher.model';
import { SubjectService } from '@app/services/subject.service';
import { TeacherService } from '@app/services/teacher.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';
import { GroupService } from '@app/services/group.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.less']
})
export class SubjectComponent  extends AppComponent implements OnInit {

  //типы шаблонов
  @ViewChild('readOnlyTemplate', null) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', null) editTemplate: TemplateRef<any>;

  editedSubject: Subject;
  subjects: Array<Subject>;
  isNewRecord: boolean;
  statusMessage: string;
  groups: Array<Group>;
  teachers: Array<Teacher>;

  constructor(private subjectService: SubjectService, private groupService: GroupService, private teacherService : TeacherService, router: Router, authenticationService: AuthenticationService) {
    super(router, authenticationService);
    this.subjects = new Array<Subject>();
  }

  ngOnInit() {
    this.loadSubjects();
    this.loadGroups();
    this.loadTeachers();
  }

  private loadSubjects() {
    this.subjectService.getSubjects().subscribe((data: Subject[]) => {
      this.subjects = data;
    });
  }

  private loadTeachers() {
    this.teacherService.getTeachers().subscribe((data: Teacher[]) => {
      this.teachers = data;
    });
  }

  addSubject() {
    this.editedSubject = new Subject("", "",null, null);
    this.subjects.push(this.editedSubject);
    this.isNewRecord = true;
  }

  editSubject(subject: Subject) {
    this.editedSubject = new Subject(subject._id, subject.name, subject.teacher, subject.group);
  }
  // загружаем один из двух шаблонов
  loadTemplate(subject: Subject) {
    if (this.editedSubject && this.editedSubject._id == subject._id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  saveSubject() {
    if (this.isNewRecord) {
      // добавляем пользователя
      this.subjectService.createSubject(this.editedSubject).subscribe(data => {
        this.statusMessage = 'Data was added successfully',
          this.loadSubjects();
      }, error => console.log(error));
      this.isNewRecord = false;
      this.editedSubject = null;
    } else {
      // изменяем пользователя
      this.subjectService.updateSubject(this.editedSubject).subscribe(data => {
        this.statusMessage = 'Data was updated successfully',
          this.loadSubjects();
      });
      this.editedSubject = null;
    }
  }
  // поиск
  
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.subjects.pop();
      this.isNewRecord = false;
    }
    this.editedSubject = null;
  }
  // удаление пользователя
  deleteSubject(subject: Subject) {
    this.subjectService.deleteSubject(subject._id).subscribe(data => {
      this.statusMessage = 'Data was deleted successfully',
        this.loadSubjects();
    });
  }
  
  loadGroups() {
    this.groupService.getGroups().subscribe((data: Group[]) => {
      this.groups = data;
    });
  }

}

