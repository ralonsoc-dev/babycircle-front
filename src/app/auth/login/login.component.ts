import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @Input() user: User;
  @Output() newUserEventEmitter = new EventEmitter<User>();

  constructor() {
    this.user = new User();

  }

  onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      this.newUserEventEmitter.emit(this.user);
      console.log(this.user);
    } 
    userForm.reset();
    userForm.resetForm(); 
  }

  onClear(userForm: NgForm) {
    this.user = new User();
    userForm.reset();
    userForm.resetForm(); 
  }
}
