import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  visibleContent;
  progress;
  currentUser;
  allData;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getData();
    if(this.visibleContent){
      this.visibleContent.forEach(element => {
        let sum: number = 0;
        element.content.forEach(a => {
          var val = parseInt(a.score);
          if(val)
          sum = sum + val;
          else
          sum = sum + 0;
        });
        this.progress = (sum / (element.content.length * 4)) * 100;
        element.progress = this.progress.toFixed(2);
        this.allData[this.currentUser] = this.visibleContent;
        localStorage.setItem('topic', JSON.stringify(this.allData));
      });
    }
  }
  addNewTopic() {
    this.router.navigate(['/newtopic'])
  }
  logOut(){
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser')
    this.router.navigate(['']);
  }
  getData(){
    this.allData = {...JSON.parse(localStorage.getItem('topic')) || ''};
    this.currentUser = localStorage.getItem('currentUser')
    this.visibleContent = this.allData[this.currentUser];
    console.log(this.visibleContent);
  }
}
