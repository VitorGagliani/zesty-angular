import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../../../../app/core/services/produto.service';
import { switchMap } from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe, CommonModule } from '@angular/common';
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../components/dialog/dialog.component';

@Component({
  selector: 'app-categoria-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CurrencyPipe, CommonModule,  MatIconModule],
  templateUrl: './categoria-page.component.html',
  styleUrls: ['./categoria-page.component.scss']
})
export class CategoriaPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private produtoService = inject(ProdutoService);
  private dialog = inject(MatDialog);
  produtos: any[] = [];

    openDialog(produto: any) {
    this.dialog.open(DialogComponent, {
      data: produto,
      width: '520px'
    });
  }


ngOnInit() {
  this.route.paramMap
    .pipe(
      switchMap(params => {
        const id = Number(params.get('categoriaId'));
        return this.produtoService.listar(id);
      })
    )
    .subscribe(data => {
      this.produtos = data;
    });
}
}
