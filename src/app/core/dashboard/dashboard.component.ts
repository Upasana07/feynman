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
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.visibleContent = JSON.parse(localStorage.getItem('topic')) || '';
    this.visibleContent.forEach(element => {
      let sum: number = 0;
      element.content.forEach(a => {
        var val = parseInt(a.score);
        if(val)
        sum = sum + val;
        else
        sum = sum + 0;
      });
      this.progress = (sum / element.content.length * 4) * 100;
      element.progress = this.progress;
      localStorage.setItem('topic', JSON.stringify(this.visibleContent));
    })
  }
  addNewTopic() {
    this.router.navigate(['/newtopic'])
  }
}
