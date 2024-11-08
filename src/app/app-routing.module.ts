
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "login",
    loadComponent: () =>
      import("./auth/components/login/login.component").then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'main',
    component: AppLayoutComponent,
    children: [
      { path: '',
        loadComponent:  () => import('./core/components/pages/mypage/mypage.component').then((m) => m.MypageComponent),
      },
    ]
  },
  {
    path: 'gestion',
    component: AppLayoutComponent,
    children: [
      { path: 'historial-transito',
        loadComponent:  () => import('./core/components/pages/historial-transito/historial-transito.component').then((m) => m.HistorialTransitoComponent),
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
