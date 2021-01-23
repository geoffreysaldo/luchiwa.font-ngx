import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'ngx-account-check-page',
  templateUrl: './account-check-page.component.html',
  styleUrls: ['./account-check-page.component.scss']
})
export class AccountCheckPageComponent implements OnInit {
  success: string;
  error: string;
  constructor(    
    private route: ActivatedRoute,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.authService.validate(this.route.snapshot.paramMap.get('token')).subscribe(result => 
      {
        console.log(result)
        this.success = result.message
      },
      (err) => {
        console.log(err)
        this.error = err.error.message
      }
    )
  }

}
