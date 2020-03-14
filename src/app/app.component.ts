import { Component } from '@angular/core';
import { Note } from './tools/interfaces/interface';
import { NotesService } from './tools/services/notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  notesList: Note[] = [
    { id: '1', title: 'Note 1',
    description: 'jhadjkahfskak jbadjvblavkabckajchskaskajshshivhsihfvishifhihf', timestamp: '3/14/2020, 7:29:35 PM', selected: false },
    { id: '2', title: 'Note 2', description: 'kjbjcgdcifkbqkhca', timestamp: '3/14/2020, 7:32:02 PM', selected: false },
    { id: '3', title: 'Note 3', description: 'bnasjcbagsgca8wydiqwhdiqh', timestamp: '3/14/2020, 7:32:34 PM', selected: true },
  ];

  constructor(private noteService: NotesService) {
    this.noteService.updateNotesList(this.notesList);
  }
}
