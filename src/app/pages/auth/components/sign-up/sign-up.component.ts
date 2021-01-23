import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthAdminService } from 'app/pages/admin/services/auth-admin.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'ngx-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;
  public error;
  public success;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      address: ['', []],
      city: ['', []],
      zipcode: ['', [Validators.pattern('[0-9]{5}')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    })
   }

  ngOnInit(): void {
  }

  submit(){
    if(this.signUpForm.invalid){
      return;
    }
  this.authService.signup(this.signUpForm.value).subscribe(result => {
      this.error = null;
      this.router.navigateByUrl('/auth/connexion', { state: { success: result.message } });
    },
      (err) => {
        this.error = err.error.message;
        this.success = null;
    })
  }

}
