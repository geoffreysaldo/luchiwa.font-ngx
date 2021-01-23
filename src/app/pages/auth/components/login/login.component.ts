import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public error: string;
  public success: string;
  public loading: boolean;
  
  constructor(
    public activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
   }

   ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.success = window.history.state.success;
    })
  }


  submit() {
    if(this.loginForm.invalid){
      this.error = "Veuillez remplir correctement les champs de connexion"
    }
    this.loading = true
    this.authService.login(this.loginForm.value).subscribe(
      token => {
        this.error = null;
        this.loading = false;
        this.router.navigate(['/']);
    },
      (err) => {
        console.log(err)
        switch (err.status){
          case 401:
            this.error = err.error.message
            this.loading = false
            break;
          case 400:
            this.error = err.error.message[0]
            this.loading = false
        }
      }
    )
    }
}
