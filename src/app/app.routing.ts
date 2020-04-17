import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { RegisterComponent } from './register/register.component';
import { GroupComponent } from './group/group.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SubjectComponent } from './subject/subject.component';
import { MarkComponent } from './mark/mark.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'group', component: GroupComponent ,canActivate: [AuthGuard] },
    { path: 'student', component: StudentComponent, canActivate: [AuthGuard] },
    { path: 'teacher', component: TeacherComponent, canActivate: [AuthGuard] },
    { path: 'subject', component: SubjectComponent, canActivate: [AuthGuard] },
    { path: 'mark', component: MarkComponent, canActivate: [AuthGuard] },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);