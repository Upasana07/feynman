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
  names = ['admin', 'upasana', 'guest']; //limited usernames
  constructor(private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  }
  onLogin() {
    //check credentials
    if (this.names.indexOf(this.username.value) > -1) {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', this.username.value);
      if(!(JSON.parse(localStorage.getItem('topic') ) || {}).hasOwnProperty(this.username.value)){
        let allData = (JSON.parse(localStorage.getItem('topic') ) || {});
        allData[this.username.value] = [];
        localStorage.setItem('topic', JSON.stringify(allData));
      }
    } else {
      //error message
      this.snackbar.open('Enter correct username', '', { duration: 300 });
    }
  }
}
