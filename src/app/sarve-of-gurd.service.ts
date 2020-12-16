import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SarveOfGurdService {

  constructor() {  
  }


  getLogIn(){  
    let logIn =  localStorage.getItem('gurd')
    console.log(logIn);
     
    return logIn
  }
}
