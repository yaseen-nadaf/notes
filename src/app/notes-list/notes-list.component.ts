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
  searchText = '';
  isMobile = false;

  constructor(private noteService: NotesService, private router: Router, private cdr: ChangeDetectorRef) {
    if (window.innerWidth <= 450) {
      this.isMobile = true;
    }
   }

  ngOnInit(): void {
    this.subscription1 = this.noteService.listenUpdates().subscribe(data => {
      if (data) {
        this.notesList = data;
        // this.changeCardColor();
      }
    });
    this.notesList = this.noteService.getNotes();
    if (!this.isMobile) {
      this.router.navigate(['/notes/3']);
    } else {
      this.router.navigate(['/mobilenotes']);
    }
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
    if (!this.isMobile) {
      this.router.navigate(['/notes/' + +(newNote.id)]);
    } else {
      this.router.navigate(['/mobilenotes/' + +(newNote.id)]);
    }
  }

  deleteNote(note) {
    const index = this.notesList.indexOf(note);
    this.deletedNote = this.notesList.splice(index, 1);
    if (this.notesList.length > 0) {
      if (this.notesList.length >= 1) {
        this.notesList[0].selected = true;
        if (!this.isMobile) {
          this.router.navigate(['/notes/' + +(this.notesList[0].id)]);
        } else {
          this.router.navigate(['/mobilenotes/' + +(this.notesList[0].id)]);
        }
        this.changeCardColor(this.notesList[0]);
      }
    } else {
      if (!this.isMobile) {
        this.router.navigate(['/notes']);
      } else {
        this.router.navigate(['/mobilenotes']);
      }
    }
    this.noteService.updateNotesList(this.notesList);
  }

  updateTitle() {
    this.subscription2 = this.noteService.listenTitle().subscribe(val => {
      // tslint:disable-next-line: triple-equals
      if (val != '') {
        const note = this.noteService.getNoteToUpdate();
        this.notesList.find(item => item.id === note.id).title = val;
      }
    });
  }

  goToNote(id) {
    if (!this.isMobile) {
      this.router.navigate(['/notes/' + +id]);
    } else {
      this.router.navigate(['/mobilenotes/' + +id]);
    }
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

}
