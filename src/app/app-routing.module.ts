import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ListOfCarsComponent } from './list-of-cars/list-of-cars.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '',component: AuthComponent},
  { path: 'admin', component: AdminPanelComponent },
  { path: 'car-list', component: ListOfCarsComponent},
  { path: 'auth', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin/:id', component: AdminPanelComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
