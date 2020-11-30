import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  url = 'http://localhost:3000'
  nameAGrup:BehaviorSubject<any> = new BehaviorSubject(null)
  idAGrup:BehaviorSubject<any> = new BehaviorSubject(null)
  plaersAGrup:BehaviorSubject<any> = new BehaviorSubject(null)



  constructor(private http:HttpClient) { 
     
    }


    getAllResult(id):Observable<any>{
      console.log(id);
      
      return this.http.get(`${this.url}/results/getAllResult/${id}`)
    }


    getResultByGrup(){
      return this.http.get(`${this.url}/results/getResultByGrup/`)
    }


    getResultByDate(date){ 
      return this.http.post(`${this.url}/results/getResultByDate/`,date)
    }

    getstatisticByDate(games){
      return this.http.post(`${this.url}/results/getstatisticByDate/`,games)
    }

    
    }


   


