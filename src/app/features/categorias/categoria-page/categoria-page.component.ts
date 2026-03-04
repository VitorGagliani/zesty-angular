import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../../../app/core/services/produto.service';
import { switchMap } from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe, CommonModule } from '@angular/common';
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';


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

  produtos: any[] = [];


ngOnInit() {
  this.route.paramMap
    .pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.produtoService.listar(id);
      })
    )
    .subscribe(data => {
      this.produtos = data;
    });
}
}
