import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import {
  CriarPedidoDTO,
  PedidoService,
} from '../../../core/services/pedido.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private pedidoService = inject(PedidoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  telefone = new FormControl('', [
    Validators.required,
    Validators.minLength(11),
  ]);

  errorMessage = '';

  mesaId!: number;

  constructor() {
    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {
    this.mesaId = Number(this.route.snapshot.queryParamMap.get('mesa'));
  }

  updateErrorMessage() {
    if (this.name.hasError('required')) {
      this.errorMessage = 'Insira um nome válido';
    } else if (this.name.hasError('minlength')) {
      this.errorMessage = 'Nome muito curto';
    } else if (this.telefone.hasError('required')) {
      this.errorMessage = 'Insira um telefone válido';
    } else if (this.telefone.hasError('minlength')) {
      this.errorMessage = 'Telefone inválido';
    } else {
      this.errorMessage = '';
    }
  }

  criarPedido() {

    const pedido = {
      idMesa: this.mesaId,
      clienteNome: this.name.value!,
      telefone: this.telefone.value!,
    };

    this.pedidoService.criarPedido(pedido).subscribe({
      next: (res: any) => {
        console.log('Pedido criado:', res);

        this.router.navigate(['/menu'], {
          queryParams: {
            pedido: res.id,
            mesa: this.mesaId,
          },
        });
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao criar pedido');
      },
    });
  }
}
