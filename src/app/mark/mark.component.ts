import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { Mark } from '@app/models/mark.model';
import { Student } from '@app/models/student.model';
import { Subject } from '@app/models/subject.model';
import { Teacher } from '@app/models/teacher.model';
import { MarkService } from '@app/services/mark.service';
import { StudentService } from '@app/services/student.service';
import { TeacherService } from '@app/services/teacher.service';
import { SubjectService } from '@app/services/subject.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.less']
})
export class MarkComponent extends AppComponent implements OnInit {

  //типы шаблонов
  @ViewChild('readOnlyTemplate', null) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', null) editTemplate: TemplateRef<any>;

  editedMark: Mark;
  marks: Array<Mark>;
  isNewRecord: boolean;
  statusMessage: string;
  students: Array<Student>;
  subjects: Array<Subject>;
  teachers: Array<Teacher>;

  constructor(private markService: MarkService, private studentService: StudentService, private subjectService: SubjectService, private teacherService : TeacherService, router: Router, authenticationService: AuthenticationService) {
    super(router, authenticationService);
    this.marks = new Array<Mark>();
  }

  ngOnInit() {
    this.loadMarks();
    this.loadStudents();
    this.loadSubjects();
    this.loadTeachers();
  }

  private loadStudents() {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.students = data;
    });
  }

  private loadMarks() {
    this.markService.getMarks().subscribe((data: Mark[]) => {
      this.marks = data;
    });
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

  addMark() {
    this.editedMark = new Mark("", 0, null, null, null);
    this.marks.push(this.editedMark);
    this.isNewRecord = true;
  }

  editMark(mark: Mark) {
    this.editedMark = new Mark(mark._id, mark.mark, mark.student, mark.subject, mark.teacher);
  }
  // загружаем один из двух шаблонов
  loadTemplate(mark: Mark) {
    if (this.editedMark && this.editedMark._id == mark._id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  // сохраняем пользователя
  saveMark() {
    if (this.isNewRecord) {
      // добавляем пользователя
      this.markService.createMark(this.editedMark).subscribe(data => {
        this.statusMessage = 'Data was added successfully',
          this.loadMarks();
      }, error => console.log(error));
      this.isNewRecord = false;
      this.editedMark = null;
    } else {
      // изменяем пользователя
      this.markService.updateMark(this.editedMark).subscribe(data => {
        this.statusMessage = 'Data was updated successfully',
          this.loadMarks();
      });
      this.editedMark = null;
    }
  }
  // поиск
  
  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.marks.pop();
      this.isNewRecord = false;
    }
    this.editedMark = null;
  }
  // удаление пользователя
  deleteMark(mark: Mark) {
    this.markService.deleteMark(mark._id).subscribe(data => {
      this.statusMessage = 'Data was deleted successfully',
        this.loadMarks();
    });
  }
  
}
