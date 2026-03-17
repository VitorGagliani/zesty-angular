import { DashboardService, produtoMaisPedido, pedidos } from './../../../../../core/services/dashboard.service';
import { Component, inject, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private dashboardService = inject(DashboardService);
  produto!: produtoMaisPedido;
  pedidos!: pedidos;
  pedidosHoje!: pedidos;
  pedidosEmPreparo!: pedidos;


  ngOnInit(): void {
  this.dashboardService.produtoMaisPedido().subscribe(produto => {
    this.produto = produto[0];
  });
  this.dashboardService.totalMes().subscribe(pedidos => {
    this.pedidos = pedidos[0];
  });
  this.dashboardService.totalHoje().subscribe(pedidosHoje => {
    this.pedidosHoje = pedidosHoje[0];
  })
  this.dashboardService.emPreparo().subscribe(pedidosEmPreparo =>{
    this.pedidosEmPreparo = pedidosEmPreparo[0];
  })
}

}
