import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SarveOfGurdService {

  logIn 
  constructor() { 
    this.logIn = localStorage.getItem('gurd')
  }


  getLogIn(){   
    console.log(this.logIn);
     
    return this.logIn
  }
}
