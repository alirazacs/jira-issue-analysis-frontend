import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  menuItems = [
    {
      label: "Issue Analysis",
      routerLink: ['/issue-analysis'],
      routerLinkActiveOptions: {
        exact: true
      },
    },
    {
      label: "Configure Project Source",
      routerLink: ['/source-details'],
      routerLinkActiveOptions: {
        exact: true
      },
    }
  ]

  constructor() { }


}
