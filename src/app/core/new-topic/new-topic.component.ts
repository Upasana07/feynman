import { getCurrencySymbol } from '@angular/common';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
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
    topicTitle: new FormControl('', Validators.minLength(2)),
    topic: new FormControl('', Validators.minLength(2))
  });
  topic = new FormControl('');
  topicArr;
  dialogRef: MatDialogRef<any>;
  visibleContent;
  scoreValue = new FormControl('');
  enteredText = [];
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
    const str = details.value.topic;
    let delimeters = ['.', ',', '|', '[', ']', '{', '}', '(', ')', '-', '?', ';', ':', '/', '\\', '\'', '\"', '\n'];
    let result = [];
    let map = { 'content': result, 'progress': null, 'topicTitle': null };
    map.topicTitle = details.value.topicTitle;
    let temp = '';
    for (let i = 0; i < str.length; i++) {
      if (delimeters.indexOf(str[i]) > -1) {
        result.push({ text: temp, delimeter: str[i], score: '' , class: '' });
        temp = '';
      }
      else {
        temp = temp + str[i];
      }
    } if (temp != "") result.push({ text: temp, delimeter: '', score: '', class: '' });
    this.topicArr = [...(JSON.parse(localStorage.getItem('topic')) || '')];
    this.topicArr.push(map);
    localStorage.setItem('topic', JSON.stringify(this.topicArr));
    this.getData();
  }
  onClick(t, i, template?: TemplateRef<any>) {
    this.dialogRef = this.dialog.open(template, { width: 'auto', height: 'auto', data: { text: t } });
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
    this.update(text,value,color);
    this.cancel();
  }
  update(text, value, color) {
    let arr = [...(JSON.parse(localStorage.getItem('topic')) || '')];
    arr.forEach(a=>{
      a.content.forEach(element => {
        if (element['text'] == text) {
          element['score'] = value,
          element['class'] = color
        }
      });
    });
    localStorage.setItem('topic', JSON.stringify(arr));
  }
  getData() {
    this.visibleContent = JSON.parse(localStorage.getItem('topic')) || '';
    console.log(this.visibleContent);
  }
}
