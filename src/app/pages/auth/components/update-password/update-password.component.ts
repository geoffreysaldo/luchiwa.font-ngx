import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'ngx-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  error: string;
  success: string
  loading: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.passwordForm = this.formBuilder.group({
        password: ['', [Validators.required]],
        checkPassword: ['', [Validators.required]],
      })
    }

  ngOnInit(): void {
  }


  submit(){
    if(this.passwordForm.invalid){
      return;
    }
    this.authService.updatePassword(this.passwordForm.value, this.route.snapshot.paramMap.get('token')).subscribe(
      result => {
        this.success = result.message;
        this.error = null;
        this.authService.logout();
        this.router.navigateByUrl('/auth/connexion', { state: { success: result.message } })
      },
      (err) => {
        this.error = err.error.message;
        this.success = null;
      }
    )
  }

}
