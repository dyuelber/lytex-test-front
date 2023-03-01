import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Users } from '../models/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user = {} as Users;
  users!: Users[]; 

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.userService.users().subscribe((users: Users[]) => {
      this.users = users;
    })
  }

  editUser(user: Users) {
    this.userService.userById(user).subscribe((user: Users) => {
      this.user = user;
    });
  }

  createOrUpdate(user: Users) {
    if (user._id) {
      this.userService.update(user).subscribe(() => {
        this.user = {} as Users;
        this.getUsers()
        document.getElementById('closeModal')?.click()
      })
    } else {
      this.userService.create(user).subscribe(() => {
        this.user = {} as Users;
        this.getUsers()
        document.getElementById('closeModal')?.click()
      })
    }
  }

  deleteUser(user: Users) {
    if (confirm('Deseja excluir o registro ?')) {
      this.userService.delete(user).subscribe(() => {
        this.getUsers();
      })
    }
  }

}
