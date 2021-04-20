import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  accno = "";
  pswd = "";
  amount = "";

  depositForm = this.fb.group({

    accno: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12), Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.pattern('[0-9]*')]]

  });


  withdrawForm = this.fb.group({

    accno: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12), Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.pattern('[0-9]*')]]

  });
   id="1234";
  name: any;
  acno:any;
  accDelete:any;
  lLogin:Date =new Date()
  constructor(private fb: FormBuilder, public dataService: DataService,private router: Router) {
    this.name = localStorage.getItem("name")
  }

  ngOnInit(): void {
  }

  deposit() {
    if (this.depositForm.valid) {
      let accNumber = this.depositForm.value.accno;
      let pwd = this.depositForm.value.pswd;
      let amt = this.depositForm.value.amount;
      this.dataService.deposit(accNumber, pwd, amt)
        .subscribe((data: any) => {
          if (data) {
            alert(data.message);
            alert(data.balance);

          }
        }, (data) => {
          alert(data.error.message)
        })

    }
    else {
      alert("invalid form")
    }

  }

  withdraw() {
    if (this.withdrawForm.valid) {
      let accNumber = this.withdrawForm.value.accno;
      let pwd = this.withdrawForm.value.pswd;
      let amt = this.withdrawForm.value.amount;
      this.dataService.withdraw(accNumber, pwd, amt)
        .subscribe((data: any) => {
          if (data) {
            alert(data.message);
            alert(data.balance);

          }
        }, (data) => {
          alert(data.error.message)
        })

    }
    else {
      alert("invalid form")
    }
  }

delete(){
 this.acno= localStorage.getItem("acno")
//  alert(this.acno)
}

onDelete($event:any){
  this.accDelete=$event;
  this.dataService.deleteAccDetails($event)
  .subscribe((data: any) => {
    if (data) {
      alert(data.message);
      // this.acno=null;
      this.router.navigateByUrl("");
 //alert ("this is an alert from parent "+$event)
 
}
  })
}
onCancel(){
  
  this.acno=null;
 }


  
}