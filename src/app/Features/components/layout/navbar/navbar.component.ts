import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
isSidebarOpen = false;
constructor(private _router:Router){}
logOut(){
  localStorage.removeItem('userToken')
  this._router.navigate(['/auth'])
}
}
