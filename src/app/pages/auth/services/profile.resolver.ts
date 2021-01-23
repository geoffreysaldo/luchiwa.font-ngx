import { Injectable } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserInfo } from '../models/user-info.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver {
  constructor(private authService: AuthService){}

  resolve(): Observable<UserInfo>{
      return this.authService.getUserInfo().pipe(take(1))
  }
}
