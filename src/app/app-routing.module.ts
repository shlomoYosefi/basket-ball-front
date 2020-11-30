import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './comps/home/home.component';
import { SignInComponent } from './comps/sign-in/sign-in.component';
import { RegistrtionComponent } from './comps/registration/registrtion.component';
import { StartComponent } from './comps/start/start.component';
import { ShowPlayersComponent } from './comps/show-players/show-players.component';
import { AddAPlayerComponent } from './comps/add-a-player/add-a-player.component';
import { PlayComponent } from './comps/play/play.component';
import { HistoryComponent } from './comps/history/history.component';
import { MyGurdGuard } from './my-gurd.guard';


const routes: Routes = [
  {path:'home' ,component: HomeComponent},
  {path:'sign-in' ,component: SignInComponent},
  {path:'registration' ,component: RegistrtionComponent},
  {path:'start' ,component: StartComponent ,canActivate:[MyGurdGuard]},
  {path:'show-players',component:ShowPlayersComponent ,canActivate:[MyGurdGuard]},
  {path:'add-a-player',component:AddAPlayerComponent ,canActivate:[MyGurdGuard]},
  {path:'play',component:PlayComponent ,canActivate:[MyGurdGuard]},
  {path:'history',component:HistoryComponent ,canActivate:[MyGurdGuard]},
  {path:'',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
