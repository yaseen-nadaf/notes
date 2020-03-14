import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes = new BehaviorSubject([]);
  private noteTitle = new BehaviorSubject([]);

  constructor() { }

  getNewId() {
    const notes = this.getNotes();
    if (notes.length > 0) {
      return (+(notes[notes.length - 1].id) + 1).toString();
    } else {
      return '1';
    }
  }

  listenUpdates(): Observable<any[]> {
    return this.notes.asObservable();
  }

  updateLists(val) {
    this.notes.next(val);
  }

  listenTitle(): Observable<any> {
    return this.noteTitle.asObservable();
  }

  updateTitle(val) {
    this.noteTitle.next(val);
  }

  updateNotesList(val) {
    window.localStorage.removeItem('notes');
    window.localStorage.setItem('notes', JSON.stringify(val));
    this.updateLists(val);
  }

  saveNote(val, noteId) {
    const fetchedNotes = this.getNotes();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < fetchedNotes.length; i++) {
      if (fetchedNotes[i].id === noteId) {
        fetchedNotes[i] = val;
      }
    }
    window.localStorage.removeItem('notes');
    window.localStorage.setItem('notes', JSON.stringify(fetchedNotes));
    this.updateLists(fetchedNotes);
  }

  getNotes() {
    return JSON.parse(window.localStorage.getItem('notes'));
  }

  setNoteToUpdate(val) {
    window.localStorage.setItem('noteTitleToUpdate', JSON.stringify(val));
  }

  getNoteToUpdate() {
    return JSON.parse(window.localStorage.getItem('noteTitleToUpdate'));
  }
}
