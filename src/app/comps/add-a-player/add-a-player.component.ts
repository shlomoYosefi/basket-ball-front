import { Component, OnInit, ɵPlayer } from '@angular/core';
import { GetDataService } from 'src/app/servies/get-data.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { PostDataService } from 'src/app/servies/post-data.service';
import {environment} from '../../../environments/environment'


@Component({
  selector: 'app-add-a-player',
  templateUrl: './add-a-player.component.html',
  styleUrls: ['./add-a-player.component.css']
})
export class AddAPlayerComponent implements OnInit {

  // url = environment.api
  nameSpan=''
  heightSpan=''

  image: File ;
  arrPlayers = []
  constructor(private srv: GetDataService, private srvPost: PostDataService, private router: Router, private fb: FormBuilder) { }

  addPlayer = this.fb.group({
    name: ['', [Validators.required , Validators.minLength(4), Validators.maxLength(7)]],
    Height: ['', [Validators.required]],
  })


  ngOnInit(): void {
    this.srv.plaersAGrup.subscribe(val => { this.arrPlayers = val })
  }

  nameValid(){
    if(this.addPlayer.controls.name.dirty){
 
      if(this.addPlayer.controls.name.hasError('required')){
        this.nameSpan = 'Required field'
        return 'Required field'
      }
       
      else if (this.addPlayer.controls.name.hasError('minlength')){
        this.nameSpan = 'Must be at least 4 characters long' 
        return 'Must be at least 4 characters long' 
      }

      else if (this.addPlayer.controls.name.hasError('maxlength')){
        this.nameSpan = 'Must have a maximum length of 7 characters' 
        return 'Must have a maximum length of 7 characters' 
      }
    }
  }


  heightValid(){
    if(this.addPlayer.controls.Height.dirty){
 
      if(this.addPlayer.controls.Height.hasError('required')){
        this.heightSpan = 'Required field'
        return 'Required field'
      }
    }
  }


  save(name, height, select) {

    if(this.addPlayer.controls.Height.valid && this.addPlayer.controls.name.valid && this.image!=null && select!=''){
      let id = Math.floor(Math.random() * 1000000000000).toString()
      let image = `${id}`
      // console.log("url-add ", this.url,"image",image);
      
    this.srvPost.addPlayer(name, height, image, select)

    this.srvPost.uploadImage(this.image,id)
    this.router.navigate(['/start'])
    }
    else{
      alert ('Incomplete details')
    }
  }

  

  onUpload(e) {
    
    let image = e.files[0] ;
    let fileReader = new FileReader() ;
    fileReader.onload = e => {
      this.image = image ;
      console.log(this.image);
    }  
    fileReader.readAsDataURL(image) ;
    let formData = new FormData()
    formData.append('image', image );
    
    
  
  }



}
