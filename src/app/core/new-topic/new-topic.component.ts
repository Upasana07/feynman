import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.scss']
})
export class NewTopicComponent implements OnInit {
  topic = new FormControl('');
  topicArr;
  dialogRef: MatDialogRef<any>;
  visibleContent;
  scoreValue = new FormControl('');
  enteredText=[];
  scores = [
    {value: '1', viewValue: 'What Rubbish'},
    {value: '2', viewValue: 'Not Clear'},
    {value: '3', viewValue: 'Somewhat Understood'},
    {value: '4', viewValue: 'Understood'}
  ];

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData();
  }
  goBack() {
    this.router.navigate(['/dashboard']);
  }
  add() {
    const str = this.topic.value;
    let delimeters = ['.',',', '|','[',']','{','}','(',')','-','?',';',':','/','\\','\'','\"','\n'];
    let result = [];
    let map = { 'content': result , 'progress': null};
    let temp = '';
    for (let i = 0; i < str.length; i++) {
      if (delimeters.indexOf(str[i]) > -1) {
        result.push({ text: temp, delimeter: str[i], score: '' });
        temp = '';
      }
      else {
        temp = temp + str[i];
      }
    } if (temp != "") result.push({ text: temp, delimeter: '', score: '' });
    this.topicArr = [...(JSON.parse(localStorage.getItem('topic')) || '')];
    this.topicArr.push(map);
    localStorage.setItem('topic', JSON.stringify(this.topicArr));
    this.getData();
  }
  onClick(t, i, template?: TemplateRef<any>) {
    this.dialogRef = this.dialog.open(template, { width: '300px', height: '255px', data: {text: t} });
  }
  cancel(){
    this.topic.reset();
    this.dialog.closeAll();
  }
  save(text){
    this.topic.reset();
    let value = this.scoreValue.value;
    this.update(text, value);
    this.cancel();
  }
  update(text,value){
    let arr = [...(JSON.parse(localStorage.getItem('topic')) || '')];
    arr[0].content.forEach(element => {
      if(element['text'] == text){
        element['score'] = value
      }
    });
    localStorage.setItem('topic', JSON.stringify(arr));
  }
  getData(){
    this.visibleContent = JSON.parse(localStorage.getItem('topic')) || '';
  }
}
