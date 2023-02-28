import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers()
  }

  user = {
    id: '',
    name: '',
    email: '',
    age: 0
  };

  getUsers() {
    this.http.get<any>('http://localhost:3000/api/users').subscribe(data => {
      for (let index = 0; index < data.length; index++) {
        console.log(data[index]);
      }
    })
  }

  createOrUpdate(id: string) {
    console.log(this.user)
  }
}
