import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = new FormControl('');
  names = {
    username: 'admin',
  }
  constructor(private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }
  onLogin() {
    if (this.names.username == this.username.value) {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      this.snackbar.open('Enter correct username', '', { duration: 300 });
    }
  }
}
