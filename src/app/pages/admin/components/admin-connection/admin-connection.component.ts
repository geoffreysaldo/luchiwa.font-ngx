import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthAdminService } from '../../services/auth-admin.service';

@Component({
  selector: 'ngx-admin-connection',
  templateUrl: './admin-connection.component.html',
  styleUrls: ['./admin-connection.component.scss']
})
export class AdminConnectionComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  loading = false;
  constructor(
    private authAdminService: AuthAdminService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
   }

  ngOnInit(): void {
  }

  login() {
    console.log("passage connexion")
    if(this.loginForm.invalid){
      this.error = "Veuillez remplir correctement les champs de connexion"
    }
    this.loading = true
    this.authAdminService.login(this.loginForm.value).subscribe(
      token => {
        this.error = null;
        this.loading = false;
        this.router.navigate(['/admin/produits']);
    },
      (err) => {
        switch (err.status){
          case 401:
            this.error = "Veuillez vérifier votre email et mot de passe"
            this.loading = false
            break;
        }
      }
    )
    }
}
