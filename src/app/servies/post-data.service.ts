import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { grupDto } from '../DTO/grup-dto';
import { playerDto } from '../DTO/player-dto';
import { GetDataService } from './get-data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GameDto } from '../DTO/game-dto';
import { StatisticByPlayerDto } from '../DTO/statisticByPlayer-dto';
import { MyGurdGuard } from '../my-gurd.guard';
import { SarveOfGurdService } from '../sarve-of-gurd.service';
import {environment} from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  
  token  
  url = environment.api
  grupId = 0
  
  constructor(private http: HttpClient, private srvData: GetDataService ) {
    console.log("this url is :",this.url);
    
    this.token = localStorage.getItem("token") 
    if(this.token){
      this.srvData.nameAGrup.next(localStorage.getItem('grup'))
      this.srvData.idAGrup.next(parseInt(localStorage.getItem('id')))
      this.grupId =parseInt(localStorage.getItem('id'))
      this.getPlayers(this.grupId)
    }
  }

  
  

  chackNameGrup(nameGrup, password): Observable<any> {
    const grup: grupDto = new grupDto()
    grup.NameGrup = nameGrup
    grup.Password = password
    console.log(`${this.url}/playrs/logIn`);
    
    return this.http.post(`${this.url}/playrs/logIn`, grup).pipe(
      
      map((val) => {
        if (val) {
          localStorage.setItem("token",val['token']) 
          localStorage.setItem("id",val["id"])
          localStorage.setItem("grup",val["NameGrup"])
          this.token = localStorage.getItem("token") 
          this.srvData.nameAGrup.next(val['NameGrup'])
          this.srvData.idAGrup.next(val['id'])
          this.grupId = val['id']
          this.getPlayers(this.grupId)
        }
        return val
      })
      )
    }
    
    
    addGrup(nameGrup, password):Observable<any> {
      const newGrup: grupDto = new grupDto()
      newGrup.NameGrup = nameGrup
      newGrup.Password = password
      return this.http.post(`${this.url}/playrs/addGrup`, newGrup)
    }
    
    
    addPlayer(name, height, image, select) {
      let headers = new HttpHeaders().set("token",this.token) 
      
      const newPlayer: playerDto = new playerDto()
      newPlayer.Name = name
      newPlayer.Height = height
      newPlayer.Image = image
      newPlayer.Position = select
      newPlayer.GrupId = this.grupId
       this.http.post(`${this.url}/playrs/addPlayer/`, newPlayer,{headers}).subscribe(() => {
        this.getPlayers(this.grupId)
      })
    }
    
    
    deletePlayer(id) {
      let headers = new HttpHeaders().set("token",this.token) 
      this.http.delete(`${this.url}/playrs/deletePlayer/${id}`,{headers}).subscribe((val) => {
        if(val){
          this.getPlayers(this.grupId)
          return
        }
        alert('There are statistics attached to the player and it is not possible to delete this player')
        
      })
    }
    
    
    
    getPlayers(grupId) {    
      let headers = new HttpHeaders().set("token",this.token)   
      
      this.http.get(`${this.url}/playrs/getPlayers/${grupId}`,{headers}).subscribe(val => {
        this.srvData.plaersAGrup.next(val)
      })
      
    }
    
    
    saveGame(game: GameDto):Observable<any> {
      let headers = new HttpHeaders().set("token",this.token)
      return this.http.post(`${this.url}/results/saveGame/`, game,{headers})
    }


    
  saveStatisticByPlayer(statisticPlayer:StatisticByPlayerDto) {  
    let headers = new HttpHeaders().set("token",this.token) 
    this.http.post(`${this.url}/results/saveStatistic/`, statisticPlayer,{headers}).subscribe()
  }


  
  uploadImage(image: File,id) {
    console.log(image); 
    let formData = new FormData()
    formData.append('image', image );
    let headers = new HttpHeaders().set('id',id) 

    this.http.post(`${this.url}/playrs/upload` , formData,{headers}).subscribe() ;  
  }


}
