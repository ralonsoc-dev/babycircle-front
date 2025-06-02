import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [
        FormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

  @Input() user: User;
  @Output() newUserEventEmitter = new EventEmitter<User>();

  constructor(private authService: AuthService, private router: Router) {
    this.user = new User();

  }

  onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      this.authService.login(this.user).subscribe(response => {
        if (response) {
          this.router.navigate(['/profile']);
        } else {
          alert('Login failed');
        }
      });
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
