import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  mesaId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mesaId = Number(this.route.snapshot.queryParamMap.get('mesa'));
  }

  fazerLogin() {
    // aqui depois você pode colocar validação ou API

    this.router.navigate(['/mesa', this.mesaId]);
  }

}
