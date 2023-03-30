import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BoardGameListComponent } from './component/board-game-list/board-game-list.component';
import { LoginComponent } from './component/login/login.component';
import { MyAccountComponent } from './component/my-account/my-account.component';
import { RegisterComponent } from './component/register/register.component';

const routes: Routes = [
  { path: 'my-account', component: MyAccountComponent, 
      canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'board-game-list', component: BoardGameListComponent },
  { path: '', redirectTo: '/board-game-list', pathMatch: 'full' },
  { path: '**', redirectTo: '/board-game-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
