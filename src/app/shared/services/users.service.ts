import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {UserModel} from '@shared/models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public dbUrl: string = 'http://localhost';
  public dbPort: string = '3000';
  constructor(
    public http: Http,
  ) { }

  getUserByEmail(email: string): Observable<UserModel> {
    let getUser = this.http.get(`${this.dbUrl}:${this.dbPort}/users?email=${email}`).pipe(
      map((data: Response) => {
        return data.json()
      })
    )
    console.log(getUser)
    // getUser.pipe(
    //   map((user: UserModel) => {
    //     return user[0] ? user[0] : undefined;
    //   })
    // ) 
    return getUser
  }
}
