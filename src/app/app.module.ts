import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './comps/home/home.component';
import { SignInComponent } from './comps/sign-in/sign-in.component';
import { RegistrtionComponent } from './comps/registration/registrtion.component';
import { StartComponent } from './comps/start/start.component';
import { ShowPlayersComponent } from './comps/show-players/show-players.component';
import { AddAPlayerComponent } from './comps/add-a-player/add-a-player.component';
import { PlayComponent } from './comps/play/play.component';
import { HistoryComponent } from './comps/history/history.component';
import { HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    RegistrtionComponent,
    StartComponent,
    ShowPlayersComponent,
    AddAPlayerComponent,
    PlayComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
