import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UsersService } from '@services/users.service';
import { UserModel } from '@shared/models/user.model';

@Component({
  selector: 'wfm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private _usersService: UsersService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmail.bind(this)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue]),
    })
  }

  onSubmit() {
    const { email, password, name } = this.form.value;
    const user = new UserModel(email, password, name)
    this._usersService.createNewUser(user).subscribe((user: UserModel) => {
      console.log(user)
      this._router.navigate(['/login'], {
        queryParams: {
          nowCanLogin: true,
        }
      })
    });
  }

  forbiddenEmail(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this._usersService.getUserByEmail(control.value).subscribe((data: UserModel) => {
        console.log(data)
        const user = data[0] ? data[0] : undefined;
        if (user) {
          resolve({ 'forbiddenEmail': true });
        } else {
          resolve(null);
        }
      })
    })
  }

}
