import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Note } from './../tools/interfaces/interface';
import { NotesService } from '../tools/services/notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit, OnDestroy {
  notesList: Note[];
  subscription1;
  subscription2;
  deletedNote;

  constructor(private noteService: NotesService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscription1 = this.noteService.listenUpdates().subscribe(data => {
      if (data) {
        this.notesList = data;
        // this.changeCardColor();
      }
    });
    this.notesList = this.noteService.getNotes();
    this.router.navigate(['/notes/3']);
    this.noteService.setNoteToUpdate(this.notesList[this.notesList.length - 1]);
    this.updateTitle();
  }

  changeCardColor(val) {
    const index = this.notesList.indexOf(val);
    this.noteService.setNoteToUpdate(val);
    for (let i = 0; i < this.notesList.length; i++) {
      if (i === index) {
        this.notesList[i].selected = true;
      } else {
        this.notesList[i].selected = false;
      }
    }
    this.noteService.updateNotesList(this.notesList);
  }

  addNew() {
    const newNote: Note = {
      id: this.noteService.getNewId(),
      title: 'New Note',
      description: '',
      selected: true,
      timestamp: new Date().toLocaleString()
    };
    this.notesList.push(newNote);
    this.changeCardColor(newNote);
    this.noteService.updateNotesList(this.notesList);
    this.router.navigate(['/notes/' + +(newNote.id)]);
  }

  deleteNote(note) {
    const index = this.notesList.indexOf(note);
    this.deletedNote = this.notesList.splice(index, 1);
    if (this.notesList.length > 0) {
      if (this.notesList.length >= 1) {
        this.notesList[0].selected = true;
        this.router.navigate(['/notes/' + +(this.notesList[0].id)]);
        this.changeCardColor(this.notesList[0]);
      }
    } else {
      this.router.navigate(['/notes']);
    }
    this.noteService.updateNotesList(this.notesList);
  }

  updateTitle() {
    this.subscription2 = this.noteService.listenTitle().subscribe(val => {
      if (val === []) { }
      if (val !== '') {
        const note = this.noteService.getNoteToUpdate();
        this.notesList.find(item => item.id === note.id).title = val;
      }
    });
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

}
