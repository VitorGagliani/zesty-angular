import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  form = new FormGroup({
    quantidade: new FormControl(1, [Validators.required, Validators.min(1)]),
    observacao: new FormControl(''),
  });

  data = inject(MAT_DIALOG_DATA);
}
