import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostDataService } from 'src/app/servies/post-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router ,private postSrv:PostDataService) { }

  ngOnInit(): void {
  }

  login(){    
    this.router.navigate(['/sign-in'])
  }

  registration(){
    this.router.navigate(['/registration'])
  }

}
