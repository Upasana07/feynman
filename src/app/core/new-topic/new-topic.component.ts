import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.scss']
})
export class NewTopicComponent implements OnInit {
  topicDetails = new FormGroup({
    topicTitle: new FormControl('', [Validators.required]),
    topic: new FormControl('', [Validators.required, Validators.minLength(2)])
  });
  topic = new FormControl('');
  topicArr;
  dialogRef: MatDialogRef<any>;
  visibleContent;
  currentUser;
  scoreValue = new FormControl('');
  enteredText = [];
  allData;
  scores = [
    { value: '1', viewValue: 'What Rubbish' , class: 'red'},
    { value: '2', viewValue: 'Not Clear' ,class: 'blue'},
    { value: '3', viewValue: 'Somewhat Understood' ,class: 'yellow' },
    { value: '4', viewValue: 'Understood' , class: 'green' }
  ];

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData();
  }
  goBack() {
    this.router.navigate(['/dashboard']);
  }
  add(details) {
    //adding new topic
    const str = details.value.topic;
    let delimeters = ['.', ',', '|', '[', ']', '{', '}', '(', ')', '-', '?', ';', ':', '/', '\\', '\'', '\"', '\n'];
    let result = [];
    let map = { 'content': result, 'progress': null, 'topicTitle': null };
    map.topicTitle = details.value.topicTitle;
    let temp = '';
    for (let i = 0; i < str.length; i++) {
      if (delimeters.indexOf(str[i]) > -1) { //if delimeter exists break the string else keep appending in the string
        result.push({ text: temp, delimeter: str[i], score: '' , class: '' });
        temp = '';
      }
      else {
        temp = temp + str[i];
      }
    } if (temp != "") result.push({ text: temp, delimeter: '', score: '', class: '' });
    this.topicArr = this.allData[this.currentUser]; //fetch current user topics
    this.topicArr.push(map); //append to the current topics
    this.allData[this.currentUser] = this.topicArr;
    localStorage.setItem('topic', JSON.stringify(this.allData)); //set in localstorage
    this.getData();
    this.topicDetails.reset(); //resetting the form
  }
  onClick(t, template?: TemplateRef<any>) {
    this.dialogRef = this.dialog.open(template, { width: 'auto', height: 'auto', data: { text: t } }); //give user the option to change the score
  }
  cancel() {
    this.topic.reset();
    this.scoreValue.reset();
    this.getData();
    this.dialog.closeAll();
  }
  save(text) {
    let value = this.scoreValue.value;
    let color = '';
    switch (value) {
      case '1':
        color = 'red';
        break;
      case '2':
        color = 'blue';
        break;
      case '3':
        color = 'yellow';
        break;
      case '4':
        color = 'green';
        break;
    }
    this.update(text,value,color); //to update the text block
    this.cancel();
  }
  update(text, value, color) {
    let arr = this.allData[this.currentUser];
    arr.forEach(a=>{ //search for the current text and update
      a.content.forEach(element => {
        if (element['text'] == text) {
          element['score'] = value,
          element['class'] = color
        }
      });
    });
    this.allData[this.currentUser] = arr; 
    localStorage.setItem('topic', JSON.stringify(this.allData));
  }
  getData() {
    //fetch the present data
    this.allData = {...JSON.parse(localStorage.getItem('topic')) || ''};
    this.currentUser = localStorage.getItem('currentUser')
    this.visibleContent = this.allData[this.currentUser];
    console.log(this.visibleContent);
  }
  logOut(){
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser')
    this.router.navigate(['']);
  }
}
