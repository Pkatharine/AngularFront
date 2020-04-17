import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  model: any = {};
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
) { 
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }
    console.log(this.model)

}
get f() { return this.registerForm.controls; }


  register() {
      this.loading = true;
      this.model = {"username": this.f.username.value, "password": this.f.password.value, "firstName": this.f.firstName.value,
       "lastName": this.f.lastName.value}
       console.log(this.model)
      this.userService.create(this.model)
          .subscribe(
              data => {
                  this.router.navigate(['login']);
              },
              error => {
                  this.loading = false;
              });
  }

ngOnInit() {
    this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        firstName:['', Validators.required],
        lastName: ['', Validators.required]
    });
}

}
