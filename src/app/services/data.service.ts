import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{environment} from '../../environments/environment';

const options = {
  withCredentials: true
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  accountDetails: any = {
    1000: { acno: 1000, username: "harsha", balance: 5000, password: "user1" },
    1001: { acno: 1001, username: "usertwo", balance: 3000, password: "user2" },
    1002: { acno: 1002, username: "userthree", balance: 4000, password: "user3" },
    1003: { acno: 1003, username: "userfour", balance: 9000, password: "user4" },
    1004: { acno: 1004, username: "userfive", balance: 9000, password: "user5" }
  }
  currentuser: any;
  constructor(private http: HttpClient) {
    this.getDetails();
  }

  saveDetails() {
    localStorage.setItem("accountDetails", JSON.stringify(this.accountDetails))
    if (this.currentuser) {
      localStorage.setItem("currentuser", JSON.stringify(this.currentuser))

    }

  }

  getDetails() {
    if (localStorage.getItem("accountDetails")) {
      this.accountDetails = JSON.parse(localStorage.getItem("accountDetails") || '')
    }
    if (localStorage.getItem("currentuser")) {
      this.currentuser = JSON.parse(localStorage.getItem("currentuser") || '')

    }

  }

  register(acno: any, username: any, password: any) {

    const data = {
      acno,
      username,
      balance: 0,
      password
    }
    
    return this.http.post(environment.apiUrl+"/register", data)
  }



  login(acno: any, password: any) {
    const data = {
      acno,
      password
    }
    return this.http.post(environment.apiUrl+"/login", data, options)
  }

  // let dataset = this.accountDetails;

  // if (acno in dataset) {
  //   var pswd1 = dataset[acno].password;
  //   if (pswd1 == password) {
  //     this.currentuser = dataset[acno].username;
  //     this.saveDetails();

  //     return this.http.post("http://localhost:3000/login")
  //   }



  //   else {
  //     alert("incorrect password")
  //     return false;
  //   }
  // }
  // else {
  //   alert("incorrect accno")
  //   return false;
  // }






  deposit(acno: any, password: any, amount: any) {

    const data = {
      acno,
      password,
      amount
    }
    return this.http.post(environment.apiUrl+"/deposit", data, options)
  }
  // var amt = parseInt(amount);
  // let dataset = this.accountDetails;

  // if (accno in dataset) {
  //   var pswd1 = dataset[accno].password;
  //   if (pswd1 == pwd) {

  //     dataset[accno].balance += amt;
  //     this.saveDetails();
  //     alert("Account credited with amount: " + amt + "New amount is:" + dataset[accno].balance);
  //   }


  //   else {
  //     alert("incorrect password")

  //   }
  // }
  // else {
  //   alert("incorrect accno")
  // }

deleteAccDetails(acno:any)
{
  return this.http.delete(environment.apiUrl+"/deleteAccDetails/"+acno, options)
}




  withdraw(acno: any, password: any, amount: any) {

    const data = {
      acno,
      password,
      amount
    }
    return this.http.post(environment.apiUrl+"/withdraw",data,options)
  }
}
  // withdraw(accno: any, pwd: any, amount: any) {
  //   var amt = parseInt(amount);
  //   let dataset = this.accountDetails;

  //   if (accno in dataset) {
  //     var pswd1 = dataset[accno].password;
  //     if (pswd1 == pwd) {
  //       if (amt <= dataset[accno].balance) {
  //         dataset[accno].balance -= amt;
  //         this.saveDetails();
  //         alert("Account debited with amount: " + amt + "New amount is:" + dataset[accno].balance);

  //       }
  //       else {
  //         alert("insufficient balance")
  //       }

  //     }
  //     else {
  //       alert("incorrect password")

  //     }
  //   }
  //   else {
  //     alert("incorrect accno")

  //   }



  // }








