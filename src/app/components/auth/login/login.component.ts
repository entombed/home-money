import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '@services/users.service';
import { UserModel } from '@shared/models/user.model';
import { MessageModel } from '@shared/models/message.model';
import { AuthService } from '@services/auth.service'

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: MessageModel;

  constructor(
    private _usersService: UsersService,
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.message = new MessageModel('danger', '');
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['nowCanLogin']) {
        const message: MessageModel = {
          type: 'success',
          text: 'Можете войти в систему',
        }
        this.showMessage(message);
      }
    })

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  private showMessage(message: MessageModel) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 3000)
  }

  onSubmit() {
    // console.log(this.form)
    const formData = this.form.value;
    this._usersService.getUserByEmail(formData.email).subscribe((data: UserModel) => {
      console.log(data)
      let user = data[0] ? data[0] : undefined;
      if (user) {
        if (user.password === formData.password) {
          this.message.text = '';
          this._authService.login();
          window.localStorage.setItem('user', JSON.stringify(user));
          // this._router.navigate [''];
        } else {
          const message: MessageModel = {
            type: 'danger',
            text: 'Не правильный пароль',
          };
          this.showMessage(message);
        }
      } else {
        const message: MessageModel = {
          type: 'danger',
          text: 'Пользователя не существует',
        };
        this.showMessage(message);
      }
    })
  }

}
