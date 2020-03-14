import { NotesService } from './../tools/services/notes.service';
import { Note } from './../tools/interfaces/interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  notesForm: FormGroup;
  noteId = '';
  noteDate = '';
  note: Note;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private route: ActivatedRoute,
    // tslint:disable-next-line: align
    private noteService: NotesService) {
    this.notesForm = this.fb.group({
      title: ['', Validators.compose([Validators.required])],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.noteId = params.id.toString();
      setTimeout(() => {
        const notes = this.noteService.getNotes();
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < notes.length; i++) {
          // tslint:disable-next-line: no-string-literal
          if (notes[i]['id'] === this.noteId) {
            this.note = notes[i];
          }
        }
        this.notesForm.patchValue(this.note);
        this.noteDate = this.note.timestamp;
      });
    });
  }

  saveNote(val) {
    // tslint:disable-next-line: no-string-literal
    val['id'] = this.noteId;
    // tslint:disable-next-line: no-string-literal
    val['selected'] = true;
    // tslint:disable-next-line: no-string-literal
    this.noteDate = val['timestamp'] = new Date().toLocaleString();
    this.noteService.saveNote(val, this.noteId);
    this.snackBar.open('Your Note Updated Successfully !!', '',  {
      duration: 3000
    });
  }

  updateNoteTitle(event) {
    console.log(event.target.value);
    this.noteService.updateTitle(event.target.value);
  }

}
