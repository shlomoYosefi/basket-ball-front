import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GetDataService } from 'src/app/servies/get-data.service';
import { Router } from '@angular/router';
import { PostDataService } from 'src/app/servies/post-data.service';
import { SarveOfGurdService } from 'src/app/sarve-of-gurd.service';
import { error } from 'protractor';

@Component({
  selector: 'app-registrtion',
  templateUrl: './registrtion.component.html',
  styleUrls: ['./registrtion.component.css']
})
export class RegistrtionComponent implements OnInit {

  nameSpan = ''
  passwordSpan = ''
  confirmPasswordSpan = ''



  constructor(private fb: FormBuilder, private srv: GetDataService, private srvPost: PostDataService, private router: Router, private srvGurd: SarveOfGurdService) { }


  registrationFromG = this.fb.group({
    Name: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
  })


  ngOnInit(): void {
  }


  nameValid() {
    if (this.registrationFromG.controls.Name.dirty) {

      if (!this.registrationFromG.controls.Name.hasError('required')) {
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
    if (this.registrationFromG.controls.password.dirty) {

      if (this.registrationFromG.controls.password.hasError('required')) {
        this.passwordSpan = 'Required field'
        return 'Required field'
      }

      else if (this.registrationFromG.controls.password.hasError('minlength')) {
        this.passwordSpan = 'Must be at least 4 characters long'
        return 'Must be at least 4 characters long'
      }

    }
  }

  confirmPasswordValid() {
    if (this.registrationFromG.controls.confirmPassword.dirty) {
      if (this.registrationFromG.controls.confirmPassword.hasError('required')) {
        this.confirmPasswordSpan = 'Required field'
        return 'Required field'
      }

      else if (this.registrationFromG.controls.confirmPassword.hasError('minlength')) {
        this.confirmPasswordSpan = 'Must be at least 4 characters long'
        return 'Must be at least 4 characters long'
      }
    }
  }





  guard(name, password, ConfirmPassword) {
    if (!this.registrationFromG.controls.Name.valid || !this.registrationFromG.controls.password.valid || !this.registrationFromG.controls.confirmPassword.valid) {
      alert("Incomplete details ")
      return
    }

    if (password != ConfirmPassword) {
      alert("Incorrect password verification")
      return
    }

    this.srvPost.addGrup(name, password).subscribe(val => {
      if (!val) {
        alert('There is such a group, choose another name')
      }
      else {
        this.router.navigate(['/sign-in'])
      }
    })



  }

}
