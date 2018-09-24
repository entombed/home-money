import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '@shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth/auth.component';
import {RoutingModule} from './routing/routing.module';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AuthComponent
  ]
})
export class AuthModule { }
