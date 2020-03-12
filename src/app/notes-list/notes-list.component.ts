import { Component, OnInit } from '@angular/core';
import { Note } from './../tools/interfaces/interface';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  notesList: Note[] = [
    { id: '1', title: 'Note 1 jbadjvblavkabckajchskaskajshshivhsihfvishifhihf',
    description: 'jhadjkahfskak', timestamp: '', selected: false },
    { id: '2', title: 'Note 2', description: 'kjbjcgdcifkbqkhca', timestamp: '', selected: false },
    { id: '3', title: 'Note 3', description: 'bnasjcbagsgca8wydiqwhdiqh', timestamp: '', selected: false },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  changeCardColor(val) {
    const index = this.notesList.indexOf(val);
    for (let i = 0; i < this.notesList.length; i++) {
      if (i === index) {
        this.notesList[i].selected = true;
      } else {
        this.notesList[i].selected = false;
      }
    }
  }

}
