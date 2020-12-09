import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/servies/get-data.service';
import { playerDto } from 'src/app/DTO/player-dto';
import { PostDataService } from 'src/app/servies/post-data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  notResults =''
  grup = {}
  idGrup=0
  display = 'display:block;'
  counterOfResultsGrup = 0
  arrAllPlayers = []
  arrAllPlayersOfSelectGrup = []
  arrSelectPlayersOfSelectGrup = []
  arrResultsByGrup = []

  arrAllResults = []
  arrResults = []
  statisticPlayer = { name: '', height: '', PlayerPosition: '', percentTo2: 0, percentTo3: 0, points: 0, image: '' }
  constructor(private srv: GetDataService, private postSrv:PostDataService) { }

   ngOnInit():void{
    this.srv.nameAGrup.subscribe(val => this.grup = val)
    this.srv.idAGrup.subscribe(val=>this.idGrup = val)


    this.srv.plaersAGrup.subscribe(val => {
      if(val){
      this.arrAllPlayers = val
      console.log(val);

      for (let i of val) {
        this.arrAllPlayersOfSelectGrup.push([{ player: i }, { opacity: 'opacity:1' }])
      }
      this.getAllResult()
    }})
    

  }

  selectPlayer(player) {
    let countPercentTo2 = 0
    let countPercentTo3 = 0
    let points = 0
    let counter = 0
    document.getElementById('myModa').style.display = 'none'
    document.getElementById('showTable').style.display = 'none'
    this.display = 'display:none;'

    for (let i of this.arrAllResults) {

      for (let j of i) {

        if (j["players"][0]["id"] == player.id) {
          counter++
          countPercentTo2 += j.percent2
          countPercentTo3 += j.percent3
          points += j.points
        }
      }
    }

    this.statisticPlayer.name = player.name
    this.statisticPlayer.height = player.height
    this.statisticPlayer.PlayerPosition = player.position
    this.statisticPlayer.image = player.image
    this.statisticPlayer.percentTo2 = countPercentTo2 > 0 ? (Math.floor(countPercentTo2 / counter)) : 0
    this.statisticPlayer.percentTo3 = countPercentTo3 > 0 ? (Math.floor(countPercentTo3 / counter)) : 0
    this.statisticPlayer.points = points > 0 ? (Math.floor(points / counter)) : 0

    document.getElementById('cardFull').style.display = 'block'
    document.getElementById('resultsGrup').style.display = 'none'
    this.display = 'display:none;'
  }

  resultByGrup(player) {
    
    if (this.counterOfResultsGrup == 3) {
      return
    }
    this.counterOfResultsGrup++
    this.arrSelectPlayersOfSelectGrup.push(player)
    for (let i of this.arrAllPlayersOfSelectGrup) {
      if (i[0].player == player) {
        i[0].opacity = 'opacity:0.3'
      }
    }
    console.log(this.arrSelectPlayersOfSelectGrup);

  }

  nextResultGrup() {
   
    this.arrResultsByGrup = []
    let countGrup1 = 0
    let countGrup2 = 0


    this.srv.getResultByGrup().subscribe(val => {   
      let result = Object.entries(val)
      for (let i = 0; i < result.length; i++) {
        console.log("ppppppppppppp");
        
        for (let j of this.arrSelectPlayersOfSelectGrup) {

          if (j.id == result[i][1].g1_p1 || j.id == result[i][1].g1_p2 || j.id == result[i][1].g1_p3) {
            console.log(1);
            
            countGrup1 ++
          }
          if (j.id == result[i][1].g2_p1 || j.id == result[i][1].g2_p2 || j.id == result[i][1].g2_p3) {
            countGrup2 ++
            console.log(2);
          }
        }


        if (countGrup1 == 3 || countGrup2 == 3){
          countGrup1 =0
          countGrup2 =0
          console.log("yes");    
          let play =[]
          let players = [result[i][1].g1_p1,result[i][1].g1_p2,result[i][1].g1_p3,result[i][1].g2_p1,result[i][1].g2_p2,result[i][1].g2_p3]
          
          for(let p of players){
            for(let r of this.arrAllPlayers){
              
              
              if(p == r.id){
                play.push(r.name)
              }            
            }
          }          
          play.push(result[i][1].result_g1)
          play.push(result[i][1].result_g2) 
          play.push(result[i][1].date)   
          console.log(play);
               
          this.arrResultsByGrup.push(play)

        }
        console.log(this.arrResultsByGrup);
        
        
      }
      if (this.arrResultsByGrup.length == 0) {      
      alert('No game results')
      for (let q of this.arrAllPlayersOfSelectGrup) {
        q[0].opacity = 'opacity:1'
      }
      this.counterOfResultsGrup =0
      this.arrSelectPlayersOfSelectGrup =[]

      return
    }
    else {
      for (let q of this.arrAllPlayersOfSelectGrup) {
        q[0].opacity = 'opacity:1'
      }
      document.getElementById('showTable').style.display = 'none'
      document.getElementById('resultByGrup').style.display = 'none'
      document.getElementById('cardFull').style.display = 'none'
      document.getElementById('resultsGrup').style.display = 'block'
      
      this.arrSelectPlayersOfSelectGrup = []
      this.counterOfResultsGrup =0

    }
    })
  }




  modalDisplay(html, display) {
    if(this.notResults=='true'){return}
    document.getElementById(html).style.display = display
    if ((html == 'cardFull' && display == 'none') || (html == 'resultByGrup' && display == 'none')) {
      console.log(html);
      this.arrResults = this.arrAllResults
      document.getElementById('showTable').style.display = 'block'
    }
  }


  date(date) {    
    if(this.notResults){
      return
    }
    date = date.split('-')
    date = `${date[2]}.${date[1]}.${date[0]}`    

    this.srv.getResultByDate({date:date, grup:this.idGrup}).subscribe(val =>{  
      console.log(val);
          
      if (!val) {        
      alert('No games found on this date')
      this.display = 'display:block;'
      return
    }
    else{
      this.arrAllResults = []
      let counter = 0
      let arr = []

      let result = Object.entries(val)
      
      let arrGames = []
      for (let i of result){
       arrGames.push(i[1].id);        
      }

      this.srv.getstatisticByDate({games:arrGames}).subscribe(val=>{
        
        let result = Object.entries(val)
        console.log(result);

        for (let i=0;i<result.length; i++){

          if (counter == 6) {
            this.arrAllResults.push(arr)
            arr = []
            counter = 0
          }
          arr.push(result[i][1])
          counter++
        }
        this.arrAllResults.push(arr)    
        console.log(this.arrAllResults);
      })
    }
    
    })
    
    document.getElementById('cardFull').style.display = 'none'
    document.getElementById('resultsGrup').style.display = 'none'  
  }





  getAllResult() {
  
    this.arrAllResults = []

    this.srv.getAllResult(this.idGrup).subscribe(val => {
      
      if(val .length>1){
        this.notResults =''
      let counter = 0
      let arr = []
      for (let i of val) {
        if (counter == 6) {
          this.arrAllResults.push(arr)
          arr = []
          counter = 0
        }
        arr.push(i)
        counter++
      }
      this.arrAllResults.push(arr)
      console.log(this.arrAllResults.length);

      
      let aa = document.getElementById('showTable');
      console.log(aa);
      
      document.getElementById('cardFull').style.display = 'none'
      document.getElementById('resultsGrup').style.display = 'none'
      document.getElementById('showTable').style.display = 'block'
    }
    if(this.arrAllResults.length==0){
      this.notResults = 'true'
    }
  })

    
  
  }

}
