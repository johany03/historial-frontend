import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/main'] }
                ]
            },
            {
                label: 'Gestion',
                items: [
                    { label: 'Historial de Transito', icon: 'pi pi-fw pi-id-card', routerLink: ['/gestion/historial-transito'] },
                ]
            },
            {
                label: 'Importador',
                items: [
                    { label: 'Importador', icon: 'pi pi-fw pi-user', routerLink: ['/uikit/formlayout'] },
                ]
            },
        ];
    }
}
