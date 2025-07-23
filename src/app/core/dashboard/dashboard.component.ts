import { Component } from '@angular/core';
import { NavbarComponent } from "../../Features/components/layout/navbar/navbar.component";
import { FooterComponent } from "../../Features/components/layout/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
