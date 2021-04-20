import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //aim="perfect partner"
  accno = "";
  pswd = "";

  loginForm = this.fb.group({
    accno: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12), Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]

  });
  constructor(private router: Router, private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // getUsername(event: any) {

  //   this.uname = event.target.value;
  //   console.log(this.uname);

  // }

  // pswdChange(event: any) {

  //   this.pswd = event.target.value;
  //   console.log(this.pswd);

  // }


  login() {
    if (this.loginForm.valid) {

      this.dataService.login(this.loginForm.value.accno,this.loginForm.value.pswd)
      .subscribe((data:any)=> {
        if (data) {
          alert(data.message);
          localStorage.setItem("name",data.name);
          localStorage.setItem("acno",data.acno);
          this.router.navigateByUrl("dashboard");
        }
      },(data) => {
        alert(data.error.message)
      })

    }
  


    

    else {
      alert("invalid form")
    }

  }
}
