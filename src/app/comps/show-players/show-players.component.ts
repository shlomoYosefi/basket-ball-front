import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/servies/get-data.service';
import { PostDataService } from 'src/app/servies/post-data.service';

@Component({
  selector: 'app-show-players',
  templateUrl: './show-players.component.html',
  styleUrls: ['./show-players.component.css']
})
export class ShowPlayersComponent implements OnInit {
  notPlayers = ''
  arr =[]

  constructor(private srv:GetDataService,private srvPost:PostDataService) { }

  ngOnInit(): void {
    this.srv.plaersAGrup.subscribe(val=>{
      console.log(val,"val");
      
      this.arr = val
      if (this.arr!=null && this.arr.length==0){
        console.log(1212121);
        this.notPlayers = 'true'
      }
      else{
        this.notPlayers = ''
      }
    })
    // console.log(this.notPlayers);
    
  }

  delete(id){
    confirm("Are you sure?")? this.srvPost.deletePlayer(id):false     
  }
}
