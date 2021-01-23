import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { UserInfo } from '../../models/user-info.interface';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userForm: FormGroup;
  public updatePasswordBool: boolean = false;
  public updatePersonalInformationBool: boolean = false;
  public userInfo: UserInfo;
  public success: string;
  public error: string;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.userForm = this.formBuilder.group({
        email: [{value:'', disabled: true}, [Validators.required]],
        lastname: [{value:'', disabled: true}, [Validators.required]],
        firstname: [{value:'', disabled: true}, [Validators.required]],
        address: [{value:'', disabled: true}, []],
        city: [{value:'', disabled: true}, []],
        zipcode: [{value:'', disabled: true}, [Validators.pattern('[0-9]{5}')]],
        phone: [{value:'', disabled: true}, [Validators.required, Validators.pattern('[0-9]{10}')]],
      })
   }

  ngOnInit(): void {
    this.route.data.subscribe((data: {userInfo: UserInfo}) => {
      this.userInfo = data.userInfo
      this.userForm.patchValue(this.userInfo)
    });

  }

  updatePassword() {
    this.updatePasswordBool = !this.updatePasswordBool;
    if(this.updatePassword) {
      this.authService.askUpdatePassword().subscribe(res => console.log(res));
    }
  }

  updatePersonalInformation() {
    this.updatePersonalInformationBool = !this.updatePersonalInformationBool;
    if(this.updatePersonalInformationBool) {
      this.userForm.controls.address.enable();
      this.userForm.controls.city.enable();
      this.userForm.controls.zipcode.enable();
      this.userForm.controls.phone.enable();
    }
    else {
      this.userForm.controls.address.disable();
      this.userForm.controls.city.disable();
      this.userForm.controls.zipcode.disable();
      this.userForm.controls.phone.disable();
    }
  }

  cancelUpdatePersonalInformation() {
    this.updatePersonalInformationBool = !this.updatePersonalInformationBool;
    this.userForm.patchValue(this.userInfo);
    if(!this.userInfo.address) {
      this.userForm.controls.address.setValue('')
    }
    if(!this.userInfo.city) {
      this.userForm.controls.city.setValue('')
    }
    if(!this.userInfo.zipcode) {
      this.userForm.controls.zipcode.setValue('')
    }
    this.userForm.controls.address.disable();
    this.userForm.controls.city.disable();
    this.userForm.controls.zipcode.disable();
    this.userForm.controls.phone.disable();
  }

  savePersonalInformation() {
    if(!this.userForm.valid){
      return;
    }
    const personalInfo = {
      email: this.userInfo.email,
      address: this.userForm.value.address,
      city: this.userForm.value.city,
      zipcode: this.userForm.value.zipcode,
      phone: this.userForm.value.phone
     }
    this.authService.updateUser(personalInfo).subscribe(
      (res) => {
        this.updatePersonalInformation();
        this.success = 'Vos informations ont été mis à jour';
      },
      (err) => {
        this.error = "Vos informations n'ont pas pu être mis à jour, veuillez réessayer plus tard";
      });
  }

}
