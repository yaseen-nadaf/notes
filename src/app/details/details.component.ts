import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { NotesService } from './../tools/services/notes.service';
import { Note } from './../tools/interfaces/interface';

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
  isMobile = false;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private route: ActivatedRoute,
    // tslint:disable-next-line: align
    private noteService: NotesService, private router: Router) {
      // Form Initializing
    this.notesForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      description: ['']
    });

    // Determine whether mobile screen or not
    if (window.innerWidth <= 450) {
      this.isMobile = true;
    }
  }

  ngOnInit(): void {
    // Taking route parameters to show/update selected note's details
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

    // Updating timestamp everytime when details are modified and save button is clicked
    // tslint:disable-next-line: no-string-literal
    this.noteDate = val['timestamp'] = new Date().toLocaleString();
    this.noteService.saveNote(val, this.noteId);
    this.snackBar.open('Your Note Updated Successfully !!', '',  {
      duration: 3000
    });

    // If mobile screen then after saving the this.note, user automatically routes notes-list page
    if (this.isMobile) {
      this.router.navigate(['/mobilenotes']);
    }
  }

  updateNoteTitle(event) {
    this.noteService.updateTitle(event.target.value);
  }

}
