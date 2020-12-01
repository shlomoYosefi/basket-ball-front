import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataService } from 'src/app/servies/get-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PostDataService } from 'src/app/servies/post-data.service';
import { SarveOfGurdService } from 'src/app/sarve-of-gurd.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  nameSpan = ''
  passwordSpan = ''


  constructor(private fb: FormBuilder, private router: Router, private srv: GetDataService, private srvPost: PostDataService, private srvGurd: SarveOfGurdService) { }


  signInFromG = this.fb.group({
    nameGrup: ['', [Validators.required]],
    myPassword: ['', [Validators.required, Validators.minLength(4)]],
    remmberMe: ['']
  })

  ngOnInit(): void {
  }


  nameValid() {
    if (this.signInFromG.controls.nameGrup.dirty) {

      if (!this.signInFromG.controls.nameGrup.hasError('required')) {
        this.nameSpan = ''
        return ''
      }
      else {
        this.nameSpan = 'Required field'
        return 'Required field'
      }
    }
  }

  passwordValid() {
    if (this.signInFromG.controls.myPassword.dirty) {

      if (this.signInFromG.controls.myPassword.hasError('required')) {
        this.passwordSpan = 'Required field'
        return 'Required field'
      }

      else if (this.signInFromG.controls.myPassword.hasError('minlength')) {
        this.passwordSpan = 'Must be at least 4 characters long'
        return 'Must be at least 6 characters long'
      }
    }
  }

  guard(grup, password, rememberMe) {

    if (this.signInFromG.controls.myPassword.valid && this.signInFromG.controls.nameGrup.valid) {

      this.srvPost.chackNameGrup(grup, password).subscribe(val => {
        if (!val) {
          alert('wrong username or password')
        }
        else {
          console.log("shlomko");
          
          localStorage.setItem('gurd', 'true')
          this.router.navigate(['/start'])
        }
      }

      )
    }
    else{
      alert('Incomplete details')
    }
  }
}
