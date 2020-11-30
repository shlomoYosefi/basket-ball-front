import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/servies/get-data.service';
import { PostDataService } from 'src/app/servies/post-data.service';

@Component({
  selector: 'app-show-players',
  templateUrl: './show-players.component.html',
  styleUrls: ['./show-players.component.css']
})
export class ShowPlayersComponent implements OnInit {

  arr ={}

  constructor(private srv:GetDataService,private srvPost:PostDataService) { }

  ngOnInit(): void {
    this.srv.plaersAGrup.subscribe(val=>{
      console.log(val);
      
      this.arr = val})
  }

  delete(id){
    confirm("Are you sure?")? this.srvPost.deletePlayer(id):false     
  }
}
