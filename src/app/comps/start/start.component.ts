import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/servies/get-data.service';
import { PostDataService } from 'src/app/servies/post-data.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  nameGrup =''
  constructor(private srv:GetDataService,private postSrv:PostDataService) { }

  ngOnInit(): void {
    this.srv.nameAGrup.subscribe(val => this.nameGrup = val)
  }

 

}


