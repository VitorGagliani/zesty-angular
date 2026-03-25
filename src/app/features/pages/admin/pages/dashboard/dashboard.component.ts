import {
  DashboardService,
  produtoMaisPedido,
  pedidos,
  faturamento,
} from './../../../../../core/services/dashboard.service';
import { MatIconModule } from '@angular/material/icon';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  produto!: produtoMaisPedido;
  pedidos!: pedidos;
  pedidosHoje!: pedidos;
  pedidosEmPreparo!: pedidos;
  faturamento!: faturamento;
  faturamentoDia!: faturamento;

  ngOnInit(): void {
    this.carregarDashboard();
  }


  carregarDashboard() {
    this.dashboardService.produtoMaisPedido().subscribe((produto) => {
      this.produto = produto[0] ?? { nome: '-' };
    });

    this.dashboardService.totalMes().subscribe((pedidos) => {
      this.pedidos = pedidos[0] ?? { total: 0 };
    });

    this.dashboardService.totalHoje().subscribe((pedidosHoje) => {
      this.pedidosHoje = pedidosHoje[0] ?? { total: 0 };
    });

    this.dashboardService.emPreparo().subscribe((pedidosEmPreparo) => {
      this.pedidosEmPreparo = pedidosEmPreparo[0] ?? { total: 0 };
    });

    this.dashboardService.faturamentoMes().subscribe((faturamento) => {
      this.faturamento = faturamento[0] ?? { faturamento: 0 };
    });

    this.dashboardService.faturamentoDia().subscribe((res) => {
      this.faturamentoDia = {
        faturamento: res[0]?.faturamento ?? 0,
      };
    });
  }
}
