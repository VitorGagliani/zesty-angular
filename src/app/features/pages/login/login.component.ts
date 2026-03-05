import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})



export class LoginComponent implements OnInit {

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  telefone = new FormControl('', [Validators.required, Validators.minLength(11)])

  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.name.hasError('Obrigatório')) {
      this.errorMessage = 'Insira um nome válido';
    } else if (this.name.hasError('name')) {
      this.errorMessage = 'Nome inválido';
    } else {
      this.errorMessage = '';
    }

    if (this.telefone.hasError('Obrigatório')){
      this.errorMessage = 'Insira um telefone válido';

    }
  }



  mesaId!: number;


  ngOnInit(): void {
    this.mesaId = Number(this.route.snapshot.queryParamMap.get('mesa'));
  }

  fazerLogin() {
    // aqui depois você pode colocar validação ou API

    this.router.navigate(['/mesa', this.mesaId]);
  }

}
