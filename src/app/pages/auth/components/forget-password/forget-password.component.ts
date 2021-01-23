import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'ngx-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup;
  error: string;
  success: string
  loading: boolean;

  constructor(
    private authService: AuthService,
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.forgetPasswordForm = this.formBuilder.group({
        email: ['', [Validators.required]],
      })
    }

  ngOnInit(): void {
  }

  submit(){
    if(this.forgetPasswordForm.invalid){
      return
    }
    this.authService.forgetPassword(this.forgetPasswordForm.value).subscribe(result => {
      this.error = null;
      this.success = result.message
      this.loading = false;
    },
    (err) => {
      this.success = null
      this.error = err.error.message
      this.loading = false
    });
  }
}
