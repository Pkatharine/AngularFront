import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Student} from '../models/student.model'
import { Group } from '@app/models/group.model';
import { StudentService } from '@app/services/student.service';
import { GroupService } from '@app/services/group.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';
import { AppComponent } from '@app/app.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.less']
})
export class StudentComponent  extends AppComponent implements OnInit {

  //типы шаблонов
  @ViewChild('readOnlyTemplate', null) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', null) editTemplate: TemplateRef<any>;

  editedStudent: Student;
  students: Array<Student>;
  isNewRecord: boolean;
  statusMessage: string;
  groups: Array<Group>;

  constructor(private studentService: StudentService, private groupService: GroupService, router: Router, authenticationService: AuthenticationService) {
    super(router, authenticationService);
    this.students = new Array<Student>();
  }

  ngOnInit() {
    this.loadStudents();
    this.loadGroups();
  }

  private loadStudents() {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.students = data;
    });
  }
  addStudent() {
    this.editedStudent = new Student("","",null, false);
    this.students.push(this.editedStudent);
    this.isNewRecord = true;
  }
  editStudent(student: Student) {
    this.editedStudent = new Student(student._id, student.fullName, student.group, student.isAllowed);
  }
  // загружаем один из двух шаблонов
  loadTemplate(student: Student) {
    if (this.editedStudent && this.editedStudent._id == student._id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  saveStudent() {
    if (this.isNewRecord) {
      // добавляем пользователя
      this.studentService.createStudent(this.editedStudent).subscribe(data => {
        this.statusMessage = 'Data was added successfully',
          this.loadStudents();
      }, error => console.log(error));
      this.isNewRecord = false;
      this.editedStudent = null;
    } else {
      // изменяем пользователя
      this.studentService.updateStudent(this.editedStudent).subscribe(data => {
        this.statusMessage = 'Data was updated successfully',
          this.loadStudents();
      });
      this.editedStudent = null;
    }
  }
  // поиск
  
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.students.pop();
      this.isNewRecord = false;
    }
    this.editedStudent = null;
  }
  // удаление пользователя
  deleteStudent(student: Student) {
    this.studentService.deleteStudent(student._id).subscribe(data => {
      this.statusMessage = 'Data was deleted successfully',
        this.loadStudents();
    });
  }
  
  loadGroups() {
    this.groupService.getGroups().subscribe((data: Group[]) => {
      this.groups = data;
    });
  }


}
